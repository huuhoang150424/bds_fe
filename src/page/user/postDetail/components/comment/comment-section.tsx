import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  MessageCircle,
  Trash2,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Check,
  X,
  Edit,
  Pencil,
} from 'lucide-react';
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
import { useToggleLikeComment } from '../../hooks/use-toggle-likecomment';
import { vi } from 'date-fns/locale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateComment } from '../../hooks/use-edit-comment';

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
  likeCount: number;
  dislikeCount: number;
  liked?: boolean | undefined;
  disliked?: boolean | undefined;
}

interface CommentProps {
  comment: CommentType;
  postId: string;
  isAuthenticated?: boolean;
  onAuthRequired?: () => void;
}

export function Comment({ comment, postId, isAuthenticated = false, onAuthRequired }: CommentProps) {
  const [liked, setLiked] = useState<boolean | undefined>(comment.liked || false);
  const [disliked, setDisliked] = useState<boolean | undefined>(comment.disliked || false);
  const [likeCount, setLikeCount] = useState(comment.likeCount || 0);
  const [dislikeCount, setDislikeCount] = useState(comment.dislikeCount || 0);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const editInputRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: submitReply, isPending } = usePostCommentReply();
  const { mutate: updateCommentMutate, isPending:loadingUpdateComment } = useUpdateComment();
  const { mutate: deleteCommentMutate } = useDeleteCommentByPost();
  const { mutate: toggleLike, isPending: isTogglingLike } = useToggleLikeComment();
  const { data: repliesComment, isLoading: isLoadingReplies } = useGetCommentReply(comment.id, {
    enabled: true,
  });

  const updateComment = (data: { commentId: string; content: string }) => {
    updateCommentMutate(data);
    setIsEditing(false);
  };

  useEffect(() => {
    if (comment) {
      setLiked(comment.liked);
      setDisliked(comment.disliked);
    }
  }, [comment]);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      const length = editInputRef.current.value.length;
      editInputRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  const handleLike = (type: 'like' | 'dislike') => {
    if (!isAuthenticated) {
      if (onAuthRequired) onAuthRequired();
      return;
    }

    const wasLiked = liked;
    const wasDisliked = disliked;
    if (type === 'like') {
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      if (disliked) {
        setDisliked(false);
        setDislikeCount(dislikeCount - 1);
      }
    } else {
      setDisliked(!disliked);
      setDislikeCount(disliked ? dislikeCount - 1 : dislikeCount + 1);
      if (liked) {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
    }

    toggleLike(
      {
        commentId: comment.id,
        type: type,
        parentId: comment.parentId,
      },
      {
        onSuccess: (response) => {
          const newStatus = response.data.status;
          if (type === 'like') {
            setLiked(newStatus === 'LIKE');
            if (wasDisliked) setDisliked(false);
          } else {
            setDisliked(newStatus === 'DISLIKE');
            if (wasLiked) setLiked(false);
          }
        },
        onError: (error) => {
          console.error('Error toggling like:', error);
          setLiked(wasLiked);
          setDisliked(wasDisliked);
          setLikeCount(comment.likeCount);
          setDislikeCount(comment.dislikeCount);
        },
      },
    );
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

  const handleEditComment = () => {
    if (!isAuthenticated) {
      if (onAuthRequired) onAuthRequired();
      return;
    }
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  const handleSaveEdit = async () => {
    if (!isAuthenticated) {
      if (onAuthRequired) onAuthRequired();
      return;
    }

    const trimmed = editContent.trim();
    if (!trimmed || trimmed === comment.content) {
      setIsEditing(false);
      return;
    }

    try {
      await updateComment({
        commentId: comment.id,
        content: trimmed,
      });
      comment.content = trimmed;
    } catch (error) {
      console.error('Error updating comment:', error);
    }
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
          <div
            className={`${isEditing ? 'bg-white' : 'bg-muted/50'} p-3 rounded-lg border ${isEditing ? 'border-blue-300 shadow-sm' : 'border-gray-200'}`}
          >
            <div className='flex items-center justify-between mb-1'>
              <span className='font-medium'>{comment.user.fullname}</span>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-muted-foreground'>{formattedDate}</span>
              </div>
            </div>

            {isEditing ? (
              <div className='space-y-2'>
                <Textarea
                  ref={editInputRef}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full resize-y min-h-[60px] border-gray-300 text-sm focus:outline-none focus:ring-0 focus:border-none"
                  placeholder="Chỉnh sửa bình luận..."
                  disabled={loadingUpdateComment}
                />


                <div className='flex justify-end gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={handleCancelEdit}
                    disabled={loadingUpdateComment}
                    className='h-8 px-3 text-xs'
                  >
                    <X className='h-3 w-3 mr-1' /> Hủy
                  </Button>
                  <Button
                    size='sm'
                    onClick={handleSaveEdit}
                    disabled={loadingUpdateComment || !editContent.trim() || editContent === comment.content}
                    className='h-8 px-3 text-xs bg-[#E03C31] hover:bg-[#c73129]'
                  >
                    {loadingUpdateComment ? (
                      <Loader2 className='h-3 w-3 animate-spin mr-1' />
                    ) : (
                      <Check className='h-3 w-3 mr-1' />
                    )}
                    Lưu
                  </Button>
                </div>
              </div>
            ) : (
              <p className='text-sm'>{comment.content}</p>
            )}
          </div>

          <div className='flex items-center gap-4 mt-1 ml-1'>
            <div className='flex items-center gap-[5px]'>
              <Button
                variant='outline'
                className={`flex items-center gap-1 text-xs border-none shadow-none hover:bg-transparent p-0 h-auto ${
                  liked ? 'text-red-500' : 'text-muted-foreground'
                }`}
                onClick={() => handleLike('like')}
                disabled={isTogglingLike}
              >
                <ThumbsUp className={`h-4 w-4 ${liked ? 'fill-red-500' : ''}`} />
                <span>{likeCount}</span>
              </Button>
              <Button
                variant='outline'
                className={`flex items-center gap-1 text-xs border-none shadow-none hover:bg-transparent p-0 h-auto ${
                  disliked ? 'text-blue-500' : 'text-muted-foreground'
                }`}
                onClick={() => handleLike('dislike')}
                disabled={isTogglingLike}
              >
                <ThumbsDown className={`h-4 w-4 ${disliked ? 'fill-blue-500' : ''}`} />
                <span>{dislikeCount}</span>
              </Button>
            </div>
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='h-8 w-8 p-0 text-gray-500 hover:bg-gray-100 rounded-full'>
              <MoreHorizontal className='h-4 w-4 cursor-pointer' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-40'>
            <DropdownMenuItem onClick={handleEditComment} disabled={isEditing} className='cursor-pointer'>
              <Pencil className='h-4 w-4 mr-2 text-blue-500' />
              <span>Sửa bình luận</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleShowDeleteDialog} className='cursor-pointer'>
              <Trash2 className='h-4 w-4 mr-2 text-red-500' />
              <span>Xóa bình luận</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
