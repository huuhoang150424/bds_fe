import useScrollToTopOnMount from "@/hooks/use-scroll-top";
import { DraftPostsPage } from "../components/draft-post-page";


export default function DraftPost() {
  useScrollToTopOnMount();
  return <DraftPostsPage />
}

