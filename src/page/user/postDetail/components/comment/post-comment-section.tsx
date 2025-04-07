import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useGetCommentByPost } from '../../hooks/use-get-comment-by-post';
import { useAddComment } from '../../hooks/use-post-comment';;
import { Comment } from './comment-section';
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
      ) : commentResponse?.data?.data.length > 0 ? (
        <div className='space-y-6'>
          {commentResponse?.data?.data.map((comment:any) => (
            <Comment
              key={comment.id}
              comment={comment}
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
