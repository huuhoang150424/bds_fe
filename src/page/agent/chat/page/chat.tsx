import { useState } from 'react';
import { Search, Plus, Send, Smile, Paperclip, MoreVertical, Phone, Video, User, Check } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import ListUser from '../components/list-user';
import ListMessage from '../components/list-message';

const avatarUser =
  'https://phunuvietnam.mediacdn.vn/media/news/33abffcedac43a654ac7f501856bf700/anh-profile-tiet-lo-g-ve-ban-1.jpg';

export default function Chat() {
  const [message, setMessage] = useState('');

  const messages = [
    {
      id: 1,
      sender: 'Marguerite Campbell',
      content:
        "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁",
      time: '10:08pm',
      isUser: false,
      type: 'sender',
    },
    {
      id: 2,
      sender: 'You',
      content: "Wow that's great",
      time: '10:08pm',
      isUser: true,
      type: 'receiver',
    },
    {
      id: 3,
      sender: 'Marguerite Campbell',
      time: '10:08pm',
      isUser: false,
      content:
        "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁",
      type: 'sender',
    },
  ];

  return (
    <div className='flex h-screen bg-white'>
      <div className='w-80 border-r border-gray-200 flex flex-col'>
        <div className='p-4 border-b border-gray-200 flex justify-between items-center'>
          <h1 className='text-xl font-semibold text-gray-600'>Chats</h1>
          <Button variant='ghost' size='icon' className='text-gray-600 '>
            <Plus className='h-5 w-5' />
          </Button>
        </div>

        <div className='p-4'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
            <Input placeholder='Search here..' className='pl-10 bg-gray-100 outline-none py-2' />
          </div>
        </div>

        <ListUser />
      </div>

      <div className='flex-1 flex flex-col'>
        <div className='p-4 border-b border-gray-200 flex justify-between items-center '>
          <div className='flex items-center'>
            <img src={avatarUser} alt='Avatar' className='rounded-full w-8 h-8 object-cover ' />
            <div className='ml-3'>
              <h2 className='font-semibold text-gray-600'>Marguerite Campbell</h2>
              <p className='text-sm text-gray-500'>Hoạt động</p>
            </div>
          </div>
          <Button variant='ghost' size='icon' className='text-gray-600'>
            <MoreVertical className='h-5 w-5' />
          </Button>
        </div>
        <div className='flex-1 overflow-y-auto p-4 b'>
          <ListMessage messages={messages}/>
        </div>
        <div className='p-4 border-t border-gray-200 bg-white'>
          <div className='flex items-center'>
            <Button variant='ghost' size='icon' className='text-gray-500'>
              <Smile className='h-5 w-5' />
            </Button>
            <div className='flex-1 mx-2'>
              <Input
                placeholder='Type your message...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='outline-none py-2 px-4 '
              />
            </div>
            <Button variant='ghost' size='icon' className='text-gray-500'>
              <Paperclip className='h-5 w-5' />
            </Button>
            <Button size='icon' className='ml-2 bg-red-600 hover:bg-red-700'>
              <Send className='h-5 w-5' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
