import { useSidebar } from "@/context/sidebar";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-provider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/authReducer";
import { CustomImage } from "@/components/common";
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () =>{
  const user=useSelector(selectUser);
  const { toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const handleToggle = () =>
  {
    if ( window.innerWidth >= 991 )
    {
      toggleSidebar();
    } else
    {
      toggleMobileSidebar();
    }
  };
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 flex justify-between w-full px-[25px] py-[12px] bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b ">
      <Button
        variant={ 'outline' }
        className=" px-[12px] py-[19px] text-gray-500 border-gray-200 rounded-lg z-99999 dark:bg-gray-900 dark:border-gray-800 lg:flex dark:text-gray-400 "
        onClick={ handleToggle }
      >
        <AiOutlineUnorderedList size={ 28 } />
      </Button>
      <div className="flex items-center gap-[10px] ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className=' rounded-full border border-gray-200  dark:border-gray-800 dark:bg-gray-900  '>
              { theme === 'light' ? (
                <CiSun size={30}/>
              ) : (
                <FaMoon size={30} className="dark:text-gray-300 "/>
              ) }
              <span className='sr-only'>Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className="dark:bg-gray-900 ">
            <DropdownMenuItem onClick={ () => toggleTheme( 'light' ) }>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={ () => toggleTheme( 'dark' ) }>Dark</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
            <DropdownMenuItem onClick={ () => navigate( '/' ) }>Thoát</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
};

export default Header;