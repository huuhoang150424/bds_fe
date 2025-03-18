// components/ChatHeader.tsx
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Conversation } from '@/constant/const-chat';
import { Phone, Video, Info, X } from 'lucide-react';

interface ChatHeaderProps {
  activeConversation: Conversation;
  setShowChatArea: (show: boolean) => void;  
}

export const ChatHeader = ({ activeConversation, setShowChatArea }: ChatHeaderProps) => {
  return (
    <div className="p-3 border-b border-gray-200 flex justify-between items-center shrink-0">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-full mr-1"
          onClick={() => setShowChatArea(false)}
        >
          <X className="h-5 w-5" />
        </Button>
        <Avatar>
          <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} />
          <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{activeConversation.name}</h2>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            {activeConversation.status === 'online' && (
              <>
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Đang hoạt động
              </>
            )}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Phone className="h-5 w-5" color='#007DF2' />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Video className="h-5 w-5" color='#007DF2' />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Info className="h-5 w-5" color='#007DF2' />
        </Button>
      </div>
    </div>
  );
};