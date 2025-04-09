import Message from './message';

export default function ListMessage({ messages }: { messages: any }) {
  return (
    <div className='space-y-6'>
      {messages?.slice().reverse().map((message: any, index: number) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}