import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card';
import React from 'react';
import { IoWarningOutline } from 'react-icons/io5';

function warning() {
  return (
    <div className='warning'>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Dialog>
            <DialogTrigger>
              <div className='text-[24px]'>
                <IoWarningOutline />
              </div>
            </DialogTrigger>
            <DialogContent className='w-[400px]'>
              <div>
                <div>
                  <span className='text-lg font-[500]'>Báo cáo tin rao có thông tin không đúng</span>
                </div>
                <div className='border border-gray-100 my-[10px]'></div>
                <div className='space-y-4'>
                  <div className='flex items-center space-x-2'>
                    <Checkbox id='terms' />
                    <label
                      htmlFor='terms'
                      className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed text '
                    >
                      Dịa chỉ baasrt động sản
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox id='terms' />
                    <label
                      htmlFor='terms'
                      className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed text '
                    >
                      Các thông tin về giá, diện tích, mô tả,..
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox id='terms' />
                    <label
                      htmlFor='terms'
                      className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed text '
                    >
                      Ảnh
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox id='terms' />
                    <label
                      htmlFor='terms'
                      className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed text '
                    >
                      Trùng với tin giao khác
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox id='terms' />
                    <label
                      htmlFor='terms'
                      className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed text '
                    >
                      Không liên lạc được
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox id='terms' />
                    <label
                      htmlFor='terms'
                      className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed text '
                    >
                      Tin không có thật
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox id='terms' />
                    <label
                      htmlFor='terms'
                      className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed text '
                    >
                      Bất động sản đã bán
                    </label>
                  </div>
                  <Button className='w-full bg-[#E03C31] hover:bg-[#FF837A] '>
                    <span>Gửi</span>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </HoverCardTrigger>
        <HoverCardContent side='top'><p>Cảnh báo</p></HoverCardContent>
      </HoverCard>
    </div>
  );
}

export default warning;
