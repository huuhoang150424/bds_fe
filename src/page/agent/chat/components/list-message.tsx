import { useEffect, useRef } from 'react';
import Message from './message';

export default function ListMessage({ messages, messagesEndRef }: { messages: any; messagesEndRef: React.RefObject<HTMLDivElement> }) {
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, messagesEndRef]);

  return (
    <div
      ref={messageContainerRef}
      className='space-y-6 overflow-y-auto max-h-[87.6vh] py-[25px] px-[20px]'
    >
      {messages?.slice().reverse().map((message: any, index: number) => (
        <Message
          key={message.id || index}
          message={message}
          isNew={index === 0} 
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}