import { useEffect } from 'react';
import CustomImage from '../common/images';
import { CiHeart } from 'react-icons/ci';
import { Button } from '@/components/ui/button';
import { FaBarsStaggered } from 'react-icons/fa6';
import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { useAuthModal } from '@/context/auth-modal';
import {  logout, selectIsAuthenticated, selectUser } from '@/redux/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@/lib/utils';
import { PiBellRinging } from 'react-icons/pi';
import { IoChevronDownOutline } from 'react-icons/io5';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { BsCheckAll } from 'react-icons/bs';
import { AiFillDashboard } from "react-icons/ai";
import {
  FaLock,
  FaSignOutAlt,
  FaClipboardList,
  FaUsers,
  FaWallet,
  FaGift,
  FaMoneyBillWave,
} from 'react-icons/fa';
import { MdDashboard, MdManageAccounts } from 'react-icons/md';
import { AppDispatch } from '@/redux/store';
import { handleApi } from '@/service';
import { toast } from '@/hooks/use-toast';
import { Loading } from '../common';
import { Link } from 'react-router-dom';
const menuItemsSell = [
  'Bán căn hộ chung cư',
  'Bán chung cư mini, căn hộ dịch vụ',
  'Bán nhà riêng',
  'Bán nhà biệt thự, liền kề',
  'Bán nhà mặt phố',
  'Bán shophouse, nhà phố thương mại',
  'Bán đất nền dự án',
  'Bán đất',
  'Bán trang trại, khu nghỉ dưỡng',
  'Bán condotel',
  'Bán kho, nhà xưởng',
  'Bán loại bất động sản khác',
];
const menuItemsRent = [
  'Cho thuê chung cư mini, căn hộ dịch vụ',
  'Cho thuê nhà riêng',
  'Cho thuê nhà biệt thự, liền kề',
  'Cho thuê nhà mặt phố',
  'Cho thuê shophouse, nhà phố thương mại',
  'Cho thuê nhà trọ, phòng trọ',
  'Cho thuê văn phòng',
  'Cho thuê, sang nhượng cửa hàng, ki ốt',
  'Cho thuê kho, nhà xưởng',
  'Cho thuê loại bất động sản khác',
];
const menuItemsProject = [
  'Căn hộ chung cư',
  'Cao ốc văn phòng',
  'Trung tâm thương mại',
  'Khu đô thị mới',
  'Khu phức hợp',
  'Nhà ở xã hội',
  'Khu nghỉ dưỡng, sinh thái',
  'Khu công nghiệp',
  'Biệt thự liền kề',
  'Shophouse',
  'Nhà mặt phố',
  'Dự án khác',
];
const menuItemsContact = ['Nhà môi giới', 'Doanh nghiệp'];

