import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import Message from './message';

const avatarUser="https://phunuvietnam.mediacdn.vn/media/news/33abffcedac43a654ac7f501856bf700/anh-profile-tiet-lo-g-ve-ban-1.jpg";
export default function ListMessage({ messages }: { messages: any }) {
  return (
    <div className='space-y-6'>
      {messages.map((message:any) => (
        <Message key={message.id} message={message}/>
      ))}
    </div>
  );
}
