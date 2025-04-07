import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useGetCommentByPost } from '../../hooks/use-get-comment-by-post';
import { useAddComment } from '../../hooks/use-post-comment';
import { CommentType } from './comment-section';
import { Comment } from './comment-section';
import { useDeleteCommentByPost } from '../../hooks/use-delete-comment-by-post';
import { Input } from '@/components/ui/input';

interface PostCommentSectionProps {
  postId: string;
  isAuthenticated?: boolean;
  onAuthRequired?: () => void;
}

export function PostCommentSection({ postId, isAuthenticated = false, onAuthRequired }: PostCommentSectionProps) {
  const { data: commentResponse, isLoading } = useGetCommentByPost(postId);
  const [newComment, setNewComment] = useState('');
  const { mutate: addComment, isPending: isAddingComment } = useAddComment();
  const { mutate: addCommentReply, isPending: isAddingCommentReply } = useAddComment();
  const { mutate: deleteComment, isPending: isDeletingComment } = useDeleteCommentByPost();

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
    if (!isAuthenticated) {
      if (onAuthRequired) onAuthRequired();
      return;
    }

    const trimmed = newComment.trim();
    if (!trimmed) return;

    addComment(
      { postId, content: trimmed },
      {
        onSuccess: () => {
          setNewComment('');
        },
      },
    );
  };

  const handleAddCommentReply = (parentId: string, content: string) => {
    if (!isAuthenticated) {
      if (onAuthRequired) onAuthRequired();
      return;
    }

    const trimmed = content.trim();
    if (!trimmed) return;

    addCommentReply(
      { parentId, content, postId },
      {
        onSuccess: () => {
          setNewComment('');
        },
      },
    );
  };

  const handleDeleteComment = (commentId: string) => {
    if (!isAuthenticated) {
      if (onAuthRequired) onAuthRequired();
      return;
    }

    deleteComment(commentId, {});
  };

  const commentCount = commentResponse?.length ?? 0;

  return (
    <div className='space-y-6 p-4'>
      <h3 className='font-semibold text-lg'>Bình luận </h3>
      <div className='mb-6 flex items-center gap-[20px] '>
        <Input
          placeholder='Viết bình luận của bạn...'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className='outline-none px-[18px] py-[8px] shadow-none '
          disabled={isAddingComment}
        />
        <Button
          className='bg-[#E03C31] hover:bg-[#c73129]'
          onClick={handleAddComment}
          disabled={isAddingComment || !newComment.trim()}
        >
          {isAddingComment && <Loader2 className='h-4 w-4 animate-spin mr-2' />}
          Đăng bình luận
        </Button>
      </div>

      {isLoading ? (
        <div className='text-center'>Đang tải bình luận...</div>
      ) : rootComments.length > 0 ? (
        <div className='space-y-6'>
          {rootComments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              replies={commentMap.get(comment.id) || []}
              commentMap={commentMap}
              postId={postId}
              isAuthenticated={isAuthenticated}
              onAuthRequired={onAuthRequired}
            />
          ))}
        </div>
      ) : (
        <div className='text-center text-muted-foreground py-8'>
          Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
        </div>
      )}
    </div>
  );
}
