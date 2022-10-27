import { useGetAllYouTubeVideos } from "@src/repositories/youtubeRepository";
import { withApolloStateServerCache } from 'external-libs/apollo-client';

export { default } from "@src/screens/HomeRoot";

export async function getStaticProps() {

  console.log("Static");

  return withApolloStateServerCache(
    useGetAllYouTubeVideos().server(),
    {
      props: {},
      revalidate: 60,
    }
  );
}
