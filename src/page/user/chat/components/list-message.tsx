import { ScrollArea } from "@/components/ui/scroll-area";
import Message from "./message";
import { Loader2 } from "lucide-react";
import { MessageSuggestions } from "../real-estate-chat";

function ListMessage({
  allMessages,
  isLoading,
  messagesEndRef,
  isOpen,
  onSelectSuggestion,
}: {
  allMessages: any[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  onSelectSuggestion: (text: string) => void;
}) {
  const reversedMessages = [...allMessages].reverse();
  const hasPosts = allMessages.some(
    (message) => message.posts && Array.isArray(message.posts) && message.posts.length > 0
  );

  return (
    <ScrollArea className="h-[500px]">
      <div className="p-4 space-y-6 flex flex-col min-h-full">
        {reversedMessages.map((message, index) => (
          <Message
            key={index}
            message={{
              content: message,
              sender: typeof message === "string" ? "user" : "bot",
              id: index,
            }}
          />
        ))}
        {isLoading && (
          <div className="flex justify-start items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
            <span className="text-sm text-gray-500">Đang xử lý...</span>
          </div>
        )}
        {!hasPosts && (
          <MessageSuggestions onSelectSuggestion={onSelectSuggestion} isOpen={isOpen} />
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}

export default ListMessage;