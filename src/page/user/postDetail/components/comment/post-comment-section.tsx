"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useGetCommentByPost } from "../../hooks/use-get-comment-by-post";
import { useAddComment } from "../../hooks/use-post-comment";
import { CommentType } from "./comment-section";
import { Comment } from "./comment-section";
import { useDeleteCommentByPost } from "../../hooks/use-delete-comment-by-post";

export function PostCommentSection({ postId }: { postId: string }) {
  const { data: commentResponse, isLoading } = useGetCommentByPost(postId);
  console.log("commentResponse", commentResponse);
  console.log("commentResponse", commentResponse);
  const [newComment, setNewComment] = useState("");
  const { mutate: addComment, isPending: isAddingComment } = useAddComment();
  const { mutate: addCommentReply, isPending: isAddingCommentReply } = useAddComment();
  const { mutate: deleteComment, isPending: isDeletingComment } = useDeleteCommentByPost();

  // Xử lý dữ liệu bình luận
  const rootComments: CommentType[] = [];
  const commentMap = new Map<string, CommentType[]>();

  commentResponse?.forEach((comment: CommentType) => {
    if (!comment.parentId) {
      rootComments.push(comment);
    } else {
      if (!commentMap.has(comment.parentId)) {
        commentMap.set(comment.parentId, []);
      }
      commentMap.get(comment.parentId)!.push(comment);
    }
  });

  const handleAddComment = () => {
    const trimmed = newComment.trim();
    if (!trimmed) return;

    addComment({ postId, content: trimmed }, {
      onSuccess: () => {
        setNewComment("");
      },
    });
  };

  const handleAddCommentReply = (parentId: string, content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    addCommentReply({ parentId, content, postId }, {
      onSuccess: () => {
        setNewComment("");
      },
    });
  }

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId, {});
  }

  const commentCount = commentResponse?.length ?? 0;

  return (
    <div className="space-y-6 p-4">
      <h3 className="font-semibold text-lg">Bình luận </h3>

      <div className="mb-6">
        <Textarea
          placeholder="Viết bình luận của bạn..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[80px] resize-none mb-2"
          disabled={isAddingComment}
        />
        <div className="flex justify-end">
          <Button
            className="bg-[#E03C31] hover:bg-[#c73129]"
            onClick={handleAddComment}
            disabled={isAddingComment || !newComment.trim()}
          >
            {isAddingComment && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Đăng bình luận
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center">Đang tải bình luận...</div>
      ) : rootComments.length > 0 ? (
        <div className="space-y-6">
          {rootComments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              replies={commentMap.get(comment.id) || []}
              commentMap={commentMap}
              postId={postId}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-8">
          Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
        </div>
      )}
    </div>
  );
}