import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface ReplyInputProps {
  user: any;
  replyContent: string;
  setReplyContent: (content: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  username: string;
}

const ReplyInput = ({
  user,
  replyContent,
  setReplyContent,
  onCancel,
  onSubmit,
  username,
}: ReplyInputProps) => {
  return (
    <div className='mt-2 flex gap-2'>
      <div className='shrink-0'>
        <img className='w-[32px] h-[32px] rounded-full' src={user?.avatar} alt='avatar' />
      </div>
      <div className='flex-1 relative'>
        <Textarea
          className='rounded-[10px] w-full p-2 border border-gray-300 bg-[#F0F2F5] min-h-[60px] text-sm'
          placeholder={`Phản hồi ${username}...`}
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
        />
        <div className='absolute right-2 bottom-2 flex gap-2'>
          <button 
            className='text-gray-500 hover:text-gray-700 text-xs'
            onClick={onCancel}
          >
            Hủy
          </button>
          <button
            className={cn(
              'text-xs font-medium transition-colors',
              replyContent.trim() 
                ? 'text-blue-500 hover:text-blue-600 cursor-pointer' 
                : 'text-gray-400 cursor-not-allowed'
            )}
            onClick={onSubmit}
            disabled={!replyContent.trim()}
          >
            Phản hồi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyInput;