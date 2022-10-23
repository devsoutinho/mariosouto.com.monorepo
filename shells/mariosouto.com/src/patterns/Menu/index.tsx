import { Box, Text } from "@src/components";

const menuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Sobre",
    href: "/about",
  },
  {
    label: "Store",
    href: "/store",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Newsletter",
    href: "/newsletter",
  },
]

export default function Menu() {
  return (
    <Box
      tag="nav"
      styleSheet={{
        position: "fixed",
        top: "16px",
        left: "0",
        right: "0",
        marginHorizontal: "auto",
        paddingHorizontal: ".75rem",
        zIndex: "10",
        backgroundColor: "#ffffff85",
        border: "1px solid #DDD",
        backdropFilter: "blur(5px)",
        color: "#666666",
        width: "100%",
        maxWidth: "380px",
        flexDirection: "row",
        borderRadius: "10000px",
      }}
    >
      {menuItems.map((menuItem) => (
        <Text
          key={menuItem.href}
          styleSheet={{
            color: "inherit",
            fontSize: ".875rem",
            padding: ".75rem",
          }}
        >
          {menuItem.label}
        </Text>
      ))}
    </Box>
  )
}