function Header() {
  const { openModal } = useAuthModal();
  const dispatch=useDispatch<AppDispatch>();
  const user=useSelector(selectUser);
  const isAuthenticated=useSelector(selectIsAuthenticated);
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [heightHeader, setHeightHeader] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [read, setRead] = useState(false);

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleScroll = () => {
    if (window.scrollY > 70) {
      setHeightHeader(true);
    } else {
      setHeightHeader(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleLogout=async()=>{
    setLoading(true);
    try {
      console.log("check")
      const res = await handleApi('/auth/logout', null, 'POST');
      console.log(res)
      toast({
        variant: 'success',
        title: res.data.message
      })
      dispatch(logout());
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  }
  return (
    <header
      className={` bg-[#fff] w-full flex items-center justify-between ${heightHeader ? 'py-[10px]' : 'py-[20px]'}  px-[50px] shadow-md fixed z-[100] transition-all duration-300 ease-in-out `}
    >
      {
        loading ? ( <Loading
          className='absolute w-full mt-[400px] '
        /> ) : ( null )
      }
      <div className='flex items-center '>
        <Link to={'/'}>
          <CustomImage
            src='../../../public/logo.svg'
            alt='Placeholder Image'
            width={40}
            height={40}
            className='rounded-lg mr-[30px] '
          />
        </Link>
        <div className=' hidden lg:block relative'>
          <ul className='flex justify-center relative'>
            <li className='relative group mr-[30px] text-[16px]'>
              <a href='#' className='hover:text-[#F97316] font-[500] transition-all duration-300 ease-in-out'>
                Nhà bán đất
              </a>
              <ul className='absolute left-0 mt-2 w-[200px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                {menuItemsSell.map((item) => {
                  return (
                    <li key={item} className='py-[4px] px-[8px]  hover:bg-gray-100 text-[14px]'>
                      <a href='#'>{item}</a>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className='relative mr-[30px] group text-[16px]'>
              <a href='#' className='hover:text-[#F97316] font-[500] transition-all duration-300 ease-in-out'>
                Nhà đất cho thuê
              </a>
              <ul className='absolute left-0 mt-2 w-[200px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                {menuItemsSell.map((item) => {
                  return (
                    <li key={item} className='py-[4px] px-[8px]  hover:bg-gray-100 text-[14px]'>
                      <a href='#'>{item}</a>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className='relative mr-[30px] group text-[16px]'>
              <a href='#' className='hover:text-[#F97316] font-[500] transition-all duration-300 ease-in-out'>
                Dự án
              </a>
              <ul className='absolute left-0 mt-2 w-[200px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                {menuItemsRent.map((item) => {
                  return (
                    <li key={item} className='py-[4px] px-[8px]  hover:bg-gray-100 text-[14px]'>
                      <a href='#'>{item}</a>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className='mr-[30px] text-[16px]'>
              <Link to={'/new'} className='hover:text-[#F97316] font-[500] transition-all duration-300 ease-in-out '>
                Tin tức
              </Link>
            </li>
            <li className='mr-[30px] text-[16px]'>
              <a href='#' className='hover:text-[#F97316] font-[500] transition-all duration-300 ease-in-out '>
                Phân tích đánh giá
              </a>
            </li>
            <li className='relative mr-[30px] group text-[16px]'>
              <a href='#' className='hover:text-[#F97316] font-[500] transition-all duration-300 ease-in-out '>
                Danh bạ
              </a>
              <ul className='absolute left-0 mt-2 w-[200px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                <li className='py-[4px] px-[8px]  hover:bg-gray-100 text-[14px]'>
                  <a href='#'>Nhà môi giới</a>
                </li>
                <li className='p-[4px] px-[8px] hover:bg-gray-100 text-[14px]'>
                  <a href='#'>Doanh nghiệp</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className='hidden lg:block flex items-center lg:flex'>
        <Popover >
          <PopoverTrigger >
            <CiHeart size={ 22 } className='mr-[20px] ' />
          </PopoverTrigger>
          <PopoverContent className='z-[100] mt-[10px] w-[350px]'>
            <div className=''>
              <span className='flex justify-center text-[16px] font-bold'>Tin đăng đã lưu</span>
              <div className='w-full border border-gray-100 my-[15px]'></div>
              <div className='flex justify-center'>
                <img
                  className='h-[100px] flex justify-center'
                  src='https://th.bing.com/th/id/OIP.ANM1SjqLEqA6dNmd5lzuNwHaHa?rs=1&pid=ImgDetMain'
                  alt='save'
                />
              </div>
              <div className='flex items-center gap-1 justify-center'>
                bấm <CiHeart /> để lưu tin
              </div>
            </div>
          </PopoverContent>
        </Popover>

        { isAuthenticated ? (
          <div className='flex items-center gap-[20px] mr-[15px]'>
            <Popover>
              <PopoverTrigger>
                <PiBellRinging size={ 22 } />
              </PopoverTrigger>
              <PopoverContent className='z-[100] w-[500px] mt-[10px]'>
                <div className='flex items-center justify-between mb-[10px]'>
                  <span>Thông báo</span>
                  <div className='flex items-center space-x-2'>
                    <Switch id='airplane-mode' />
                    <label htmlFor='airplane-mode'>Chưa đọc</label>
                    <HoverCard>
                      <HoverCardTrigger>
                        <div className='text-[24px]'>
                          <BsCheckAll
                            className={ cn( read === true ? 'opacity-20' : 'font-bold' ) }
                            onClick={ () => setRead( !read ) }
                          />
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent>Đánh dấu tất cả đã đọc thông báo</HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
                <div className='border border-gray-100 w-full flex justify-center'></div>
                <div>
                  <Tabs defaultValue='account' className='w-[500px] '>
                    <TabsList className='bg-[#fff]'>
                      <TabsTrigger className='bg-[#fff] hover:text-[#E03C31]' value='account'>
                        Tất cả
                      </TabsTrigger>
                      <TabsTrigger className='bg-[#fff] hover:text-[#E03C31]' value='password'>
                        Tin đăng
                      </TabsTrigger>
                      <TabsTrigger className='bg-[#fff] hover:text-[#E03C31]' value='password'>
                        Tài chính
                      </TabsTrigger>
                      <TabsTrigger className='bg-[#fff] hover:text-[#E03C31]' value='password'>
                        Khuyến mãi
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value='account'>Make changes to your account here.</TabsContent>
                    <TabsContent value='password'>Change your password here.</TabsContent>
                  </Tabs>
                </div>
              </PopoverContent>
            </Popover>
            <HoverCard>
              <HoverCardTrigger>
                <div className='avt flex items-center gap-[10px] relative'>
                  <div>
                    <CustomImage
                      src={ user?.avatar }
                      alt='user'
                      className='w-[30px] h-[30px] rounded-[50%] border border-gray-200 '
                    />
                  </div>
                  <span className='text-gray-800 text-[15px] '>{ user?.fullname }</span>
                  <IoChevronDownOutline size={ 18 } className='text-gray-500 ' />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className='p-0  rounded-[10px]'>
                <div className='w-[300px]  h-[540px]'>
                  <div className='image relative w-full '>
                    <img
                      className='rounded-t-[10px] h-[150px] w-full'
                      src='https://th.bing.com/th/id/OIP.BzaY5GKh3hFvshHMlpabxAHaEj?rs=1&pid=ImgDetMain'
                      alt=' nền '
                    />
                    <div className='title absolute top-[30px] left-[45px] text-[#fff]'>
                      <h3 className='text-[24px] font-bold '>Gói hội viên</h3>
                      <span className='text-[16px] font-[500]'>Tiết kiệm đến 39%</span>
                      <Button className='bg-[#E03C31] hover:bg-[#FF837A] mt-[5px]'>Tìm hiểu thêm</Button>
                    </div>
                    <div className='h-full w-full  py-2 '>
                      {/* Menu Items */ }
                      <ul className=' text-black cursor-pointer '>
                        <Link to={'/agent/dashboard'} className='hover:bg-[#F2F2F2]'>
                          <li className='flex items-center gap-2 pb-[10px] pl-[15px] hover:bg-[#F2F2F2]'>
                            <MdDashboard /> <span>Tổng quan</span> <span className='badge'>Mới</span>
                          </li>
                        </Link>
                        <li className='flex items-center gap-2 pb-[10px] pl-[15px] hover:bg-[#F2F2F2]'>
                          <FaClipboardList /> <span>Quản lý tin đăng</span>
                        </li>
                        <li className='flex items-center gap-2 pb-[10px] pl-[15px] hover:bg-[#F2F2F2]'>
                          <FaGift /> <span>Gói hội viên</span>{ ' ' }
                          <span className='badge text-[12px] text-[#E03C31]'>-39%</span>
                        </li>
                        <li className='flex items-center gap-2 pb-[10px] pl-[15px] hover:bg-[#F2F2F2]'>
                          <FaUsers /> <span>Quản lý khách hàng</span>
                        </li>
                        <li className='flex items-center gap-2 pb-[10px] pl-[15px] hover:bg-[#F2F2F2]'>
                          <FaWallet /> <span>Quản lý tin tài trợ</span>
                        </li>
                        <li className='flex items-center gap-2 pb-[10px] pl-[15px] hover:bg-[#F2F2F2]'>
                          <MdManageAccounts /> <span>Thay đổi thông tin cá nhân</span>
                        </li>
                        <li className='flex items-center gap-2 pb-[10px] pl-[15px] hover:bg-[#F2F2F2]'>
                          <FaLock /> <span>Thay đổi mật khẩu</span>
                        </li>
                        <li className='flex items-center gap-2 pb-[10px] pl-[15px] hover:bg-[#F2F2F2]'>
                          <FaUsers /> <span>Môi giới chuyên nghiệp</span>
                        </li>
                        <li className='flex items-center gap-2 pb-[10px] pl-[15px] hover:bg-[#F2F2F2]'>
                          <FaMoneyBillWave /> <span>Nạp tiền</span>
                        </li>
                        {
                          user?.roles === 'Admin' ? ( <li className='flex items-center gap-2 pb-[10px] pl-[15px] hover:bg-[#F2F2F2]'>
                            <Link to={'/admin/dashboard'} className='flex gap-[10px] items-center '>
                              <AiFillDashboard /> <span>Quản trị</span>
                            </Link>
                          </li> ) : ( null )
                        }
                        <li onClick={ handleLogout } className='flex items-center gap-2  pl-[15px] hover:bg-[#F2F2F2]'>
                          <FaSignOutAlt /> <span>Đăng xuất</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        ) : ( <div >
          <Button
            onClick={ () => openModal( 'login' ) }
            variant={ 'outline' }
            className='px-[12px] border-none shadow-none text-[16px] font-[400]  '
          >
            Đăng nhập
          </Button>
          <Button variant={ 'outline' } className='px-[12px] border-none shadow-none text-[16px] font-[400]  '>
            Đăng ký
          </Button>
        </div>
        )
        }
        <Button
          variant={ 'outline' }
          className=' text-[17px] text-black hover:bg-[#FAFAFA] ml-[15px] px-[15px] py-[20px] '
        >
          <a href='#' className='py-[30px]'>
            Đăng tin
          </a>
        </Button>
      </div>
      <div className='lg:hidden lg:ml-[15px] flex justify-end absolute right-[50px]'>
        <Sheet>
          <SheetTrigger asChild>
            <Button className='bg-[#fff] text-black hover:bg-[#fff] border-none'>
              <FaBarsStaggered />
            </Button>
          </SheetTrigger>
          <SheetContent className='z-[99999] w-[50%] '>
            <SheetHeader>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <div className='flex flex-col items-start p-5 space-y-4 mt-10'>
              <div className='flex justify-start  w-full'>
                <Button className='bg-[#fff] text-black w-[45%] mr-[15px] border hover:bg-[#FAFAFA]'>Đăng nhập</Button>
                <Button className='bg-[#E03C31] w-[50%] ml-[20px] py-[8px] border hover:bg-[#FF837A]'>Đăng kí</Button>
              </div>
              <div className='w-full'>
                <Button className='w-full bg-[#fff] text-black border hover:bg-[#FAFAFA]'>Đăng tin</Button>
              </div>
              <ul className='table-row w-full'>
                <li className=' flex items-center justify-between w-full py-[15px]   '>
                  <a href='#' className='text-[16px] hover:text-orange-500'>
                    Nhà bán đất
                  </a>
                  <button onClick={() => toggleMenu('sell')}>
                    {openMenus['sell'] ? (
                      <MdKeyboardArrowUp className='text-gray-600 text-[24px]' />
                    ) : (
                      <MdKeyboardArrowDown className='text-gray-600 text-[24px]' />
                    )}
                  </button>
                </li>
                {openMenus['sell'] && (
                  <ul className='pl-6'>
                    {menuItemsSell.map((item, index) => (
                      <li key={index} className='py-2 hover:bg-gray-100 cursor-pointer'>
                        {item}
                        {index === 1 && (
                          <span className='ml-2 text-xs bg-red-500 text-white px-1 py-0.5 rounded'>Mới</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                <li className=' flex items-center justify-between w-full py-[15px]   '>
                  <a href='#' className='text-[16px] hover:text-orange-500'>
                    Nhà đất cho thuê
                  </a>
                  <button onClick={() => toggleMenu('rent')}>
                    {openMenus['rent'] ? (
                      <MdKeyboardArrowUp className='text-gray-600 text-[24px]' />
                    ) : (
                      <MdKeyboardArrowDown className='text-gray-600 text-[24px]' />
                    )}
                  </button>
                </li>
                {openMenus['rent'] && (
                  <ul className='pl-6'>
                    {menuItemsRent.map((item, index) => (
                      <li key={index} className='py-2 hover:bg-gray-100 cursor-pointer'>
                        {item}
                        {index === 1 && (
                          <span className='ml-2 text-xs bg-red-500 text-white px-1 py-0.5 rounded'>Mới</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                <li className=' flex items-center justify-between w-full py-[15px]   '>
                  <a href='#' className='text-[16px] hover:text-orange-500' onClick={() => setIsShow(!isShow)}>
                    Dự án
                  </a>
                  <button onClick={() => toggleMenu('project')}>
                    {openMenus['project'] ? (
                      <MdKeyboardArrowUp className='text-gray-600 text-[24px]' />
                    ) : (
                      <MdKeyboardArrowDown className='text-gray-600 text-[24px]' />
                    )}
                  </button>
                </li>
                {openMenus['project'] && (
                  <ul className='pl-6'>
                    {menuItemsProject.map((item, index) => (
                      <li key={index} className='py-2 hover:bg-gray-100 cursor-pointer'>
                        {item}
                        {index === 1 && (
                          <span className='ml-2 text-xs bg-red-500 text-white px-1 py-0.5 rounded'>Mới</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                <li className=' flex items-center justify-between w-full py-[15px]   '>
                  <a href='#' className='text-[16px] hover:text-orange-500' onClick={() => setIsShow(!isShow)}>
                    Tin tức
                  </a>
                  <div>
                    <MdKeyboardArrowDown className='flex justify-end text-gray-600 text-[24px]' />
                  </div>
                </li>
                <li className=' flex items-center justify-between w-full py-[15px]   '>
                  <a href='#' className='text-[16px] hover:text-orange-500' onClick={() => setIsShow(!isShow)}>
                    Phân tích đánh giá
                  </a>
                  <div>
                    <MdKeyboardArrowDown className='flex justify-end text-gray-600 text-[24px]' />
                  </div>
                </li>
                <li className=' flex items-center justify-between w-full py-[15px]   '>
                  <a href='#' className='text-[16px] hover:text-orange-500' onClick={() => setIsShow(!isShow)}>
                    Danh bạ
                  </a>
                  <button onClick={() => toggleMenu('contact')}>
                    {openMenus['contact'] ? (
                      <MdKeyboardArrowUp className='text-gray-600 text-[24px]' />
                    ) : (
                      <MdKeyboardArrowDown className='text-gray-600 text-[24px]' />
                    )}
                  </button>
                </li>
                {openMenus['contact'] && (
                  <ul className='pl-6'>
                    {menuItemsContact.map((item, index) => (
                      <li key={index} className='py-2 hover:bg-gray-100 cursor-pointer'>
                        {item}
                        {index === 1 && (
                          <span className='ml-2 text-xs bg-red-500 text-white px-1 py-0.5 rounded'>Mới</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Header;
