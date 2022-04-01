import { Post, PostType } from '../gql_types';
import allpostsSlugs from '../../_db/posts';
import { generatePostsIndex } from './utils/generatePostsIndex';
import sift from "sift";
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { paginate } from './utils/paginate';


export function postsRepository() {
  return {
    async createPost() {
      return [];
    },
    async createPosts() {
      return [];
    },
    async getAllPosts({ input }): Promise<any> {
      const { filter, offset, limit } = input;
      
      const filterFormated = Object.entries(filter || {}).reduce((acc, [key, value]) => {
        if(typeof value === 'object' ) {
          const resolveValue = (value: string): any => {
            return value;
          }
          return {
            ...acc,
            [key]: Object.keys(value).reduce((acc, k) => {
              return {
                ...acc,
                [`$${k}`]: resolveValue(value[k])
              }
            }, {}),
          }
        }
        return { ...acc };
      }, {});

      await generatePostsIndex();

      const allPostsPromises = allpostsSlugs.map(async (slug): Promise<Post> => {
        const BASE_URL = 'https://raw.githubusercontent.com/devsoutinho/mariosouto.com/main/shells/devsoutinho-api/_db/posts/';
        const postContentRaw = await fetch(`${BASE_URL}${slug}`).then((res) => res.text());
        const { data, content } = matter(postContentRaw);
        const contentParsed = await remark().use(html).process(content);
        const post = { data, content: contentParsed.value, };
        return {
          ...post.data,
          title: post.data.title,
          url: post.data.url,
          postType: post.data.postType,
          date: new Date(post.data.date).toISOString(),
        };
      });
      const promisesSettled = await Promise.allSettled(allPostsPromises);
      const initialOutput = promisesSettled.map((promise) => {
        if (promise.status === 'fulfilled') return promise.value;
      });

      const filteredOutput = initialOutput.filter(sift(filterFormated))
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      return paginate(filteredOutput, limit, offset);
    },
    async getAllPostsByPostType(postType: PostType): Promise<any> {
      const inputQuery = {
        filter: {
          "postType": {
            "eq": postType
          }
        }
      };
      return this.getAllPosts({ input: inputQuery });
    }
  };
}
