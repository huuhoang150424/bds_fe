import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, Loader2, MessageCircle, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { usePostCommentReply } from '../../hooks/use-post-comment-reply';
import { useGetCommentReply } from '../../hooks/use-get-comment-reply';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { useDeleteCommentByPost } from '../../hooks/use-delete-comment-by-post';
import { vi } from 'date-fns/locale';

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
  level: number;
}

interface CommentProps {
  comment: CommentType;
  postId: string;
  isAuthenticated?: boolean;
  onAuthRequired?: () => void;
}

export function Comment({ comment, postId, isAuthenticated = false, onAuthRequired }: CommentProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showReplies, setShowReplies] = useState(false); 
  const { mutate: submitReply, isPending } = usePostCommentReply();
  const { mutate: deleteCommentMutate } = useDeleteCommentByPost();
  const { data: repliesComment, isLoading: isLoadingReplies } = useGetCommentReply(comment.id, {
    enabled: true,
  });

  useEffect(() => {
    if (repliesComment?.length > 0) {
      setShowReplies(true); 
    }
  }, [repliesComment]);

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
        commentId: comment.id,
        content: trimmed,
        postId: postId,
      },
      {
        onSuccess: () => {
          setReplyContent('');
          setShowReplyForm(false);
          setShowReplies(true);
        },
      },
    );
  };

  const handleDeleteComment = () => {
    if (!isAuthenticated) {
      if (onAuthRequired) onAuthRequired();
      return;
    }

    setIsDeleting(true);
    deleteCommentMutate(
      { commentId: comment.id, parentId: comment.parentId },
      {
        onSuccess: () => {
          setShowDeleteDialog(false);
        },
        onError: (error) => {
          console.error('Error deleting comment:', error);
        },
        onSettled: () => {
          setIsDeleting(false);
        },
      },
    );
  };

  const handleShowDeleteDialog = () => {
    if (!isAuthenticated) {
      if (onAuthRequired) onAuthRequired();
      return;
    }
    setShowDeleteDialog(true);
  };

  const toggleReplies = () => {
    setShowReplies((prev) => !prev);
  };

  const formattedDate = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
    locale: vi,
  });

  const replyCount = repliesComment?.length || 0;

  return (
    <div className='space-y-4'>
      <div className='flex gap-3'>
        <Avatar className='w-8 h-8 border border-gray-200'>
          <AvatarImage
            src={comment.user.avatar || `/placeholder.svg?text=${comment.user.fullname.charAt(0)}`}
            alt={comment.user.fullname}
          />
          <AvatarFallback>{comment.user.fullname.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className='flex-1'>
          <div className='bg-muted/50 p-3 rounded-lg border border-gray-200'>
            <div className='flex items-center justify-between mb-1'>
              <span className='font-medium'>{comment.user.fullname}</span>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-muted-foreground'>{formattedDate}</span>
                <button
                  className='text-muted-foreground hover:text-destructive transition-colors'
                  onClick={handleShowDeleteDialog}
                  aria-label='Xóa bình luận'
                >
                  <Trash2 className='h-4 w-4' />
                </button>
              </div>
            </div>
            <p className='text-sm'>{comment.content}</p>
          </div>

          <div className='flex items-center gap-4 mt-1 ml-1'>
            <button
              className={`flex items-center gap-1 text-xs ${liked ? 'text-red-500' : 'text-muted-foreground'}`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-red-500' : ''}`} />
              <span>{likeCount}</span>
            </button>
            <button
              className='flex items-center gap-1 text-xs text-muted-foreground'
              onClick={() => setShowReplyForm((prev) => !prev)}
            >
              <MessageCircle className='h-4 w-4' />
              <span>Trả lời</span>
            </button>
            {replyCount > 0 && (
              <button
                className='flex items-center gap-1 text-xs text-muted-foreground hover:text-primary'
                onClick={toggleReplies}
              >
                <span className='text-[15px] text-red-500 font-[500]'>
                  {showReplies ? 'Ẩn' : 'Xem'} {replyCount} phản hồi
                </span>
              </button>
            )}
          </div>

          {showReplyForm && (
            <div className='mt-3 ml-1'>
              <Input
                placeholder='Nhập phản hồi...'
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className='px-[18px] py-[10px] outline-none shadow-none text-sm'
                disabled={isPending}
              />
              <div className='mt-2 flex justify-end gap-2'>
                <Button variant='outline' size='sm' onClick={() => setShowReplyForm(false)} disabled={isPending}>
                  Hủy
                </Button>
                <Button
                  size='sm'
                  onClick={handleReplySubmit}
                  disabled={isPending || !replyContent.trim()}
                  className='bg-[#E03C31] hover:bg-[#c73129]'
                >
                  {isPending ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Phản hồi'}
                </Button>
              </div>
            </div>
          )}

          {showReplies && (
            <>
              {isLoadingReplies ? (
                <div className='mt-4 ml-6 text-center'>Đang tải phản hồi...</div>
              ) : repliesComment?.length > 0 ? (
                <div className={`mt-4 ${comment.level === 2 ? 'ml-6' : 'ml-12'} space-y-4`}>
                  {repliesComment?.map((reply: any) => (
                    <Comment
                      key={reply.id}
                      comment={reply}
                      postId={postId}
                      isAuthenticated={isAuthenticated}
                      onAuthRequired={onAuthRequired}
                    />
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

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
              className='bg-destructive hover:bg-destructive/90'
            >
              {isDeleting ? <Loader2 className='h-4 w-4 animate-spin mr-2' /> : <Trash2 className='h-4 w-4 mr-2' />}
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}