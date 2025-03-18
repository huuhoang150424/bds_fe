// components/ChatList.tsx
'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Conversation } from '@/constant/const-chat';
import { Search, MoreVertical, MessageSquare } from 'lucide-react';

interface ChatListProps {
  conversations: Conversation[];
  activeChat: string;
  handleConversationClick: (conversationId: string) => void;
}

export const ChatList = ({
  conversations,
  activeChat,
  handleConversationClick,
}: ChatListProps) => {
  return (
    <div className="w-full md:w-80 border-r border-gray-200 flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-xl font-bold">Đoạn chat</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVertical className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm trên Messenger"
            className="pl-10 bg-g[#F0F0F0] border-gray-200 text-black py-[4px]"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="inbox" className="w-full flex flex-col flex-grow overflow-hidden">
        <TabsList className="grid w-full grid-cols-2 bg-transparent">
          <TabsTrigger
            value="inbox"
            className="flex justify-center rounded-none text-center mb-[10px] "
          >
            <div className='mx-auto py-[5px] px-[15px] rounded-[45px] bg-[#F0F0F0]'> Hộp thư</div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="inbox" className="mt-0 flex-grow flex flex-col overflow-hidden">
          <div className="flex-1 relative overflow-hidden">
            <ScrollArea className="absolute inset-0">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => handleConversationClick(conversation.id)}
                  className={`flex items-center gap-3 p-2 hover:bg-[#fff] cursor-pointer ${
                    activeChat === conversation.id ? 'bg-[#EBF5FF]' : ''
                  }`}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={conversation.avatar} alt={conversation.name} />
                      <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conversation.status === 'online' && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium truncate">{conversation.name}</p>
                      <span className="text-xs text-gray-400">{conversation.time}</span>
                    </div>
                    <p
                      className={`text-sm truncate ${
                        conversation.unread ? 'text-white font-medium' : 'text-gray-400'
                      }`}
                    >
                      {conversation.isActive ? (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full" />
                          {conversation.lastMessage}
                        </span>
                      ) : (
                        conversation.lastMessage
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};