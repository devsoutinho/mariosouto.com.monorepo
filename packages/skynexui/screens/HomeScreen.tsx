import React from 'react';
import { Box, Button, Image, Text, TouchableArea, useTheme, useRouter } from '../index';
import { Scaffold } from '../patterns/Scaffold/Scaffold';
import AppScreenHOC from './wrappers/AppScreenHOC';

export function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
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

  // ======================================================


  return (
    <Scaffold
      safeArea={{ top: true, bottom: true }}
      styleSheet={{
        backgroundColor: theme.colors?.neutral?.x900,
        alignItems: 'center',
        paddingLeft: theme.space?.x4,
        paddingRight: theme.space?.x4,
      }}
    >
      <Box
        styleSheet={{
          maxWidth: theme.space?.xcontainer_sm,
          alignItems: 'center',
        }}
      >
        <Image
          styleSheet={{
            objectFit: 'cover',
            width: '200px',
            height: '200px',
            borderRadius: theme.borderRadius?.full,
            backgroundColor: theme.colors?.negative?.x050,
            marginTop: theme.space?.x4,
            marginBottom: theme.space?.x4,
          }}
          src="https://github.com/omariosouto.png"
        />
        <Text tag='h1' variant='heading2' styleSheet={{ color: theme.colors?.primary.x500 }}>
          Mario Souto
        </Text>
        <Text tag='h2' variant='heading3' styleSheet={{ color: theme.colors?.neutral.x000 }}>
          Dev Soutinho
        </Text>
      </Box>
      <Box
        styleSheet={{
          maxWidth: theme.space?.xcontainer_sm,
          alignItems: 'flex-start',
          marginTop: theme.space?.x6,
          marginBottom: theme.space?.x6,
        }}
      >
        <Text tag='h2' variant='body1' styleSheet={{ color: theme.colors?.neutral.x300 }}>
          Sempre no 220v, atrás de um filme/rolê e codando desafios em JS. Adoro trabalhar com a web e compartilhar sobre isso na Alura, Nubank e no meu canal do YouTube DevSoutinho
        </Text>

        {posts.map(({ title, url }) => (
          <Box
            key={url}
            styleSheet={{
              marginTop: theme.space?.x4,
              marginBottom: theme.space?.x4,
            }}
          >
            <TouchableArea
              styleSheet={{
                borderStyle: 'solid',
                borderWidth: '10px',
                disabled: {
                  borderColor: theme.colors?.neutral.x500,
                  backgroundColor: theme.colors?.neutral?.x500,
                },
                hover: {
                  borderColor: theme.colors?.positive.x500,
                  backgroundColor: {
                    xs: theme.colors?.negative.x500,
                  },
                },
                focus: {
                  borderColor: theme.colors?.positive.x500,
                  backgroundColor: {
                    xs: theme.colors?.positive.x500,
                  },
                },
              }}
              onPress={() => {
                router.push(url);
              }}
            >
              <Text
                key={title}
                variant='body3'
                styleSheet={{
                  color: theme.colors?.neutral.x000,
                }}
              >
                {title}
              </Text>
            </TouchableArea>
            <Button
              href={url}
              label="Ver vídeo"
              styleSheet={{
                color: '#fff',
              }}
            />
          </Box>
        ))}
      </Box>
    </Scaffold>
  );
}

export default AppScreenHOC(HomeScreen);
