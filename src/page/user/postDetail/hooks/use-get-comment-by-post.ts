import { useQuery } from "@tanstack/react-query";
import { getCommentByPost } from "../services/get-comment-by-post";

export const useGetCommentByPost = (postId: string) => {    
    return useQuery({
        queryKey: ["commentByPost", postId],
        queryFn: () => getCommentByPost(postId),
        enabled: !!postId,
    })
};
