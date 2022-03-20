import { Box, Button, useTheme, useRouter } from '../../index';
import routing from '../../screens/routing.json';

const menuItems = new Set(['/', '/settings']);
const routeEntries = Object.entries(routing).filter(([key, value]) => menuItems.has(key));

export function MainNavigationMenu() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box
      styleSheet={{
        maxWidth: {
          md: theme.space?.x16,
        },
        backgroundColor: theme.colors?.neutral.x500,
        padding: theme.space?.x4,
        borderRadius: theme.borderRadius?.default,
        flexDirection: {
          xs: 'row',
          md: 'column',
        },
        justifyContent: {
          xs: 'space-around',
          md: 'flex-start',
        },
        position: 'absolute',
        top: {
          md: theme.space?.x4,
        },
        right: theme.space?.x4,
        left: {
          xs: theme.space?.x4,
          md: theme.space?.initial,
        },
        bottom: {
          xs: theme.space?.x4,
          md: theme.space?.x4,
        },
      }}
    >
      {routeEntries.map(([key, value]) => (
        <Button
          key={key}
          styleSheet={{ color: theme.colors?.neutral.x000 }}
          onTap={() => {
            router.push(key);
          }}
          label={value.name['pt-BR']}
        />
      ))}
    </Box>
  )
}
