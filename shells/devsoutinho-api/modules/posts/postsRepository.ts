import path from 'path';
import fs from 'fs/promises';
import { Post, PostType } from '../gql_types';
import allpostsSlugs from '../../_db/posts';
import { generatePostsIndex } from './utils/generatePostsIndex';
import sift from "sift";
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { paginate } from './utils/paginate';
import { slugify } from './utils/slugify';
import { postTemplate } from './utils/postTemplate';


export function postsRepository() {
  return {
    async createPost({ input }): Promise<any> {
      const { title, url, date, excerpt } = input;
      const slug = slugify(title);
      const postType = PostType.YoutubeVideo;
      const parsedDate = new Date(date?.replaceAll('/', '-') || new Date().toISOString()).toISOString();
      const postsPath = path.resolve(__dirname, '..', '..', '..', '..', '_db', 'posts');
      const postContent = postTemplate({
        title,
        url,
        date,
        excerpt,
        postType,
        content: '',
      });
      await fs.writeFile(path.resolve(postsPath, `${slug}.md`), postContent);

      await generatePostsIndex();

      return {
        title,
        url,
        postType,
        excerpt,
        date: parsedDate,
      }
    },
    async createPostsByPostType(postType: PostType, { input }) {
      console.log('createPostsByPostType|input', input);
      const results = Promise.allSettled(input.posts.map(async (post) => {
        return this.createPost({
          input: {
            ...post,
            postType,
          }
        });
      }))
        .then((results) => {
          return results.map((result) => {
            if (result.status === 'fulfilled') {
              return result.value;
            }
          });
        });
      return results;
    },
    async getAllPosts({ input }): Promise<any> {
      const { filter, offset, limit } = input;

      const filterFormated = Object.entries(filter || {}).reduce((acc, [key, value]) => {
        if (typeof value === 'object') {
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
    async getAllPostsByPostType(postType: PostType, { input }): Promise<any> {
      const inputQuery = {
        ...input,
        filter: {
          "postType": {
            "eq": postType
          },
          ...input?.filter,
        }
      };
      return this.getAllPosts({ input: inputQuery });
    }
  };
}
