import React from 'react';
import { Image, Text, useTheme } from '../index';
import { Scaffold } from '../patterns/Scaffold/Scaffold';
import AppScreenHOC from './wrappers/AppScreenHOC';

export function HomeScreen() {
  const theme = useTheme();
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    // const GRAPHQL_URL = 'http://localhost:4000/api/graphql';
    const GRAPHQL_URL = 'https://mariosouto-com-api.vercel.app/api/graphql';
    fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            posts {
              title
              date
              url
            }
          }
        `,
      }),
    })
    .then(async (res) => {
      const response = await res.json();
      setPosts(response.data.posts);
    })
  }, []);
  

  return (
    <Scaffold
      safeArea={{ top: true, bottom: true }}
      styleSheet={{
        backgroundColor: theme.colors?.positive?.x050,
      }}
    >
      <Image
        styleSheet={{
          objectFit: 'cover',
          width: '100px',
          height: '100px',
          backgroundColor: theme.colors?.negative?.x050,
        }}
        src="https://github.com/omariosouto.png"
      />
      {posts.map(({ title }) => (
        <Text key={title} variant='body1'>{title}</Text>
      ))}
    </Scaffold>
  );
}

export default AppScreenHOC(HomeScreen);
