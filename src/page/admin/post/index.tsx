
import { useState } from "react";
import useScrollToTopOnMount from "@/hooks/use-scroll-top";
import { PostsManagement } from "./components/posts-management";

export default function Post() {
  useScrollToTopOnMount();
  const [sizePage, setSizePage] = useState(6);

  const handleChangePage=(page:number) =>{
    setSizePage(page);
  }
  return (
    <PostsManagement 

    />
  );
}
