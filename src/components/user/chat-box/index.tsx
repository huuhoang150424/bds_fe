// components/MessengerClone.tsx
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { Conversation, Messages } from '@/constant/const-chat';
import { ChatList } from './components/chat-list';
import { ChatHeader } from './components/chat-header';
import { MessageList } from './components/message-list';
import { MessageInput } from './components/message-input';


// const initialMessages: Messages = {
//   // ... (giữ nguyên dữ liệu messages)
// };
const conversations: Conversation[] = [
  // GIỮ NGUYÊN DỮ LIỆU CỦA BẠN Ở ĐÂY
  {
    id: 'hoang',
    name: 'Tài, Hoàng',
    avatar: '/placeholder.svg?height=40&width=40',
    status: 'online',
    lastMessage: 'Cuộc gọi đang diễn ra',
    time: '1 giờ',
    unread: false,
    isActive: true,
  },
  {
    id: '2',
    name: 'Thông',
    avatar: '/placeholder.svg?height=40&width=40',
    status: 'online',
    lastMessage: 'Cuộc gọi đang diễn ra',
    time: '1 giờ',
    unread: false,
    isActive: true,
  },
  // ... (các conversation khác)
];

const messages: Messages = {
  // GIỮ NGUYÊN DỮ LIỆU CỦA BẠN Ở ĐÂY
  hoang: [
    {
      id: 1,
      sender: 'Nguyễn Hữu Hoàng',
      content: 'File phương tiện',
      time: '',
      isUser: false,
    },
    {
      id: 2,
      sender: 'Nguyễn Hữu Hoàng',
      content: 'hello, tôi đây',
      time: '',
      isUser: false,
    },
    {
      id: 3,
      sender: 'Nguyễn Hữu Hoàng',
      content: 'bạn khỏe chứ chứ chứ chứ chứ', 
      time: '',
      isUser: false,
    },
    // ... (các message khác)
  ],
};

export default function MessengerClone() {
  const [activeChat, setActiveChat] = useState<string>(conversations[0].id);
  const [message, setMessage] = useState<string>('');
  const [showChatArea, setShowChatArea] = useState<boolean>(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  const handleConversationClick = (conversationId: string) => {
    setActiveChat(conversationId);
    setShowChatArea(true);
  };

  const activeConversation = conversations.find((conv) => conv.id === activeChat) || conversations[0];
  console.log("hello")
  return (
    <div className="h-screen w-full bg-gray-100 relative">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed left-6 bottom-6 bg-blue-600 hover:bg-blue-700 rounded-full h-14 w-14 p-0 shadow-lg">
            <MessageSquare className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="p-0 sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[1000px] max-h-[100vh] bg-[#fff] text-black border-gray-200 overflow-hidden">
          <div className="flex h-full max-h-full">
            {/* Sidebar */}
            <div className={`${showChatArea ? 'hidden md:flex' : 'flex'} w-full md:w-80`}>
              <ChatList
                conversations={conversations}
                activeChat={activeChat}
                handleConversationClick={handleConversationClick}
              />
            </div>

            {/* Chat Area */}
            <div className={`${!showChatArea ? 'hidden md:flex' : 'flex'} flex-col flex-1 overflow-hidden`}>
              <ChatHeader
                activeConversation={activeConversation}
                setShowChatArea={setShowChatArea}
              />
              
              <MessageList messages={messages} activeChat={activeChat} />
              
              <MessageInput
                message={message}
                setMessage={setMessage}
                handleSendMessage={handleSendMessage}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}