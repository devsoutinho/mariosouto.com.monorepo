import { Box, Text } from "@src/ui-system/primitives";
import useTheme from "@src/ui-system/theme/useTheme";


export default function Footer() {
  const theme = useTheme();
  return (
    <Box
      styleSheet={{
        backgroundColor: theme.colors.neutral.x900,
        color: theme.colors.neutral.x100,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        paddingVertical: '48px',
        paddingHorizontal: '24px',
      }}
    >
      <Text variant="body2">
        Feito com ❤️ por Mario Souto (DevSoutinho)
      </Text>
    </Box>
  )
}
