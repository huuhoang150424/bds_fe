import { useEffect } from 'react';
import CustomImage from '@/components/common/images';
import { Button } from '@/components/ui/button';
import { FaBarsStaggered } from 'react-icons/fa6';
import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { useAuthModal } from '@/context/auth-modal';
import { logout, selectIsAuthenticated, selectUser } from '@/redux/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { IoChevronDownOutline } from 'react-icons/io5';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { AppDispatch } from '@/redux/store';
import { handleApi } from '@/service';
import { toast } from '@/hooks/use-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Loading } from '../../common';
import Wishlist from './components/wishlist';
import CreatePostButton from './components/create-post';
import AuthGuard from '@/page/auth/page/auth-guard-enhanced';
import Notification from './components/notification';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { menuItemsContact, menuItemsRent, menuItemsSell } from '@/constant/const-home';
import { toSlug } from '@/lib/slug';
import { BarChart3, FileText, Package, Briefcase, Wallet, Settings, LogOut, ChevronRight,} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import PaymentDigLog from './components/payment-modal';

function Header() {
  const [isModalOpenPayment, setIsModalOpenPayment] = useState(false);
  const navigate = useNavigate();
  const { openModal } = useAuthModal();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [heightHeader, setHeightHeader] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [hoverItem, setHoverItem] = useState<string | null>(null);

  const handleMenuItemClick = (listingType?: string, propertyType?: string) => {
    const params = new URLSearchParams();
    params.append('page', '1');
    params.append('limit', '10');

    if (propertyType) {
      const propertyTypeId = toSlug(propertyType);
      params.append('propertyTypeIds', propertyTypeId);
    } else if (listingType) {
      const listingTypeId = listingType === 'Nhà đất bán' ? 'Bán' : 'Cho thuê';
      params.append('listingTypeIds', listingTypeId);
    }
    navigate(`/filter?${params.toString()}`);
  };

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
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleLogout = async () => {
    setLoading(true);
    try {
      console.log('check');
      const res = await handleApi('/auth/logout', null, 'POST');
      console.log(res);
      toast({
        variant: 'success',
        title: res.data.message,
      });
      dispatch(logout());
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const menuItems = [
    {
      id: 'tong-quan',
      label: 'Tổng quan',
      icon: <BarChart3 className='w-5 h-5' />,
      onClick: () => navigate('/agent/overview'),
    },
    {
      id: 'quan-ly-tin-dang',
      label: 'Quản lý tin đăng',
      icon: <FileText className='w-5 h-5' />,
      onClick: () => console.log(' Quản lý tin đăng'),
    },
    {
      id: 'goi-hoi-vien',
      label: 'Gói hội viên',
      icon: <Package className='w-5 h-5' />,
      discount: '-39%',
      onClick: () => console.log(' Gói hội viên'),
    },
    {
      id: 'moi-gioi-chuyen-nghiep',
      label: 'Môi giới chuyên nghiệp',
      icon: <Briefcase className='w-5 h-5' />,
      onClick: () => console.log(' Môi giới chuyên nghiệp'),
    },
    {
      id: 'nap-tien',
      label: 'Nạp tiền',
      icon: <Wallet className='w-5 h-5' />,
      onClick: () => setIsModalOpenPayment(true),
    },
    {
      id: 'quan-tri',
      label: 'Quản trị',
      icon: <Settings className='w-5 h-5' />,
      onClick: () => navigate('/admin/dashboard'),
      adminOnly: true,
    },
    {
      id: 'dang-xuat',
      label: 'Đăng xuất',
      icon: <LogOut className='w-5 h-5' />,
      onClick: handleLogout,
    },
  ];
  const filteredMenuItems = menuItems.filter(
    (item) => !item.adminOnly || (item.adminOnly && user?.roles === 'Admin')
  );

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const orderCode = searchParams.get('orderCode');
    const status = searchParams.get('status');
    const cancel = searchParams.get('cancel');

    if (orderCode && (status === 'PAID' || cancel === 'true')) {
      setIsModalOpenPayment(true);
    }
  }, [location]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsModalOpenPayment(false);
      localStorage.removeItem('pendingPayment');
    }
  };

  return (
    <header
      className={` bg-[#fff] w-full flex items-center justify-between ${heightHeader ? 'py-[10px]' : 'py-[20px]'}  px-[50px] shadow-md sticky top-0 z-[100] transition-all duration-300 ease-in-out `}
    >
      {loading ? <Loading className='absolute w-full mt-[400px] ' /> : null}
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
              <span
                className='hover:text-[#F97316] cursor-pointer font-[500] transition-all duration-300 ease-in-out'
                onClick={() => handleMenuItemClick('Bán')}
              >
                Nhà đất bán
              </span>
              <ul className='absolute left-0 mt-2 px-[4px] py-[6px]  w-[200px] bg-white shadow-2xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                {menuItemsSell.map((item) => {
                  return (
                    <li
                      onClick={() => handleMenuItemClick('Bán', item)}
                      key={item}
                      className='py-[4px] px-[8px]  hover:bg-gray-200 cursor-pointer rounded-[4px]  text-[14px] transition-all duration-300 ease-in-out '
                    >
                      <span>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className='relative mr-[30px] group text-[16px]'>
              <span
                className='hover:text-[#F97316] cursor-pointer font-[500] transition-all duration-300 ease-in-out'
                onClick={() => handleMenuItemClick('Cho thuê')}
              >
                Nhà đất cho thuê
              </span>
              <ul className='absolute left-0 mt-2 px-[4px] py-[6px]  w-[200px] bg-white shadow-2xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                {menuItemsRent.map((item) => {
                  return (
                    <li
                      onClick={() => handleMenuItemClick('Cho thuê', item)}
                      key={item}
                      className='py-[4px] px-[8px]  hover:bg-gray-200 cursor-pointer rounded-[4px]  text-[14px] transition-all duration-300 ease-in-out '
                    >
                      <span>{item}</span>
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

            <li className='relative mr-[30px] group text-[16px]'>
              <a href='#' className='hover:text-[#F97316] font-[500] transition-all duration-300 ease-in-out '>
                Nhà môi giới
              </a>
              <ul className='absolute left-0 mt-2 w-[200px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                <li className='py-[4px] px-[8px]  hover:bg-gray-100 text-[14px]'>
                  <Link to={'/brokers'}>Nhà môi giới</Link>
                </li>
              </ul>
            </li>
            <li className="mr-[30px] text-[16px]">
              <Link to={'/about'}>Giới thiệu</Link>
            </li>
            <li className="mr-[30px] text-[16px]">
              <Link to={'/contact'}>Liên hệ</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className=' lg:block flex items-center lg:flex'>
        {isAuthenticated ? (
          <div className='flex items-center gap-[20px] mr-[15px]'>
            <Wishlist />
            <Notification />

            <HoverCard>
              <HoverCardTrigger>
                <div className='avt flex items-center gap-[10px] relative cursor-pointer'>
                  <div>
                    <CustomImage
                      src={user?.avatar}
                      alt='user'
                      className='w-[30px] h-[30px] rounded-[50%] border border-gray-200 '
                    />
                  </div>
                  <span className='text-gray-800 text-[15px] '>{user?.fullname}</span>
                  <IoChevronDownOutline size={18} className='text-gray-500 ' />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className='p-0  rounded-[10px]'>
                <Card className=' overflow-hidden border-0 rounded-xl shadow-2xl bg-white/90 backdrop-blur-sm'>
                  <CardHeader className='p-0'>
                    <div
                      className='relative h-32 bg-cover overflow-hidden'
                      style={{
                        backgroundImage:
                          "url('https://images.unsplash.com/photo-1507783548227-544c3b8fc065?q=80&w=1974&auto=format&fit=crop')",
                      }}
                    >
                      <div className='absolute inset-0 bg-gradient-to-b from-amber-500/20 to-amber-900/70 animate-pulse-slow' />
                      <div className='absolute inset-0 pl-[20px] pb-[15px] flex flex-col justify-end'>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className='text-white z-10'
                        >
                          <h2 className='text-[16px] font-[500] tracking-tight drop-shadow-md'>Gói hội viên</h2>
                          <p className='text-[14px] font-[400] text-amber-100 drop-shadow-md'>Tiết kiệm đến 39%</p>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className='mt-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 px-[12px] py-[8px] text-[14px] font-[500] rounded-lg shadow-lg transition-all duration-300'>
                              Tìm hiểu thêm
                            </Button>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className='p-0'>
                    <div className='divide-y divide-amber-100'>
                      {filteredMenuItems.map((item) => (
                        <motion.div
                          key={item.id}
                          className={cn(
                            'flex items-center gap-4 px-[12px] py-[8px] cursor-pointer transition-all duration-300 hover:bg-amber-50 border-l-4 border-transparent',
                            hoverItem === item.id && 'bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-500',
                          )}
                          onClick={item.onClick}
                          onMouseEnter={() => setHoverItem(item.id)}
                          onMouseLeave={() => setHoverItem(null)}
                          whileHover={{ x: 5 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <div
                            className={cn(
                              'p-2 rounded-lg transition-colors duration-300',
                              hoverItem === item.id && 'text-amber-500',
                            )}
                          >
                            {item.icon}
                          </div>
                          <div
                            className={cn(
                              'flex-1 font-medium transition-colors duration-300',
                              hoverItem === item.id && 'text-amber-800',
                            )}
                          >
                            {item.label}
                          </div>
                          {item.discount ? (
                            <div className='bg-red-100 text-red-600 font-bold px-2 py-1 rounded-md animate-pulse'>
                              {item.discount}
                            </div>
                          ) : (
                            <ChevronRight
                              className={cn(
                                'w-5 h-5 transition-transform duration-300',
                                hoverItem === item.id ? 'translate-x-1 opacity-100' : 'opacity-0',
                              )}
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </HoverCardContent>
            </HoverCard>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => openModal('login')}
              variant={'outline'}
              className='px-[12px] border-none shadow-none text-[16px] font-[400]  '
            >
              Đăng nhập
            </Button>
            <Button variant={'outline'} className='px-[12px] border-none shadow-none text-[16px] font-[400]  '>
              Đăng ký
            </Button>
          </div>
        )}
        <AuthGuard actionType='custom' customMessage='đăng tin'>
          <CreatePostButton />
        </AuthGuard>
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

      <PaymentDigLog
        open={isModalOpenPayment}
        onOpenChange={handleOpenChange}
      />


    </header>
  );
}

export default Header;
