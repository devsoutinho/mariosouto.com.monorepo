import { Box, Button, Icon } from "@src/ui-system/primitives";
import useTheme from "@src/ui-system/theme/useTheme";


export default function Menu() {
  const theme = useTheme();
  const baseSize = '40px';

  return (
    <Box
      styleSheet={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        flexDirection: "row",
        paddingVertical: '16px',
        paddingHorizontal: '20px',
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Button.Base
        styleSheet={{
          color: theme.colors.neutral.x000,
          borderRadius: theme.borderRadius.full,
          backgroundColor: theme.colors.primary.x500,
          width: baseSize,
          height: baseSize,
          alignItems: 'center',
          justifyContent: 'center',
          hover: {
            backgroundColor: theme.colors.primary.x400,
          },
          focus: {
            backgroundColor: theme.colors.primary.x400,
          },
        }}
        href="/"
      >
        MS
      </Button.Base>
      <Button.Base
        styleSheet={{
          display: "none",
          color: theme.colors.neutral.x000,
          borderRadius: theme.borderRadius.full,
          backgroundColor: theme.colors.neutral.x500,
          width: baseSize,
          height: baseSize,
          alignItems: 'center',
          justifyContent: 'center',
          hover: {
            backgroundColor: theme.colors.neutral.x400,
          },
          focus: {
            backgroundColor: theme.colors.neutral.x400,
          },
        }}
      >
        <Icon name="menu" />
      </Button.Base>
    </Box>
  );
}
