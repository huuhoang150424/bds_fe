import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ListMessage from "./components/list-message";
import io from 'socket.io-client';

let socket: any;

export default function RealEstateChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [allMessages, setAllMessages] = useState<any[]>([
    {
      message: "Xin chào! Tôi là trợ lý bất động sản. Bạn muốn tìm kiếm bất động sản nào?",
      posts: []
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    socket = io('http://localhost:3000', {
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("chatResponse", (data: any) => {
        setIsLoading(false);
        setAllMessages((prev) => [data, ...prev]);
      });
    }
    return () => {
      socket.off("chatResponse");
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages, isLoading]);

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      setAllMessages((prev) => [input, ...prev]);
      setIsLoading(true);
      socket.emit('chatMessage', { content: input });
      setInput('');
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-[9999999999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mb-4"
          >
            <Card className="w-[800px] rounded-[8px] shadow-lg overflow-hidden border border-gray-200">
              <CardHeader className="bg-red-500 text-primary-foreground p-4 flex flex-row justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <h3 className="font-semibold">Trợ lý bất động sản</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleChat}
                  className="h-8 w-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <div className="flex">
                <div className="flex-1 border-r flex flex-col">
                  <CardContent className="p-0 flex-1">
                    <ListMessage 
                      allMessages={allMessages}
                      isLoading={isLoading}
                      messagesEndRef={messagesEndRef}
                    />
                  </CardContent>
                  <CardFooter className="p-3 border-t">
                    <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                      <Input
                        placeholder="Nhập yêu cầu tìm kiếm..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 outline-none px-[12px]"
                        disabled={isLoading}
                      />
                      <Button type="submit" size="icon" className="rounded-full" disabled={isLoading}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </CardFooter>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button 
          variant={'outline'} 
          onClick={toggleChat} 
          size="icon" 
          className="h-14 w-14 rounded-full shadow-lg bg-red-500 hover:bg-red-[400] transition-all duration-300 ease-in-out"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </motion.div>
    </div>
  );
}