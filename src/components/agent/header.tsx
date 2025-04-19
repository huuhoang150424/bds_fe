import type React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BadgeCheck, Building2, ChevronDown, CreditCard, LogOut, Settings, UserIcon, Wallet } from 'lucide-react';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { selectUser } from '@/redux/authReducer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(amount);
};
const RoleBadge = ({ role }: { role: string }) => {
  const roleConfig = {
    admin: {
      label: 'Admin',
      className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      icon: <BadgeCheck className='h-3 w-3 mr-1' />,
    },
    user: {
      label: 'User',
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      icon: <UserIcon className='h-3 w-3 mr-1' />,
    },
    agent: {
      label: 'Môi giới',
      className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      icon: <Building2 className='h-3 w-3 mr-1' />,
    },
  }[role] || {
    label: 'User',
    className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    icon: <UserIcon className='h-3 w-3 mr-1' />,
  };

  return (
    <Badge variant='outline' className={`flex items-center gap-1 font-medium ${roleConfig.className}`}>
      {roleConfig.icon}
      {roleConfig.label}
    </Badge>
  );
};
const WalletBalance = ({ balance }: { balance: number }) => {
  return (
    <Card className='p-3 mt-2 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 border border-indigo-100 dark:border-indigo-900'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center'>
            <Wallet className='h-3 w-3 mr-1' />
            Số dư tài khoản
          </p>
          <p className='text-lg font-bold text-indigo-700 dark:text-indigo-400'>{formatCurrency(balance)}</p>
          {balance > 10000 && (
            <p className='text-xs text-green-600 dark:text-green-400 mt-1'>Giảm 94% so với tháng trước</p>
          )}
        </div>
        <div className='relative h-12 w-12'>
          <div className='absolute inset-0 animate-pulse rounded-full bg-blue-100 dark:bg-blue-900 opacity-70'></div>
          <CreditCard className='absolute inset-0 m-auto h-6 w-6 text-blue-600 dark:text-blue-400' />
        </div>
      </div>
    </Card>
  );
};

const Header: React.FC = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  return (
    <header className='flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800 h-16 shrink-0 bg-white dark:bg-gray-950 transition-all ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger className='-ml-1' />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='flex items-center gap-2 rounded-full pr-2 pl-1 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'>
            <Avatar className='h-8 w-8 border border-gray-200 dark:border-gray-700'>
              <AvatarImage src={user?.avatar || '/placeholder.svg'} alt={user?.fullname} />
              <AvatarFallback>{user?.fullname.charAt(0)}</AvatarFallback>
            </Avatar>
            <ChevronDown className='h-4 w-4 text-gray-500' />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-64 p-2' align='end' forceMount>
          <DropdownMenuLabel className='font-normal p-2'>
            <div className='flex flex-col space-y-1'>
              <div className='flex items-center justify-between'>
                <p className='text-sm font-medium leading-none'>{user?.fullname}</p>
                <RoleBadge role={user?.roles || ''} />
              </div>
              <p className='text-xs leading-none text-muted-foreground'>{user?.email}</p>
            </div>

            <WalletBalance balance={user?.balance || 0} />
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
              <UserIcon className='h-4 w-4' />
              <span>Trang cá nhân</span>
            </DropdownMenuItem>
            <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
              <Settings className='h-4 w-4' />
              <span>Cài đặt</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className='flex items-center gap-2 text-red-600 dark:text-red-400 cursor-pointer'
            onClick={() => navigate('/')}
          >
            <LogOut className='h-4 w-4' />
            <span>Thoát</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
