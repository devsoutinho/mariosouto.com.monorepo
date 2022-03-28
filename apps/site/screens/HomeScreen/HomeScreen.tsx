import React from 'react';
import { Box, Button, Image, Text, TouchableArea, useTheme, useRouter } from 'skynexui';
import { Scaffold } from 'skynexui/patterns/Scaffold/Scaffold';
import { gql, useQuery } from '@apollo/client';
import { addApolloState, initializeApollo } from 'external-libs/apollo-client';

const GET_POSTS = gql`
  query {
    posts {
      title
      date
      url
    }
  }
`;

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_POSTS,
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 60,
  })
}


export function HomeScreen(props) {
  const theme = useTheme();
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return (
    <Box styleSheet={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors?.neutral?.x900, color: '#fff' }}>
      <Text styleSheet={{ color: '#fff' }}>Loading...</Text>
    </Box>
  );
  if (error) return (
    <Box styleSheet={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors?.neutral?.x900, color: '#fff' }}>
      <Text styleSheet={{ color: '#fff' }}>{error.message}</Text>
    </Box>
  );

  return (
    <Scaffold
      statusBar={{
        title: 'Home - Mario Souto',
        style: 'light'
      }}
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

        {data.posts.map(({ title, url }) => (
          <Box
            key={url}
            styleSheet={{
              marginTop: theme.space?.x4,
              marginBottom: theme.space?.x4,
            }}
          >
            <TouchableArea
              href={url}
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
            <Box
              styleSheet={{
                backgroundColor: '#FFF',
                padding: '50px',
              }}
            >
              <Button
                href={url}
                label="Ver vídeo"
              />
              <Button
                href={url}
                label="Ver vídeo"
                disabled
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Scaffold>
  );
}

export default HomeScreen;
