import { Box } from "@src/ui-system/primitives";


export function Background() {
  const imageUrl = "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80";
  return (
    <Box
      styleSheet={{
        backgroundImage: `url("${imageUrl}")`,
        width: "100%",
        height: "400px",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    />
  )
}
