import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const avatarUser="https://phunuvietnam.mediacdn.vn/media/news/33abffcedac43a654ac7f501856bf700/anh-profile-tiet-lo-g-ve-ban-1.jpg";
export default function Message({message}: {message:any}) {
  return (
    <div  className={cn('flex', message.isUser ? 'justify-end' : 'justify-start')}>
      <div className={`flex gap-[10px] ${message.type === 'sender' ? 'flex-row' : 'flex-row-reverse'} max-w-[80%]`}>
        <img src={avatarUser} alt='Avatar' className='rounded-full w-8 h-8 object-cover ' />
        <div>
          <div className='flex items-center'>
            <span className='font-medium text-sm text-gray-700'>{message.sender}</span>
            <span className='ml-2 text-xs text-gray-500'>{message.time}</span>
            {message.isUser && <Check className='ml-1 h-4 w-4 text-green-500' />}
          </div>
          <div
            className={cn(
              'mt-1 p-3 rounded-lg',
              message.isUser ? 'bg-sky-500 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none',
            )}
          >
            <p>{message.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
