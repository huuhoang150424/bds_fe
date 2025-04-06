import { getCommentReply } from './../services/get-comment-reply';
import { useQuery } from "@tanstack/react-query";

export const useGetCommentReply = (parentId: string) => {
    return useQuery({
        queryKey: ["commentReply", parentId],
        queryFn: () => getCommentReply(parentId),
        enabled: !!parentId, // Chỉ gọi API khi parentId có giá trị
        refetchOnWindowFocus: false, // Tùy chọn để không tự động gọi lại khi chuyển tab
    });
};