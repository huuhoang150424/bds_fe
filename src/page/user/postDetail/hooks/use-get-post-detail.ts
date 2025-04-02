import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";
import { getPostDetail } from "../services/get-post-detail";

export const useGetPostDetail = (slug : string) => {
//   const { slug } = useParams<{ slug: string }>();
  return useQuery({
    queryKey: ["postDetail", slug],
    queryFn: () => getPostDetail(slug),
    enabled: !!slug, // Chỉ gọi API khi slug có giá trị
  });
};