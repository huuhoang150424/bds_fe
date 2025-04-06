import { useEffect, useRef, useState } from 'react';
import { Search, Plus, Send, Smile, Paperclip, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ListUser from '../components/list-user';
import ListMessage from '../components/list-message';
import { useAppContext } from '@/context/chat';
import { useGetAllMessage } from '../hooks/use-getall-messages';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/authReducer';
import { useSendMessage } from '../hooks/use-send-message';
import { getTimeAgo } from '@/lib/get-time-ago';

export default function Chat() {
  const user = useSelector(selectUser);
  const [message, setMessage] = useState('');
  const [activeReceiverId, setActiveReceiverId] = useState('');
  const [userConversation, setUserConversation] = useState<any>();
  const [allMessages, setAllMessages] = useState<any[]>([]);
  const { socket, connectSocket, selectedUser } = useAppContext();
  const [receiverStatus, setReceiverStatus] = useState<{ active: boolean; lastActive: Date | null }>({
    active: false,
    lastActive: null,
  });
  const { data: getAllMessages, isLoading } = useGetAllMessage(activeReceiverId);
  const mutationSendMessage = useSendMessage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userConversation) {
      setActiveReceiverId(userConversation.id);
      setReceiverStatus({ active: userConversation.active || false, lastActive: userConversation.lastActive || null });
    }
  }, [userConversation]);

  useEffect(() => {
    if (selectedUser?.id) {
      setActiveReceiverId(selectedUser.id);
      setReceiverStatus({ active: selectedUser.active || false, lastActive: selectedUser.lastActive || null });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (getAllMessages) {
      setAllMessages(getAllMessages?.data);
    }
  }, [getAllMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages]);

  useEffect(() => {
    if (activeReceiverId) {
      connectSocket();
      socket.emit('joinChatConversation', user?.id);
      const handleNewMessage = (msg: any) => {
        console.log('check tin nhắn mới nhất ', msg);
        setAllMessages((prev) => {
          const exists = prev.some((m) => m.id === msg.id);
          if (!exists) {
            return [msg, ...prev];
          }
          return prev;
        });
      };
      const handleUserStatusUpdate = (data: { userId: string; active: boolean; lastActive: string }) => {
        console.log(' check hoạt động', data);
        if (data.userId === user.id) {
          setReceiverStatus({ active: data.active, lastActive: new Date(data.lastActive) });
        }
      };
      socket.on('newMessageChat', handleNewMessage);
      socket.on('userStatusUpdate', handleUserStatusUpdate);
      return () => {
        socket.off('newMessageChat', handleNewMessage);
        socket.off('userStatusUpdate', handleUserStatusUpdate);
      };
    }
  }, [socket, user?.id, activeReceiverId]);
  console.log('hoạt động ', receiverStatus);
  const handleSendMessages = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    mutationSendMessage.mutate({ content: message, receiverId: activeReceiverId });
    setMessage('');
  };

  return (
    <div className='flex h-screen bg-white'>
      {/* Sidebar trái */}
      <div className='w-80 border-r border-gray-200 flex flex-col'>
        <div className='p-4 border-b border-gray-200 flex justify-between items-center'>
          <h1 className='text-xl font-semibold text-gray-600'>Chats</h1>
          <Button variant='ghost' size='icon' className='text-gray-600'>
            <Plus className='h-5 w-5' />
          </Button>
        </div>

        <div className='p-4'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
            <Input placeholder='Search here..' className='pl-10 bg-gray-100 outline-none py-2' />
          </div>
        </div>

        <ListUser getReceiverId={setUserConversation} />
      </div>
      <div className='flex-1 flex flex-col'>
        {activeReceiverId ? (
          <>
            <div className='p-4 border-b border-gray-200 flex justify-between items-center'>
              <div className='flex items-center'>
                <img
                  src={selectedUser?.avatar || userConversation?.avatar}
                  alt='Avatar'
                  className='rounded-full w-8 h-8 object-cover'
                />
                <div className='ml-3'>
                  <h2 className='font-semibold text-gray-600'>
                    {selectedUser?.fullname || userConversation?.fullname}
                  </h2>
                  {receiverStatus.active ? (
                    <div className='flex items-center gap-[10px]'>
                      <div className='h-2 w-2 bg-green-500 rounded-full '></div>
                      <p className='text-sm text-gray-500'>Hoạt động</p>
                    </div>
                  ) : (
                    <div className='flex items-center gap-[10px]'>
                      <div className='h-2 w-2 bg-red-500 rounded-full '></div>
                      <p className='text-sm text-gray-500'>Không hoạt động</p>
                    </div>
                  )}
                </div>
              </div>
              <Button variant='ghost' size='icon' className='text-gray-600'>
                <MoreVertical className='h-5 w-5' />
              </Button>
            </div>
            <div className='flex-1 overflow-y-auto p-4'>
              {isLoading ? (
                <p>Đang tải tin nhắn...</p>
              ) : (
                <>
                  <ListMessage messages={allMessages} />
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>
            <div className='p-4 border-t border-gray-200 bg-white'>
              <form onSubmit={handleSendMessages} className='flex items-center'>
                <Button variant='ghost' size='icon' className='text-gray-500'>
                  <Smile className='h-5 w-5' />
                </Button>
                <div className='flex-1 mx-2'>
                  <Input
                    placeholder='Type your message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className='outline-none py-2 px-4'
                  />
                </div>
                <Button variant='ghost' size='icon' className='text-gray-500'>
                  <Paperclip className='h-5 w-5' />
                </Button>
                <Button type='submit' size='icon' className='ml-2 bg-red-600 hover:bg-red-700'>
                  <Send className='h-5 w-5' />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className='flex-1 flex items-center justify-center'>
            <p className='text-gray-500 text-lg'>Vui lòng chọn người dùng để nhắn tin</p>
          </div>
        )}
      </div>
    </div>
  );
}
