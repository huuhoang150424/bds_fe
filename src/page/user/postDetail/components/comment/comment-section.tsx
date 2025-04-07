import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Loader2, MessageCircle, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { usePostCommentReply } from "../../hooks/use-post-comment-reply";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteCommentByPost } from "../../hooks/use-delete-comment-by-post";

interface User {
  id?: string;
  fullname: string;
  avatar?: string;
}

export interface CommentType {
  id: string;
  createdAt: string;
  userId: string;
  postId: string;
  content: string;
  status: string;
  parentId: string | null;
  user: User;
}

interface CommentProps {
  comment: CommentType;
  replies: CommentType[];
  commentMap: Map<string, CommentType[]>;
  postId: string;
  isAuthenticated?: boolean;
  onAuthRequired?: () => void;
}

export function Comment({
  comment,
  replies,
  commentMap,
  postId,
  isAuthenticated = false,
  onAuthRequired,
}: CommentProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate: submitReply, isPending } = usePostCommentReply();
  const { mutate: deleteComment } = useDeleteCommentByPost();

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleReplySubmit = () => {
    if (!isAuthenticated) {
      if (onAuthRequired) onAuthRequired();
      return;
    }

    const trimmed = replyContent.trim();
    if (!trimmed) return;

    submitReply(
      {
        parentId: comment.id,
        content: trimmed,
        postId: postId,
      },
      {
        onSuccess: () => {
          setReplyContent("");
          setShowReplyForm(false);
        },
      }
    );
  };

  const handleDeleteComment = () => {
    if (!isAuthenticated) {
      if (onAuthRequired) onAuthRequired();
      return;
    }

    setIsDeleting(true);
    deleteComment(comment.id, {
      onSuccess: () => {
        setShowDeleteDialog(false);
      },
      onError: (error) => {
        console.error("Error deleting comment:", error);
      },
      onSettled: () => {
        setIsDeleting(false);
      },
    });
  };

  const handleShowDeleteDialog = () => {
    if (!isAuthenticated) {
      if (onAuthRequired) onAuthRequired();
      return;
    }
    setShowDeleteDialog(true);
  };

  const formattedDate = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={comment.user.avatar || `/placeholder.svg?text=${comment.user.fullname.charAt(0)}`}
            alt={comment.user.fullname}
          />
          <AvatarFallback>{comment.user.fullname.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">{comment.user.fullname}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{formattedDate}</span>
                <button
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  onClick={handleShowDeleteDialog} // Sử dụng hàm kiểm tra đăng nhập
                  aria-label="Xóa bình luận"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-sm">{comment.content}</p>
          </div>

          <div className="flex items-center gap-4 mt-1 ml-1">
            <button
              className={`flex items-center gap-1 text-xs ${liked ? "text-red-500" : "text-muted-foreground"}`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-red-500" : ""}`} />
              <span>{likeCount}</span>
            </button>
            <button
              className="flex items-center gap-1 text-xs text-muted-foreground"
              onClick={() => setShowReplyForm((prev) => !prev)}
            >
              <MessageCircle className="h-4 w-4" />
              <span>Trả lời</span>
            </button>
          </div>

          {showReplyForm && (
            <div className="mt-3 ml-1">
              <Textarea
                placeholder="Nhập phản hồi..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[60px] resize-none text-sm"
                disabled={isPending}
              />
              <div className="mt-2 flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowReplyForm(false)} disabled={isPending}>
                  Hủy
                </Button>
                <Button
                  size="sm"
                  onClick={handleReplySubmit}
                  disabled={isPending || !replyContent.trim()}
                  className="bg-[#E03C31] hover:bg-[#c73129]"
                >
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Phản hồi"}
                </Button>
              </div>
            </div>
          )}

          {replies.length > 0 && (
            <div className="mt-4 ml-6 space-y-4 border-l-2 border-muted pl-4">
              {replies.map((reply) => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  replies={commentMap.get(reply.id) || []}
                  commentMap={commentMap}
                  postId={postId}
                  isAuthenticated={isAuthenticated}
                  onAuthRequired={onAuthRequired}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa bình luận</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa bình luận này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteComment}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}