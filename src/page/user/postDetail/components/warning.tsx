import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card';
import React, { useState } from 'react';
import { IoWarningOutline } from 'react-icons/io5';

interface WarningProps {
  isAuthenticated?: boolean;
  onAuthRequired?: () => void;
}

function Warning({ isAuthenticated = false, onAuthRequired }: WarningProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isAuthenticated) {
      setIsOpen(true); // Chỉ mở modal báo cáo nếu đã đăng nhập
    } else if (onAuthRequired) {
      onAuthRequired(); // Hiển thị modal yêu cầu đăng nhập nếu chưa đăng nhập
    }
  };

  return (
    <div className='warning'>
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className='text-[24px]' onClick={handleClick}>
            <IoWarningOutline />
          </div>
        </HoverCardTrigger>
        <HoverCardContent side='top'><p>Cảnh báo</p></HoverCardContent>
      </HoverCard>

      {isAuthenticated && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className='w-[400px]'>
            <div>
              <div>
                <span className='text-lg font-[500]'>Báo cáo tin rao có thông tin không đúng</span>
              </div>
              <div className='border border-gray-100 my-[10px]'></div>
              <div className='space-y-4'>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='terms1' />
                  <label htmlFor='terms1' className='text-sm font-normal leading-none'>
                    Địa chỉ bất động sản
                  </label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='terms2' />
                  <label htmlFor='terms2' className='text-sm font-normal leading-none'>
                    Các thông tin về giá, diện tích, mô tả,...
                  </label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='terms3' />
                  <label htmlFor='terms3' className='text-sm font-normal leading-none'>
                    Ảnh
                  </label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='terms4' />
                  <label htmlFor='terms4' className='text-sm font-normal leading-none'>
                    Trùng với tin giao khác
                  </label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='terms5' />
                  <label htmlFor='terms5' className='text-sm font-normal leading-none'>
                    Không liên lạc được
                  </label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='terms6' />
                  <label htmlFor='terms6' className='text-sm font-normal leading-none'>
                    Tin không có thật
                  </label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='terms7' />
                  <label htmlFor='terms7' className='text-sm font-normal leading-none'>
                    Bất động sản đã bán
                  </label>
                </div>
                <Button className='w-full bg-[#E03C31] hover:bg-[#FF837A]'>
                  <span>Gửi</span>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default Warning;