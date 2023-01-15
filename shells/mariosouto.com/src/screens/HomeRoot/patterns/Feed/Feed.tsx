import { Box, Image, Text, Button, Icon, Link } from "@src/ui-system/primitives";
import useTheme from "@src/ui-system/theme/useTheme";

export default function Feed({ children }) {
  const theme = useTheme();
  return (
    <Box
      styleSheet={{
        maxWidth: '683px',
        marginTop: '-228px',
        alignSelf: 'center',
        flex: 1,
        width: '100%',
        borderRadius: theme.borderRadius.lg,
        backgroundColor: theme.colors.neutral.x000,
        paddingVertical: '40px',
        paddingHorizontal: '32px',
      }}
    >
      {children}
    </Box>
  )
}

Feed.Header = () => {
  const theme = useTheme();
  return (
    <Box
      styleSheet={{
        borderBottom: `1px solid ${theme.colors.neutral.x200}`,
        marginBottom: '24px',
      }}
    >
      <Box
        styleSheet={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '16px',
        }}
      >
        <Image
          src="https://github.com/omariosouto.png"
          alt="Mario Souto foto de perfil"
          styleSheet={{
            width: { xs: "100px", md: "128px" },
            height: { xs: "100px", md: "128px" },
            borderRadius: theme.borderRadius.full,
          }}
        />
        <Box
          styleSheet={{
            justifyContent: 'space-between',
            display: { xs: 'none', md: 'flex' }
          }}
        >
          <Button fullWidth colorVariant="primary" variant="contained" size="xl" href="https://mariosouto.com/newsletter">Newsletter</Button>
          <Button fullWidth colorVariant="neutral" variant="outlined" size="xl" href="https://www.youtube.com/channel/UCzR2u5RWXWjUh7CwLSvbitA/join">Buy me a coffee</Button>
        </Box>
        <Box
          styleSheet={{
            justifyContent: 'space-between',
            display: { xs: 'flex', md: 'none' }
          }}
        >
          <Button fullWidth colorVariant="primary" variant="contained" size="xs" href="/">Newsletter</Button>
          <Button fullWidth colorVariant="neutral" variant="outlined" size="xs" href="/">Buy me a coffee</Button>
        </Box>
      </Box>
      <Box>
        <Text tag="h3" variant="heading3" styleSheet={{ marginVertical: 0 }}>Mario Souto</Text>
        <Text variant="body3" styleSheet={{ color: theme.colors.neutral.x300, marginVertical: 0 }}>@omariosouto - DevSoutinho - Brasil</Text>
        <Text variant="body3" styleSheet={{ color: theme.colors.neutral.x300, marginVertical: 0 }}>Lead Software Engineer, Nubank</Text>
      </Box>
      <Box
        styleSheet={{
          width: '125px',
          flexDirection: 'row',
          paddingVertical: '24px',
          justifyContent: 'space-between',
        }}
      >
        <Link colorVariant="dark" href="https://youtube.com/DevSoutinho"><Icon name="youtube" /></Link>
        <Link colorVariant="dark" href="https://twitter.com/omariosouto"><Icon name="twitter" /></Link>
        <Link colorVariant="dark" href="https://instagram.com/devsoutinho"><Icon name="instagram" /></Link>
        <Link colorVariant="dark" href="https://github.com/omariosouto"><Icon name="github" /></Link>
      </Box>
    </Box>
  )
}


Feed.Posts = FeedPosts;
function FeedPosts({ posts }) {
  const theme = useTheme();


  return (
    <Box
      styleSheet={{
        marginTop: '24px',
      }}
    >
      {posts.map((post) => {
        return <FeedCard
          key={post.url}
          {...post}
        />
      })}
    </Box>
  )

  function FeedCard({ title, url, image, date }) {
    const releaseDate = new Date(date)
      .toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' })
      .replace('.', '')
      .replace(/de /g, '');

    return (
      <Box
        styleSheet={{
          position: 'relative',
          paddingBottom: '45px',
          marginBottom: '12px',
        }}
      >
        <Box
          styleSheet={{
            position: 'absolute',
            top: 0, bottom: 0,
            paddingTop: '36px',
            color: theme.colors.neutral.x300,
            marginLeft: '-16px',
          }}
        >
          <Icon
            size="sm"
            name="clock_fill"
            styleSheet={{
              transform: {
                xs: 'translateX(-50%) scale(.9)',
                sm: 'translateX(-50%)',
              },
              position: 'absolute',
              top: '0',
              left: '0',
            }}
          />
          <Box
            styleSheet={{
              flex: 1,
              width: '1px',
              height: '40px',
              backgroundColor: 'currentColor',
            }}
          />
        </Box>
        <Text
          variant="body4"
          styleSheet={{ fontWeight: 'bold', marginBottom: '30px', marginLeft: '4px' }}
        >
          {releaseDate}
        </Text>
        {/* Title, Excerpt */}
        <Link
          href={url}
          variant="body1"
          styleSheet={{
            marginBottom: '8px',
            display: 'inline',
          }}
          colorVariantEnabled={false}
        >
          <Box
            tag="span"
            styleSheet={{
              display: 'inline',
              padding: '2px',
              borderRadius: theme.borderRadius.sm,
              color: theme.colors.neutral.x800,
              backgroundColor: theme.colors.neutral.x200,
              hover: {
                color: theme.colors.primary.x900,
                backgroundColor: theme.colors.primary.x200,
              }
            }}
          >
            {title}
          </Box>
        </Link>
        {/* Excerpt */}
        {/* <Text
          variant="body3"
          styleSheet={{
            marginBottom: '20px'
          }}
        >
          Video simples e direto pra você aprender mais sobre manipulação de arquivos com NodeJS, CRUDs e muito mais, bora ver? 😍
        </Text> */}
        
        {/* Tags */}
        {/* <Box styleSheet={{
          flexDirection: 'row',
          marginBottom: '24px',
          gap: '4px',
        }}>
          {['Video', 'JavaScript'].map((tag) => (
            <Link
              key={tag}
              href="/"
              variant="body4"
              styleSheet={{
                color: theme.colors.neutral.x800,
                backgroundColor: theme.colors.neutral.x100,
                borderRadius: theme.borderRadius.full,
                padding: '6px 8px',
                hover: {
                  color: theme.colors.primary.x900,
                  backgroundColor: theme.colors.primary.x200,
                }
              }}
              colorVariantEnabled={false}
            >
              #{tag}
            </Link>
          ))}
        </Box> */}

        {/* Image */}
        {image && (
          <Button.Base
            href="/"
            rippleContrast="light"
            styleSheet={{
              hover: {
                opacity: 0.8,
              }
            }}
          >
            <Image
              styleSheet={{
                width: '100%',
                borderRadius: theme.borderRadius.lg,
              }}
              src={image}
              alt="Image Description"
            />
          </Button.Base>
        )}
      </Box>
    )
  }
};
