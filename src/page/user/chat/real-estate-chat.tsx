import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Send, X, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ListMessage from './components/list-message';
import { useAppContext } from '@/context/chat';

interface MessageSuggestion {
  id: number;
  text: string;
  visible: boolean;
}

export function MessageSuggestions({
  onSelectSuggestion,
  isOpen,
}: {
  onSelectSuggestion: (text: string) => void;
  isOpen: boolean;
}) {
  const initialSuggestions = [
    { id: 1, text: 'Tư vấn mua nhà 5 tỷ', visible: false },
    { id: 2, text: 'Nhà 2 phòng ngủ dưới 3 tỷ', visible: false },
    { id: 3, text: 'Căn hộ chung cư Hà Đông', visible: false },
    { id: 4, text: 'Đất nền giá rẻ Long Biên', visible: false },
    { id: 5, text: 'Tôi có 7 tỷ nên mua nhà như thế nào?', visible: false },
  ];
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  useEffect(() => {
    if (isOpen) {
      setSuggestions(initialSuggestions);
    }
  }, [isOpen]);

  useEffect(() => {
    suggestions.forEach((suggestion, index) => {
      setTimeout(() => {
        setSuggestions((prev) => prev.map((s) => (s.id === suggestion.id ? { ...s, visible: true } : s)));
      }, index * 200);
    });
  }, [suggestions.length]);

  const handleSuggestionClick = (text: string, id: number) => {
    onSelectSuggestion(text);
    setSuggestions([]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.7, y: 30, rotateX: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 20,
        mass: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.7,
      y: 30,
      rotateX: -20,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      background: ['linear-gradient(to right, #fef2f2, #fee2e2)', 'linear-gradient(to right, #fee2e2, #fef2f2)'],
      transition: {
        duration: 0.3,
        background: {
          repeat: 'repeat',
          duration: 1.5,
        },
      },
    },
  };

  return (
    <>
      {suggestions.length === 0 ? null : (
        <motion.div
          className='flex flex-wrap gap-2 px-4 py-3 bg-white rounded-lg'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          exit='hidden'
          style={{
            background: 'linear-gradient(135deg, #fff7f7, #ffffff)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        >
          <style>
            {`
              @keyframes pulse {
                0% { background: linear-gradient(135deg, #fff7f7, #ffffff); }
                50% { background: linear-gradient(135deg, #ffffff, #fff7f7); }
                100% { background: linear-gradient(135deg, #fff7f7, #ffffff); }
              }
            `}
          </style>
          <AnimatePresence>
            {suggestions.map(
              (suggestion) =>
                suggestion.visible && (
                  <motion.div
                    key={suggestion.id}
                    variants={buttonVariants}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                  >
                    <motion.button
                      className='bg-gradient-to-r from-red-50 to-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all border border-red-200 flex items-center'
                      onClick={() => handleSuggestionClick(suggestion.text, suggestion.id)}
                      variants={hoverVariants}
                      whileHover='hover'
                    >
                      <span className='mr-1.5'>
                        {/* Giữ nguyên các biểu tượng SVG hiện có */}
                        {suggestion.id === 1 && (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
                            <polyline points='9 22 9 12 15 12 15 22' />
                          </svg>
                        )}
                        {suggestion.id === 2 && (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path d='M2 4v16' />
                            <path d='M2 8h18a2 2 0 0 1 2 2v10' />
                            <path d='M2 17h20' />
                            <path d='M6 8v9' />
                          </svg>
                        )}
                        {suggestion.id === 3 && (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <rect width='16' height='20' x='4' y='2' rx='2' ry='2' />
                            <path d='M9 22v-4h6v4' />
                            <path d='M8 6h.01' />
                            <path d='M16 6h.01' />
                            <path d='M12 6h.01' />
                            <path d='M12 10h.01' />
                            <path d='M12 14h.01' />
                            <path d='M16 10h.01' />
                            <path d='M16 14h.01' />
                            <path d='M8 10h.01' />
                            <path d='M8 14h.01' />
                          </svg>
                        )}
                        {suggestion.id === 4 && (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <polygon points='3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21' />
                            <line x1='9' x2='9' y1='3' y2='18' />
                            <line x1='15' x2='15' y1='6' y2='21' />
                          </svg>
                        )}
                        {suggestion.id === 5 && (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path d='M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4' />
                            <path d='M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3' />
                            <path d='M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35z' />
                            <path d='M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14' />
                          </svg>
                        )}
                      </span>
                      {suggestion.text}
                    </motion.button>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}
export default function RealEstateChat() {
  const { socket, connectSocket } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [allMessages, setAllMessages] = useState<any[]>([
    {
      message: 'Xin chào! Tôi là trợ lý bất động sản. Bạn muốn tìm kiếm bất động sản hay cần tư vấn mua nhà?',
      posts: [],
      advice: '',
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    connectSocket();
    socket.on('chatResponse', (data: any) => {
      setIsLoading(false);
      setAllMessages((prev) => [data, ...prev]);
    });
    return () => {
      socket.off('chatResponse');
    };
  }, [socket, connectSocket]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen]);

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

  const handleSelectSuggestion = (text: string) => {
    setAllMessages((prev) => [text, ...prev]);
    setIsLoading(true);
    socket.emit('chatMessage', { content: text });
  };

  return (
    <div className='fixed bottom-4 left-4 z-[9999999999]'>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className='mb-4'
          >
            <Card className='w-[800px] rounded-lg shadow-xl overflow-hidden border border-gray-200'>
              <CardHeader className='bg-gradient-to-r from-red-500 to-red-600 text-white p-4 flex flex-row justify-between items-center'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm flex items-center justify-center mr-3 shadow-lg border border-white/30 relative'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='22'
                      height='22'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='lucide lucide-home'
                    >
                      <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
                      <polyline points='9 22 9 12 15 12 15 22' />
                    </svg>
                    <span className='absolute inset-0 rounded-full border border-white/50 animate-ping'></span>
                  </div>
                  <div className='flex flex-col'>
                    <h3 className='text-[17px] font-[600]'>Trợ lý bất động sản</h3>
                    <div className='flex items-center text-xs text-white/90'>
                      <span className='inline-block w-2 h-2 bg-green-300 rounded-full mr-1.5'></span>
                      Đang hoạt động
                    </div>
                  </div>
                </div>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={toggleChat}
                  className='h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white'
                >
                  <X className='h-4 w-4' />
                </Button>
              </CardHeader>
              <div className='flex'>
                <div className='flex-1 border-r flex flex-col'>
                  <CardContent className='p-0 flex-1'>
                    <ListMessage
                      allMessages={allMessages}
                      isLoading={isLoading}
                      messagesEndRef={messagesEndRef}
                      isOpen={isOpen}
                      onSelectSuggestion={handleSelectSuggestion}
                    />
                  </CardContent>
                  <CardFooter className='p-3 border-t bg-white'>
                    <form onSubmit={handleSendMessage} className='relative w-full'>
                      <Input
                        placeholder='Nhập yêu cầu tìm kiếm hoặc tư vấn...'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className='w-full border border-gray-300 rounded-full py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
                        disabled={isLoading}
                      />
                      <Button
                        type='submit'
                        size='icon'
                        className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600'
                        disabled={isLoading}
                      >
                        <Send className='h-4 w-4' />
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
          variant='outline'
          onClick={toggleChat}
          size='icon'
          className='h-14 w-14 rounded-full shadow-lg bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in-out'
        >
          <MessageCircle className='h-6 w-6 text-white' />
        </Button>
      </motion.div>
    </div>
  );
}
