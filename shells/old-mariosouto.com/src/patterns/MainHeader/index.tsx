import { Box, Text, Image } from "@src/components";
import Menu from "../Menu";

export function MainHeader() {
  const bgImage = "https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80";
  return (
    <Box
      styleSheet={{
        position: "relative",
      }}
    >
      <Menu />
      <Image
        src={bgImage}
        styleSheet={{
          width: "100%",
          height: "400px",
          objectFit: "cover",
          objectPosition: "center bottom",
          position: "absolute",
          left: "0",
          right: "0",
          zIndex: "1",
        }}
      />
      <Box
        styleSheet={{
          width: "100%",
          marginTop: "150px",
          maxWidth: "682px",
          marginHorizontal: "auto",
          backgroundColor: "#FFFFFF",
          paddingTop: {
            xs: "1.5rem",
            sm: "2.5rem"
          },
          paddingHorizontal: {
            xs: "1.5rem",
            sm: "2.5rem"
          },
          borderRadius: "0.5rem 0.5rem 0 0",
          zIndex: "2",
        }}
      >
        <Box>
          <Image
            src="https://github.com/omariosouto.png"
            styleSheet={{
              width: "128px",
              height: "128px",
              borderRadius: "50%",
            }}
          />
        </Box>
        <Box>
          <Text
            styleSheet={{
              fontSize: "1.5rem",
              fontWeight: "700",
              lineHeight: "36px",
            }}
          >
            Mario Souto
          </Text>
          <Text>
            @omariosouto  São Paulo - SP | Brasil
          </Text>
          <Box styleSheet={{
            marginTop: "8px",
            flexDirection: "row",
          }}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Text key={item}>
                {item}
              </Text>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
