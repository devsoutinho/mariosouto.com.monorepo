import Footer from "@src/patterns/Footer/Footer";
import { useGetAllYouTubeVideos } from "@src/repositories/youtubeRepository";
import { Box, Text } from "@src/ui-system/primitives";
import { Background } from "./patterns/Background";
import Feed from "./patterns/Feed/Feed";
import Menu from "./patterns/Menu";

export default function HomeScreen() {
  
  const { data } = useGetAllYouTubeVideos().client();

  return (
    <Box
      styleSheet={{
        flex: 1,
      }}
    >
      <Background />
      <Menu />
      <Feed>
        <Feed.Header />
        <Text variant="heading2">
          Últimas Atualizações
        </Text>
        <Feed.Posts posts={data.posts} />
      </Feed>
      <Footer />
    </Box>
  );
}
