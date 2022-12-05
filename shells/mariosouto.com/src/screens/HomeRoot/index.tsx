import Footer from "@src/patterns/Footer/Footer";
import { useGetAllYouTubeVideos } from "@src/repositories/youtubeRepository";
import { Box, Text } from "@src/ui-system/primitives";
import Head from "next/head";
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
      <Head>
        <title>Mario Souto - Lead Software Engineer</title>
      </Head>
      <Background />
      <Menu />
      <Feed>
        <Feed.Header />
        <Text tag="h2" variant="heading4">
          Últimas Atualizações
        </Text>
        <Feed.Posts posts={data.posts} />
      </Feed>
      <Footer />
    </Box>
  );
}
