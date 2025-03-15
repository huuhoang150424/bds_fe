import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import React from 'react';
import { IoWarningOutline } from 'react-icons/io5';

function Warning() {
  return (
    <div className='warning'>
      <HoverCard>
        <HoverCardTrigger >
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
                    <Checkbox id='address' />
                    <label
                      htmlFor='address'
                      className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed'
                    >
                      Địa chỉ bất động sản
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox id='info' />
                    <label
                      htmlFor='info'
                      className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed'
                    >
                      Các thông tin về giá, diện tích, mô tả,..
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox id='image' />
                    <label
                      htmlFor='image'
                      className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed'
                    >
                      Ảnh
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox id='duplicate' />
                    <label
                      htmlFor='duplicate'
                      className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed'
                    >
                      Trùng với tin giao khác
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox id='contact' />
                    <label
                      htmlFor='contact'
                      className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed'
                    >
                      Không liên lạc được
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox id='fake' />
                    <label
                      htmlFor='fake'
                      className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed'
                    >
                      Tin không có thật
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox id='sold' />
                    <label
                      htmlFor='sold'
                      className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed'
                    >
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
        </HoverCardTrigger>
        <HoverCardContent side="top" className='mb-[10px]'>
          <p>Báo cáo tin đăng vi phạm</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

export default Warning;
