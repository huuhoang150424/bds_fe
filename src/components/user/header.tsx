import  { useEffect } from 'react';
import CustomImage from '../common/images';
import { CiHeart } from 'react-icons/ci';
import { Button } from '@/components/ui/button';
import { FaBarsStaggered } from 'react-icons/fa6';
import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowUp } from 'react-icons/md';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


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
  const [isShow, setIsShow] = useState(false);
  const [heightHeader, setHeightHeader] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleScroll = () => {
    if (window.scrollY > 70) {
      setHeightHeader(true);
    } else {
      setHeightHeader(false);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])



  return (
    <header className={` bg-[#fff] w-full flex items-center justify-between ${heightHeader ? 'py-[10px]' : 'py-[20px]'}  px-[50px] shadow-md fixed z-[100] transition-all duration-300 ease-in-out `}>
      <div className='flex items-center '>
        <div className=''>
          <CustomImage src='../../../public/logo.svg' alt='Placeholder Image' width={40} height={40} className='rounded-lg mr-[30px] ' />
        </div>
        <div className=' hidden lg:block relative'>
          <ul className='flex justify-center relative'>
            <li className='relative group mr-[30px] text-[16px]'>
              <a href='#' className='hover:text-[#F97316] font-[500] transition-all duration-300 ease-in-out'>
                Nhà bán đất
              </a>

              <ul className='absolute left-0 mt-2 w-[200px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                <li className='py-[4px] px-[8px]  hover:bg-gray-100 text-[14px]'>
                  <a href='#'>Bán căn hộ chung cư</a>
                </li>
                <li className='p-[4px] px-[8px] hover:bg-gray-100 text-[14px]'>
                  <a href='#'>Bán chung cư mini, căn hộ dịch vụ</a>
                </li>
                <li className='p-[4px] px-[8px] hover:bg-gray-100 text-[14px]'>
                  <a href='#'>Bán nhà riêng</a>
                </li>
                <li className='p-[4px] px-[8px] hover:bg-gray-100 text-[14px]'>
                  <a href='#'>Bán nhà biệt thự, liền kề</a>
                </li>
                <li className='p-[4px] px-[8px] hover:bg-gray-100 text-[14px]'>
                  <a href='#'>Bán nhà mặt phố</a>
                </li>
                <li className='p-[4px] px-[8px] hover:bg-gray-100 text-[14px]'>
                  <a href='#'>Bán shophouse, nhà phố thương mại</a>
                </li>
                <li className='p-[4px] px-[8px] hover:bg-gray-100 text-[14px]'>
                  <a href='#'>Bán đất nền dự án</a>
                </li>
                <li className='p-[4px] px-[8px] hover:bg-gray-100 text-[14px]'>
                  <a href='#'>Bán đất</a>
                </li>
                <li className='p-[4px] px-[8px] hover:bg-gray-100 text-[14px]'>
                  <a href='#'>Bán trang trại, khu nghỉ dưỡng</a>
                </li>
                <li className='p-[4px] px-[8px] hover:bg-gray-100 text-[14px]'>
                  <a href='#'>Bán condotel</a>
                </li>
                <li className='p-[4px] px-[8px] hover:bg-gray-100 text-[14px]'>
                  <a href='#'>Bán kho, nhà xưởng</a>
                </li>
                <li className='p-[4px] px-[8px] hover:bg-gray-100 text-[14px]'>
                  <a href='#'>Bán loại bất động sản khác</a>
                </li>
              </ul>
            </li>

            <li className='relative mr-[30px] group text-[16px]'>
              <a href='#' className='hover:text-[#F97316] font-[500] transition-all duration-300 ease-in-out'>
                Nhà đất cho thuê
              </a>
              <ul className='absolute left-0 mt-2 w-[200px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                {
                  menuItemsSell.map((item)=>{
                    return (
                      <li key={item} className='py-[4px] px-[8px]  hover:bg-gray-100 text-[14px]'>
                      <a href='#'>{item}</a>
                    </li>
                    )
                  })
                }
              </ul>
            </li>
            <li className='relative mr-[30px] group text-[16px]'>
              <a href='#' className='hover:text-[#F97316] font-[500] transition-all duration-300 ease-in-out'>
                Dự án
              </a>
              <ul className='absolute left-0 mt-2 w-[200px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                {
                  menuItemsRent.map((item) => {
                    return (
                      <li key={item} className='py-[4px] px-[8px]  hover:bg-gray-100 text-[14px]'>
                        <a href='#'>{item}</a>
                      </li>
                    )
                  })
                }
              </ul>
            </li>
            <li className='mr-[30px] text-[16px]'>
              <a href='#' className='hover:text-[#F97316] font-[500] transition-all duration-300 ease-in-out '>
                Tin tức
              </a>
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

      <div className=' flex items-center hidden lg:flex'>
        <div className='header__save mr-[15px] '>
          <CiHeart className='text-[24px]' />
        </div>
        <div className='  hover:bg-[#FAFAFA] p-[5px] rounded-[5px] mr-[10px]  text-[17px]'>
          <a href='#'>Đăng nhập</a>
        </div>
        <div className='  text-[17px] hover:bg-[#FAFAFA] p-[5px] rounded-[5px] mr-[10px]'>
          <a href='#'>Đăng kí</a>
        </div>
        <Button variant={'outline'} className=' text-[17px] text-black hover:bg-[#FAFAFA] ml-[15px] px-[15px] py-[20px] '>
          <a href='#' className='py-[30px]'>
            Đăng tin
          </a>
        </Button>
      </div>
      <div className='lg:hidden lg:ml-[15px] flex justify-end absolute right-[50px]'>
        <Sheet>
          <SheetTrigger asChild>
            <Button className='bg-[#fff] text-black hover:bg-[#fff] border-none' >
              <FaBarsStaggered />
            </Button>
          </SheetTrigger>
          <SheetContent className='z-[99999] w-[50%] '>
            <SheetHeader>
              <SheetDescription>
              </SheetDescription>
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
