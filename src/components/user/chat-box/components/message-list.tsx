// components/MessageList.tsx
'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Conversation, Messages } from '@/constant/const-chat';

interface MessageListProps {
  messages: Messages;
  activeChat: string;
}

export const MessageList = ({ messages, activeChat }: MessageListProps) => {
  return (
    <div className="flex-1 relative overflow-hidden">
      <ScrollArea className="h-[500px] w-full overflow-y-auto px-2">
        <div className="space-y-4 p-3">
          {messages[activeChat]?.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              {!msg.isUser && (
                <Avatar className="mr-2 h-8 w-8 flex-shrink-0">
                  <AvatarImage src="/placeholder.svg" alt={msg.sender} />
                  <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div className="flex flex-col">
                {!msg.isUser && <p className="ml-2 text-xs text-gray-400">{msg.sender}</p>}
                <div
                  className={`inline-block max-w-xs rounded-2xl px-4 py-2 ${
                    msg.isUser ? 'bg-blue-600 text-white' : 'bg-[#F0F0F0] text-black'
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
                {msg.time && <p className="mt-1 ml-2 text-xs text-gray-400">{msg.time}</p>}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};