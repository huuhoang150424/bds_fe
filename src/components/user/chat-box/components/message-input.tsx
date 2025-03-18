// components/MessageInput.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Smile, Plus, ImageIcon, Paperclip, GiftIcon, Send, ThumbsUp } from 'lucide-react';

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
}

export const MessageInput = ({ message, setMessage, handleSendMessage }: MessageInputProps) => {
  return (
    <div className="p-3 border-t border-gray-200 shrink-0">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full shrink-0">
          <Plus className="h-5 w-5" color='#007DF2' />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full shrink-0">
          <ImageIcon className="h-5 w-5" color='#007DF2' />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full shrink-0">
          <Paperclip className="h-5 w-5" color='#007DF2' />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full shrink-0">
          <GiftIcon className="h-5 w-5" color='#007DF2' />
        </Button>
        
        <div className="relative flex-1">
          <Input
            placeholder="Aa"
            className="bg-[#F0F0F0] border-gray-200 text-black rounded-full px-[10px] py-[5px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          {/* <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
          >
            <Smile className="h-[10px] w-5" color='#007DF2' />
          </Button> */}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-blue-500 shrink-0"
          onClick={handleSendMessage}
          disabled={!message.trim()}
        >
          {message.trim() ? <Send className="h-5 w-5" /> : <ThumbsUp className="h-5 w-5" color='#007DF2' />}
        </Button>
      </div>
    </div>
  );
};