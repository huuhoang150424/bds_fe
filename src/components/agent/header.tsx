import React from 'react'
import { SidebarTrigger } from '../ui/sidebar';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/authReducer';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { CustomImage } from '@/components/common';
import { useNavigate } from 'react-router-dom';


const Header: React.FC = () =>
{
  const user = useSelector( selectUser );
  const navigate=useNavigate();

  return (
    <header className="flex items-center justify-between px-[15px] border-b border-gray-200  h-16 shrink-0  transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <SidebarTrigger className="-ml-1" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <CustomImage
              className="h-8 w-8 rounded-full object-cover border border-gray-200 cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out"
              src={ user?.avatar }
              alt="User Avatar"
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 !dark:bg-gray-900 " align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{ user?.fullname }</p>
              <p className="text-xs leading-none text-muted-foreground">{ user?.email }</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Trang cá nhân</DropdownMenuItem>
            <DropdownMenuItem>Cài đặt</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={ () => navigate("/") }>Thoát</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}



export default Header;
