import useScrollToTopOnMount from "@/hooks/use-scroll-top";
import { PostsManagement } from "./components/posts-management";

export default function Post() {
  useScrollToTopOnMount();
  return (
    <PostsManagement/>
  );
}
