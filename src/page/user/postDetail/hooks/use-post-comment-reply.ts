import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCommentReply } from "../services/post-reply";

export const usePostCommentReply = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { parentId: string; content: string; postId: string }) => addCommentReply(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['commentByPost', data.postId] });
            if (data.parentId) {
                queryClient.invalidateQueries({ queryKey: ['commentReply', data.parentId] });
            }
            console.log('Reply added successfully:', data);
        },
        onError: (error) => {
            console.error('Failed to add comment reply:', error);
        },
    });
};