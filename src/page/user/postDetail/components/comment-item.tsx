// src/screen/user/postDetail/components/CommentItem.tsx
import { cn } from '@/lib/utils';
import { AiFillLike } from 'react-icons/ai';
import { Textarea } from '@/components/ui/textarea';
import ReplyInput from './reply-input';

interface CommentItemProps {
  comment: {
    id: number;
    avatar: string;
    username: string;
    content: string;
    timeAgo: string;
    likes: number;
    replies?: any[];
  };
  level?: number;
  onReply: (id: number | null) => void;
  onLike: (id: number) => void;
  replyingTo: number | null;
  replyContent: string;
  setReplyContent: (content: string) => void;
  user: any;
  fillLike: { [key: number]: boolean };
  likeCount: { [key: number]: number };
  handleSubmitReply: (id: number) => void;
}

const CommentItem = ({
  comment,
  level = 0,
  onReply,
  onLike,
  replyingTo,
  replyContent,
  setReplyContent,
  user,
  fillLike,
  likeCount,
  handleSubmitReply,
}: CommentItemProps) => {
  return (
    <div className='relative'>
      

      <div className='flex gap-2'>
        <div className='shrink-0'>
          <img className='w-[32px] h-[32px] rounded-full' src={comment.avatar} alt='avatar' />
        </div>
        <div className='flex-1'>
          <div className='bg-[#F0F2F5] px-3 py-2 rounded-2xl inline-block'>
            <div className='font-medium text-sm'>{comment.username}</div>
            <div className='text-sm'>{comment.content}</div>
          </div>
          
          <div className='flex items-center gap-4 mt-1 text-xs text-gray-500'>
            <span>{comment.timeAgo}</span>
            <button 
              className='hover:text-gray-700 transition-colors'
              onClick={() => onReply(comment.id)}
            >
              Phản hồi
            </button>
            <div className='flex items-center gap-1'>
              <AiFillLike
                onClick={() => onLike(comment.id)}
                className={cn(
                  'cursor-pointer transition-all',
                  fillLike[comment.id] 
                    ? 'text-blue-500 scale-110' 
                    : 'text-gray-400 opacity-70'
                )}
              />
              <span className='text-xs'>
                {comment.likes + (likeCount[comment.id] || 0)}
              </span>
            </div>
          </div>

          {replyingTo === comment.id && (
            <ReplyInput 
              user={user}
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              onCancel={() => onReply(null)}
              onSubmit={() => handleSubmitReply(comment.id)}
              username={comment.username}
            />
          )}

          {/* Replies với margin tăng dần theo cấp độ */}
          {comment.replies && comment.replies.length > 0 && (
            <div className={`ml-11 space-y-4 mt-4`}>
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  level={level + 1}
                  onReply={onReply}
                  onLike={onLike}
                  replyingTo={replyingTo}
                  replyContent={replyContent}
                  setReplyContent={setReplyContent}
                  user={user}
                  fillLike={fillLike}
                  likeCount={likeCount}
                  handleSubmitReply={handleSubmitReply}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;