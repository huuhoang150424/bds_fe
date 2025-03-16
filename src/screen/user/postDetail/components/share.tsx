import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import React from 'react'
import { IoShareSocialOutline } from 'react-icons/io5'
import { FaFacebookF } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { FaRegCopy } from "react-icons/fa6";
import { Popover } from '@radix-ui/react-popover';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
function share() {
  return (
    <div className='share'>
    <HoverCard>
      <HoverCardTrigger>
        <Popover>
          <PopoverTrigger className="w-[40px] h-[40px] p-0 border-none bg-transparent hover:bg-gray-100 rounded-full flex items-center justify-center">
            <IoShareSocialOutline className="text-[24px]" />
          </PopoverTrigger>
          <PopoverContent>
            <SelectItem value="facebook">
              <div className="flex items-center gap-2">
                <FaFacebookF />
                <span>Facebook</span>
              </div>
            </SelectItem>
            <SelectItem value="zalo">
              <div className="flex items-center gap-2">
                <IoIosChatbubbles />
                <span>Zalo</span>
              </div>
            </SelectItem>
            <SelectItem value="link">
              <div className="flex items-center gap-2">
                <FaRegCopy />
                <span>Sao chép liên kết</span>
              </div>
            </SelectItem>
          </PopoverContent>
        </Popover>
      </HoverCardTrigger>
      <HoverCardContent side='top' className='mb-[10px]'>
        <p>Chia sẻ tin đăng</p>
      </HoverCardContent>
    </HoverCard>
  </div>
  )
}

export default share