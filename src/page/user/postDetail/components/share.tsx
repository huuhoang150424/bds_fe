import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import React from 'react';
import { IoShareSocialOutline } from 'react-icons/io5';
import { FaFacebookF } from 'react-icons/fa';
import { IoIosChatbubbles } from 'react-icons/io';
import { FaRegCopy } from 'react-icons/fa6';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const ShareComponent: React.FC = () => {
  const handleShare = async (platform: 'facebook' | 'zalo' | 'link') => {
    const shareUrl = window.location.href;
    
    try {
      switch (platform) {
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
          break;
        case 'zalo':
          // Note: Zalo sharing requires their SDK or specific URL scheme
          window.open(`https://zalo.me/share?url=${encodeURIComponent(shareUrl)}`, '_blank');
          break;
        case 'link':
          await navigator.clipboard.writeText(shareUrl);
          alert('Liên kết đã được sao chép vào clipboard');
          break;
      }
    } catch (error) {
      alert('Không thể thực hiện chia sẻ');
    }
  };

  return (
    <div className="share">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Popover>
            <PopoverTrigger className="w-[40px] h-[40px] p-0 border-none bg-transparent hover:bg-gray-100 rounded-full flex items-center justify-center">
              <IoShareSocialOutline className="text-[24px]" />
            </PopoverTrigger>
            <PopoverContent className="w-[200px]">
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                >
                  <FaFacebookF className="text-blue-500" />
                  <span>Facebook</span>
                </button>
                <button
                  onClick={() => handleShare('zalo')}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                >
                  <IoIosChatbubbles className="text-gray-500" />
                  <span>Zalo</span>
                </button>
                <button
                  onClick={() => handleShare('link')}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                >
                  <FaRegCopy />
                  <span>Sao chép liên kết</span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </HoverCardTrigger>
        <HoverCardContent side="top" className="mb-[10px] w-auto px-3 py-1.5">
          <p className="text-sm">Chia sẻ tin đăng</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default ShareComponent;