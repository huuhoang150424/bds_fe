import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useGetCommentByPost } from '../../hooks/use-get-comment-by-post';
import { useAddComment } from '../../hooks/use-post-comment';
import { Comment } from './comment-section';
import { Input } from '@/components/ui/input';
import { Pagination } from '../../../../../components/user/pagination';

interface PostCommentSectionProps {
  postId: string;
  isAuthenticated?: boolean;
  onAuthRequired?: () => void;
}

export function PostCommentSection({ postId, isAuthenticated = false, onAuthRequired }: PostCommentSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); 
  const [newComment, setNewComment] = useState('');
  const { data: commentResponse, isLoading } = useGetCommentByPost(postId, currentPage, pageSize);
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
          setCurrentPage(1); 
        },
      },
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log('Meta:', commentResponse?.data.meta);

  return (
    <div className='space-y-6 p-4'>
      <h3 className='font-semibold text-lg'>Bình luận</h3>
      <div className='mb-6 flex items-center gap-[20px]'>
        <Input
          placeholder='Viết bình luận của bạn...'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className='outline-none px-[18px] py-[8px] shadow-none'
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
          {commentResponse?.data?.data.map((comment: any) => (
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

      {!isLoading && commentResponse?.data?.data.length > 0 && (
        <Pagination
          currentPage={currentPage} 
          totalPages={commentResponse?.data.meta.totalPages || 1}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}