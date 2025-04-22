import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit2Icon, MapPinIcon, MoreHorizontalIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ProfileHeaderProps {
  user: any;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className='relative'>
      <div className='h-48 md:h-64 w-full  rounded-lg relative'>
        <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 rounded-lg'></div>
        <img src={user.coverPhoto} alt='Cover' className='w-full h-full object-cover rounded-lg' />
        <div className='absolute z-[50] top-[200px] left-[2%] '>
          <Avatar className='h-28 w-28 border-3 border-white dark:border-gray-900 shadow-md rounded-full overflow-hidden '>
            <AvatarImage
              src={user.avatar || '/placeholder.svg?height=112&width=112'}
              alt={user.fullname}
              className='object-cover'
            />
            <AvatarFallback className='bg-gray-200 text-gray-700 text-2xl'>{user.fullname.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className='relative pr-6 pl-[150px]  mt-3 pb-3 z-20'>
        <div className='flex flex-col md:flex-row items-start md:items-end gap-3'>
          <div className='flex w-full justify-between items-center mt-1 md:mt-0'>
            <div>
              <div className='flex items-center gap-2'>
                <h1 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white'>{user.fullname}</h1>
                {user.emailVerified && (
                  <Badge variant='outline' className='bg-green-50 text-green-700 border-green-200 text-xs'>
                    <svg className='h-3 w-3 mr-1' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M8.5 12.5L10.5 14.5L15.5 9.5'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                    </svg>
                    Đã xác thực
                  </Badge>
                )}
              </div>

              <div className='flex items-center gap-2 text-gray-500 mt-1'>
                <MapPinIcon className='h-3 w-3 text-gray-400' />
                <span className='text-xs'>{user.address}</span>
              </div>

              <div className='flex items-center gap-3 mt-1'>
                <Badge
                  variant='secondary'
                  className='text-xs bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800'
                >
                  {user.roles}
                </Badge>
                <span className='text-xs text-gray-500'>
                  Hoạt động {formatDistanceToNow(user.lastActive, { addSuffix: true, locale: vi })}
                </span>
              </div>
            </div>

            <div className='flex items-center gap-2 mt-3 md:mt-0'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' size='icon' className='h-8 w-8 border-gray-200 dark:border-gray-700'>
                    <MoreHorizontalIcon className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-48'>
                  <DropdownMenuLabel className='text-xs'>Tùy chọn</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='text-xs'>
                    <Edit2Icon className='h-3 w-3 mr-2' />
                    Chỉnh sửa hồ sơ
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-xs'>
                    <svg className='h-3 w-3 mr-2' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M19 9L12 16L5 9'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    Tải xuống thông tin
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
