"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Loader2, MessageCircle } from "lucide-react";
import { Comment as CommentType } from "@/page/user/postDetail/services/get-comment-by-post";
import { formatDistanceToNow } from "date-fns";
import { useAddComment } from "../../hooks/use-post-comment";


interface CommentProps {
  comment: CommentType;
  replies: CommentType[];
  commentMap: Map<string, CommentType[]>;
  postId: string; // Thêm postId từ CommentSection
}

export function CommentSection({ comment, replies, commentMap, postId }: CommentProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const { mutate: addReply, isPending: isAddingReply } = useAddComment(); // Sử dụng mutation

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleAddReply = () => {
    if (!replyContent.trim()) return;

    addReply(
      { 
        postId, 
        content: replyContent,
        // parentId: comment.id // Thêm parentId để tạo reply
      },
      {
        onSuccess: () => {
          setReplyContent(""); // Clear input
          setShowReplyForm(false); // Ẩn form sau khi thêm
        },
      }
    );
  };

  const formattedDate = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={`/placeholder.svg?height=40&width=40&text=${comment.user.fullname.charAt(0)}`}
            alt={comment.user.fullname}
          />
          <AvatarFallback>{comment.user.fullname.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <div className="font-medium">{comment.user.fullname}</div>
              <div className="text-xs text-muted-foreground">{formattedDate}</div>
            </div>
            <p className="text-sm">{comment.content}</p>
          </div>
          <div className="flex items-center gap-4 mt-1 ml-1">
            <button
              className={`flex items-center gap-1 text-xs ${liked ? "text-red-500" : "text-muted-foreground"}`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-red-500" : ""}`} />
              <span>{likes}</span>
            </button>
            <button
              className="flex items-center gap-1 text-xs text-muted-foreground"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <MessageCircle className="h-4 w-4" />
              <span>Trả lời</span>
            </button>
          </div>

          {showReplyForm && (
            <div className="mt-3 ml-1">
              <Textarea
                placeholder="Bình luận..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[60px] resize-none text-sm"
                disabled={isAddingReply} // Vô hiệu hóa khi đang gửi
              />
              <div className="mt-2 flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowReplyForm(false)} disabled={isAddingReply}>
                  Hủy
                </Button>
                <Button
                  className="bg-[#E03C31]"
                  size="sm"
                  onClick={handleAddReply}
                  disabled={isAddingReply}
                >
                  {isAddingReply ? <Loader2 className="h-4 w-4 animate-spin" /> : "Bình luận"}
                </Button>
              </div>
            </div>
          )}

          {replies.length > 0 && (
            <div className="mt-4 ml-6 space-y-4 border-l-2 border-muted pl-4">
              {replies.map((reply) => (
                <CommentSection
                  key={reply.id}
                  comment={reply}
                  replies={commentMap.get(reply.id) || []}
                  commentMap={commentMap}
                  postId={postId} // Truyền postId tiếp tục cho replies
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}