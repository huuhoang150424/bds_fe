import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { PiBellRingingLight } from 'react-icons/pi';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Car } from 'lucide-react';
import { IoBedOutline } from 'react-icons/io5';
import { PiBathtubLight } from 'react-icons/pi';
import { IoLocationOutline } from 'react-icons/io5';
import { LuExpand } from 'react-icons/lu';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TbPhoneRinging } from 'react-icons/tb';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card';
import { CiHeart } from 'react-icons/ci';
import { CiSearch } from 'react-icons/ci';
import { FaAngleRight, FaChevronDown } from 'react-icons/fa';
import { CiFilter } from 'react-icons/ci';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { MdKeyboardArrowDown } from 'react-icons/md';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MultiSelect } from '@/components/user/multi-selector';
import { Cat, Dog, Fish, Rabbit, Turtle } from 'lucide-react';
import Map from '@/screen/user/sellDetails/components/Map';
import { Link } from 'react-router-dom';

const allCities = [
  'An Giang',
  'Bà Rịa Vũng Tàu',
  'Bắc Giang',
  'Bắc Kạn',
  'Bạc Liêu',
  'Bắc Ninh',
  'Bến Tre',
  'Bình Định',
  'Bình Dương',
  'Bình Phước',
  'Bình Thuận',
  'Cà Mau',
  'Cần Thơ',
  'Cao Bằng',
  'Đà Nẵng',
  'Đắk Lắk',
  'Đắk Nông',
  'Điện Biên',
  'Đồng Nai',
  'Đồng Tháp',
  'Gia Lai',
  'Hà Giang',
  'Hà Nam',
  'Hà Nội',
  'Hà Tĩnh',
  'Hải Dương',
  'Hải Phòng',
  'Hậu Giang',
  'Hòa Bình',
  'Hưng Yên',
  'Khánh Hòa',
  'Kiên Giang',
  'Kon Tum',
  'Lai Châu',
  'Lâm Đồng',
  'Lạng Sơn',
  'Lào Cai',
  'Long An',
  'Nam Định',
  'Nghệ An',
  'Ninh Bình',
  'Ninh Thuận',
  'Phú Thọ',
  'Phú Yên',
  'Quảng Bình',
  'Quảng Nam',
  'Quảng Ngãi',
  'Quảng Ninh',
  'Quảng Trị',
  'Sóc Trăng',
  'Sơn La',
  'Tây Ninh',
  'Thái Bình',
  'Thái Nguyên',
  'Thanh Hóa',
  'Thừa Thiên Huế',
  'Tiền Giang',
  'TP Hồ Chí Minh',
  'Trà Vinh',
  'Tuyên Quang',
  'Vĩnh Long',
  'Vĩnh Phúc',
  'Yên Bái',
];
const featuredCities = [
  {
    name: 'Hà Nội',
    image: '/images/hanoi.jpg',
  },
  {
    name: 'Hồ Chí Minh',
    image: '/images/hochiminh.jpg',
  },
  {
    name: 'Đà Nẵng',
    image: '/images/danang.jpg',
  },
  {
    name: 'Bình Dương',
    image: '/images/binhduong.jpg',
  },
  {
    name: 'Đồng Nai',
    image: '/images/dongnai.jpg',
  },
  {
    name: 'Khánh Hòa',
    image: '/images/khanhhoa.jpg',
  },
];
function SellDetail() {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(['nextjs', 'svelte']);
  const [selectedCity, setSelectedCity] = useState('');
  const [show, setShow] = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);
  const [searchCity, setSearchCity] = useState('');
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [showAreaFilter, setShowAreaFilter] = useState(false);
  const [selectedAreaOption, setSelectedAreaOption] = useState<string>('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedPriceOption, setSelectedPriceOption] = useState<string>('all');
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const handlePriceOptionChange = (value: string) => {
    setSelectedPriceOption(value);
    switch (value) {
      case '0-500':
        setMinPrice('');
        setMaxPrice('500');
        break;
      case '500-800':
        setMinPrice('500');
        setMaxPrice('800');
        break;
      case '800-1000':
        setMinPrice('800');
        setMaxPrice('1000');
        break;
      case '1000-2000':
        setMinPrice('1000');
        setMaxPrice('2000');
        break;
      default:
        setMinPrice('');
        setMaxPrice('');
    }
  };

  const realEstateListings = [
    {
      id: 1,
      location: 'Quận 1, TP. Hồ Chí Minh',
      images: [
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
      ],
      title: 'Nhà phố 3 tầng gần trung tâm quận 1',
      area: '120m²',
      description: 'Nhà phố thiết kế hiện đại, gần trung tâm, thuận tiện di chuyển.',
      details: {
        price: '12 tỷ',
        bedrooms: 4,
        bathrooms: 3,
        floors: 3,
        direction: 'Đông Nam',
        balconyDirection: 'Tây Bắc',
        frontage: '5m',
        alleyWidth: '8m',
        legal: 'Sổ hồng chính chủ',
        furniture: 'Full nội thất cao cấp',
      },
      googleMap: 'https://maps.google.com/?q=10.7769,106.7009',
      poster: {
        name: 'Nguyễn Văn A',
        phone: '0912345678',
        email: 'nguyenvana@example.com',
        image: 'https://th.bing.com/th/id/OIP.5z3tSnN6TDMrwyp7C_55_QHaHa?rs=1&pid=ImgDetMain',
      },
    },
    {
      id: 2,
      location: 'Quận 7, TP. Hồ Chí Minh',
      images: [
        'https://th.bing.com/th?id=OIP.cz2Q-TonAb--ymkDBmOwygHaFG&w=301&h=207&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
        'https://th.bing.com/th?id=OIP.cz2Q-TonAb--ymkDBmOwygHaFG&w=301&h=207&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
        'https://th.bing.com/th?id=OIP.cz2Q-TonAb--ymkDBmOwygHaFG&w=301&h=207&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
        'https://th.bing.com/th?id=OIP.cz2Q-TonAb--ymkDBmOwygHaFG&w=301&h=207&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
        'https://th.bing.com/th?id=OIP.cz2Q-TonAb--ymkDBmOwygHaFG&w=301&h=207&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
        'https://th.bing.com/th?id=OIP.cz2Q-TonAb--ymkDBmOwygHaFG&w=301&h=207&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
      ],
      title: 'Căn hộ cao cấp Quận 7, view sông',
      area: '80m²',
      description: 'Căn hộ 2PN, nội thất đầy đủ, tiện ích 5 sao.',
      details: {
        price: '4.5 tỷ',
        bedrooms: 2,
        bathrooms: 2,
        floors: 20,
        direction: 'Tây Nam',
        balconyDirection: 'Đông Bắc',
        frontage: 'Không áp dụng',
        alleyWidth: 'Không áp dụng',
        legal: 'Sổ hồng',
        furniture: 'Full nội thất',
      },
      googleMap: 'https://maps.google.com/?q=10.7320,106.7218',
      poster: {
        name: 'Trần Thị B',
        phone: '0987654321',
        email: 'tranthib@example.com',
        image: 'https://th.bing.com/th/id/OIP.5z3tSnN6TDMrwyp7C_55_QHaHa?rs=1&pid=ImgDetMain',
      },
    },
    {
      id: 3,
      location: 'Quận 2, TP. Hồ Chí Minh',
      images: [
        'https://example.com/image11.jpg',
        'https://example.com/image12.jpg',
        'https://example.com/image13.jpg',
        'https://example.com/image14.jpg',
        'https://example.com/image15.jpg',
      ],
      title: 'Biệt thự sân vườn Quận 2, khu an ninh',
      area: '250m²',
      description: 'Biệt thự rộng rãi, sân vườn thoáng mát, có hồ bơi riêng.',
      details: {
        price: '35 tỷ',
        bedrooms: 5,
        bathrooms: 6,
        floors: 2,
        direction: 'Nam',
        balconyDirection: 'Đông',
        frontage: '10m',
        alleyWidth: '10m',
        legal: 'Sổ đỏ chính chủ',
        furniture: 'Nội thất cao cấp',
      },
      googleMap: 'https://maps.google.com/?q=10.7891,106.7401',
      poster: {
        name: 'Lê Minh C',
        phone: '0975123456',
        email: 'leminhc@example.com',
        image: 'https://th.bing.com/th/id/OIP.5z3tSnN6TDMrwyp7C_55_QHaHa?rs=1&pid=ImgDetMain',
      },
    },
    {
      id: 4,
      location: 'Quận 5, TP. Hồ Chí Minh',
      images: [
        'https://example.com/image16.jpg',
        'https://example.com/image17.jpg',
        'https://example.com/image18.jpg',
        'https://example.com/image19.jpg',
        'https://example.com/image20.jpg',
      ],
      title: 'Nhà mặt tiền Quận 5, tiện kinh doanh',
      area: '100m²',
      description: 'Nhà mặt tiền đường lớn, tiện mở cửa hàng, văn phòng.',
      details: {
        price: '20 tỷ',
        bedrooms: 3,
        bathrooms: 3,
        floors: 4,
        direction: 'Bắc',
        balconyDirection: 'Nam',
        frontage: '6m',
        alleyWidth: 'Không áp dụng',
        legal: 'Sổ hồng',
        furniture: 'Không nội thất',
      },
      googleMap: 'https://maps.google.com/?q=10.7591,106.6705',
      poster: {
        name: 'Đặng Hoàng D',
        phone: '0902345678',
        email: 'danghoangd@example.com',
        image: 'https://th.bing.com/th/id/OIP.5z3tSnN6TDMrwyp7C_55_QHaHa?rs=1&pid=ImgDetMain',
      },
    },
    {
      id: 5,
      location: 'Quận 10, TP. Hồ Chí Minh',
      images: [
        'https://example.com/image21.jpg',
        'https://example.com/image22.jpg',
        'https://example.com/image23.jpg',
        'https://example.com/image24.jpg',
        'https://example.com/image25.jpg',
      ],
      title: 'Căn hộ chung cư trung tâm Quận 10',
      area: '70m²',
      description: 'Căn hộ tầng cao, thoáng mát, đầy đủ tiện ích.',
      details: {
        price: '3.2 tỷ',
        bedrooms: 2,
        bathrooms: 2,
        floors: 15,
        direction: 'Đông Bắc',
        balconyDirection: 'Tây Nam',
        frontage: 'Không áp dụng',
        alleyWidth: 'Không áp dụng',
        legal: 'Sổ hồng',
        furniture: 'Nội thất cơ bản',
      },
      googleMap: 'https://maps.google.com/?q=10.7765,106.6823',
      poster: {
        name: 'Phạm Thu E',
        phone: '0913456789',
        email: 'phamthue@example.com',
        image: 'https://th.bing.com/th/id/OIP.5z3tSnN6TDMrwyp7C_55_QHaHa?rs=1&pid=ImgDetMain',
      },
    },
    {
      id: 6,
      location: 'Quận 9, TP. Hồ Chí Minh',
      images: [
        'https://example.com/image26.jpg',
        'https://example.com/image27.jpg',
        'https://example.com/image28.jpg',
        'https://example.com/image29.jpg',
        'https://example.com/image30.jpg',
      ],
      title: 'Biệt thự liền kề Quận 9, khu VIP',
      area: '200m²',
      description: 'Biệt thự cao cấp, khu dân cư an ninh, gần trung tâm.',
      details: {
        price: '25 tỷ',
        bedrooms: 4,
        bathrooms: 5,
        floors: 3,
        direction: 'Tây',
        balconyDirection: 'Đông',
        frontage: '8m',
        alleyWidth: 'Không áp dụng',
        legal: 'Sổ hồng',
        furniture: 'Full nội thất nhập khẩu',
      },
      googleMap: 'https://maps.google.com/?q=10.8305,106.7812',
      poster: {
        name: 'Ngô Thanh F',
        phone: '0935678901',
        email: 'ngothanhf@example.com',
        image: 'https://th.bing.com/th/id/OIP.5z3tSnN6TDMrwyp7C_55_QHaHa?rs=1&pid=ImgDetMain',
      },
    },
  ];
  const getPostCountByCity = () => {
    const cityCounts: { [key: string]: number } = {};

    realEstateListings.forEach((property) => {
      const city = property.location.split(', ')[1]; // Lấy tên thành phố sau dấu phẩy
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });

    return cityCounts;
  };

  const getSumByCity = () => {
    let sum = 0;
    cityInfos.forEach((cityInfors) => {
      sum += cityInfors.count;
    });
    return sum;
  };

  interface CityInfo {
    name: string;
    count: number;
    image: string;
  }

  const cityInfos: CityInfo[] = [
    {
      name: 'TP. Hồ Chí Minh',
      count: 63542,
      image: 'https://file4.batdongsan.com.vn/images/newhome/cities/HCM-web-1.jpg',
    },
    {
      name: 'Hà Nội',
      count: 10000, // Lấy số lượng thực tế từ dữ liệu
      image: 'https://file4.batdongsan.com.vn/images/newhome/cities/HN-web-1.jpg',
    },
    {
      name: 'Đà Nẵng',
      count: 9813,
      image: 'https://file4.batdongsan.com.vn/images/newhome/cities/DN-web-1.jpg',
    },
    {
      name: 'Bình Dương',
      count: 8071,
      image: 'https://file4.batdongsan.com.vn/images/newhome/cities/BD-web-1.jpg',
    },
    {
      name: 'Đồng Nai',
      count: 4322,
      image: 'https://file4.batdongsan.com.vn/images/newhome/cities/DN2-web-1.jpg',
    },
  ];

  const allCities = [
    'An Giang',
    'Bà Rịa Vũng Tàu',
    'Bắc Giang',
    'Bắc Kạn',
    'Bạc Liêu',
    'Bắc Ninh',
    'Bến Tre',
    'Bình Định',
    'Bình Dương',
    'Bình Phước',
    'Bình Thuận',
    'Cà Mau',
    'Cần Thơ',
    'Cao Bằng',
    'Đà Nẵng',
    'Đắk Lắk',
    'Đắk Nông',
    'Điện Biên',
    'Đồng Nai',
    'Đồng Tháp',
    'Gia Lai',
    'Hà Giang',
    'Hà Nam',
    'Hà Nội',
    'Hà Tĩnh',
    'Hải Dương',
    'Hải Phòng',
    'Hậu Giang',
    'Hòa Bình',
    'Hưng Yên',
    'Khánh Hòa',
    'Kiên Giang',
    'Kon Tum',
    'Lai Châu',
    'Lâm Đồng',
    'Lạng Sơn',
    'Lào Cai',
    'Long An',
    'Nam Định',
    'Nghệ An',
    'Ninh Bình',
    'Ninh Thuận',
    'Phú Thọ',
    'Phú Yên',
    'Quảng Bình',
    'Quảng Nam',
    'Quảng Ngãi',
    'Quảng Ninh',
    'Quảng Trị',
    'Sóc Trăng',
    'Sơn La',
    'Tây Ninh',
    'Thái Bình',
    'Thái Nguyên',
    'Thanh Hóa',
    'Thừa Thiên Huế',
    'Tiền Giang',
    'TP Hồ Chí Minh',
    'Trà Vinh',
    'Tuyên Quang',
    'Vĩnh Long',
    'Vĩnh Phúc',
    'Yên Bái',
  ];

  const filteredCities = allCities.filter((city) => city.toLowerCase().includes(searchCity.toLowerCase()));
  const areaOptions = [
    { value: 'all', label: 'Tất cả diện tích' },
    { value: '0-30', label: 'Dưới 30 m²' },
    { value: '30-50', label: '30 - 50 m²' },
    { value: '50-80', label: '50 - 80 m²' },
    { value: '80-100', label: '80 - 100 m²' },
  ];

  const priceOptions = [
    { value: 'all', label: 'Tất cả mức giá' },
    { value: '0-500', label: 'Dưới 500 triệu' },
    { value: '500-800', label: '500 - 800 triệu' },
    { value: '800-1000', label: '800 triệu - 1 tỷ' },
    { value: '1000-2000', label: '1 - 2 tỷ' },
  ];
  const handleAreaOptionChange = (value: string) => {
    setSelectedAreaOption(value);
    switch (value) {
      case '0-30':
        setMinArea('');
        setMaxArea('30');
        break;
      case '30-50':
        setMinArea('30');
        setMaxArea('50');
        break;
      case '50-80':
        setMinArea('50');
        setMaxArea('80');
        break;
      case '80-100':
        setMinArea('80');
        setMaxArea('100');
        break;
      default:
        setMinArea('');
        setMaxArea('');
    }
  };

  return (
    <div className='pt-[80px]'>
      <div className={cn('flex w-full', showMap ? 'h-[calc(100vh-80px)]' : '')}>
        <div className={cn('flex flex-col transition-all duration-300', showMap ? 'w-1/2' : 'w-full')}>
          <div className={cn('', showMap ? 'w-full' : 'max-w-7xl mx-auto w-full')}>
            <div className='search bg-white rounded-lg w-full'>
              <div className='px-4 py-6'>
                <div className='flex flex-col md:flex-row md:items-center mb-[20px] gap-4'>
                  <div className='flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-[#F2F2F2] p-[10px] rounded-[5px]'>
                    <div className='relative flex-1'>
                      <input
                        type='text'
                        placeholder='Đường Nguyễn Thị Minh Khai'
                        className='w-full h-[52px] px-4 pl-10 border-none bg-[#F2F2F2] focus:outline-none focus:border-[#E03C31] text-gray-700'
                      />
                      <CiSearch className='h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                    </div>

                    <div className='relative min-w-[200px] flex items-center bg-[#F2F2F2]'>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant='outline'
                            className='w-full h-[52px] justify-between bg-[#F2F2F2] text-gray-600 border-none'
                          >
                            <div className='flex items-center gap-2'>
                              <IoLocationOutline className='w-4 h-4' />
                              <span className='truncate'>{selectedCity || 'Hồ Chí Minh'}</span>
                            </div>
                            <MdKeyboardArrowDown className='h-4 w-4 flex-shrink-0' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-[90vw] md:w-[746px] p-0' align='start'>
                          <div className='grid'>
                            <div className='p-4'>
                              <h4 className='font-medium mb-2 text-sm text-gray-500'>Top tỉnh thành nổi bật</h4>
                              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2'>
                                {featuredCities.map((city) => (
                                  <div
                                    key={city.name}
                                    className='relative h-[70px] rounded-lg overflow-hidden cursor-pointer group'
                                    onClick={() => {
                                      setSelectedCity(city.name);
                                      setShow(false);
                                    }}
                                  >
                                    <img src={city.image} alt={city.name} className='w-full h-full object-cover' />
                                    <div className='absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all'>
                                      <span className='absolute bottom-2 left-2 text-white font-medium text-sm'>
                                        {city.name}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className='border-t'>
                              <div className='p-4'>
                                <h4 className='font-medium mb-1 text-sm text-gray-500'>Tất cả tỉnh thành</h4>
                                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6'>
                                  {allCities.map((city) => (
                                    <div
                                      key={city}
                                      className='py-[3px] px-3 hover:bg-gray-100 cursor-pointer rounded text-[13px] text-black'
                                      onClick={() => {
                                        setSelectedCity(city);
                                        setShow(false);
                                      }}
                                    >
                                      {city}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <button className='w-full sm:w-auto h-[52px] bg-[#E03C31] px-[8px] text-white rounded-lg hover:bg-[#d02e23] transition-colors font-medium text-[14px]'>
                      Tìm kiếm
                    </button>
                  </div>

                  <div className='w-full md:w-[15%] h-[52px]'>
                    <Button 
                      className={cn(
                        'w-full h-full flex items-center justify-center gap-2 rounded-lg font-medium transition-all',
                        showMap 
                          ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
                          : 'bg-[#009BA1] hover:bg-[#1DBABF] text-white'
                      )}
                      onClick={() => setShowMap(!showMap)}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                        <line x1="8" y1="2" x2="8" y2="18" />
                        <line x1="16" y1="6" x2="16" y2="22" />
                      </svg>
                      <span className='hidden sm:inline'>{showMap ? 'Ẩn bản đồ' : 'Xem bản đồ'}</span>
                    </Button>
                  </div>
                </div>

                <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full sm:w-[80%]'>
                  <div className='filter__area flex-1 sm:flex-initial'>
                    <Select>
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Toàn quốc' />
                      </SelectTrigger>
                      <SelectContent className='flex-col gap-1 p-[15px]'>
                        <Select>
                          <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='Chọn theo thành phố/tỉnh thành' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Fruits</SelectLabel>
                              <SelectItem value='apple'>Apple</SelectItem>
                              <SelectItem value='banana'>Banana</SelectItem>
                              <SelectItem value='blueberry'>Blueberry</SelectItem>
                              <SelectItem value='grapes'>Grapes</SelectItem>
                              <SelectItem value='pineapple'>Pineapple</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <div className='py-[5px]'></div>
                        <Select>
                          <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='Chọn theo thành phố/tỉnh thành' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Fruits</SelectLabel>
                              <SelectItem value='apple'>Apple</SelectItem>
                              <SelectItem value='banana'>Banana</SelectItem>
                              <SelectItem value='blueberry'>Blueberry</SelectItem>
                              <SelectItem value='grapes'>Grapes</SelectItem>
                              <SelectItem value='pineapple'>Pineapple</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <div className='py-[5px]'></div>
                        <Select>
                          <SelectTrigger className='w-[180px] '>
                            <SelectValue placeholder='Chọn theo thành phố/tỉnh thành' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Fruits</SelectLabel>
                              <SelectItem value='apple'>Apple</SelectItem>
                              <SelectItem value='banana'>Banana</SelectItem>
                              <SelectItem value='blueberry'>Blueberry</SelectItem>
                              <SelectItem value='grapes'>Grapes</SelectItem>
                              <SelectItem value='pineapple'>Pineapple</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <div className='py-[5px]'></div>
                        <Select>
                          <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='Chọn theo thành phố/tỉnh thành' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Fruits</SelectLabel>
                              <SelectItem value='apple'>Apple</SelectItem>
                              <SelectItem value='banana'>Banana</SelectItem>
                              <SelectItem value='blueberry'>Blueberry</SelectItem>
                              <SelectItem value='grapes'>Grapes</SelectItem>
                              <SelectItem value='pineapple'>Pineapple</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <div className='flex items-center gap-1 mt-4'>
                          <Button className='w-[30%] bg-[#fff] text-black hover:bg-[#fff]'>Đặt lại</Button>
                          <Button className='w-[70%] bg-[#E03C31]'>Áp dụng</Button>
                        </div>
                      </SelectContent>
                    </Select>
                  </div>
                  <Popover open={showAreaFilter} onOpenChange={setShowAreaFilter}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className='w-full sm:w-[33%] justify-between bg-white text-gray-600 border'
                      >
                        <span className='text-sm truncate'>Diện tích</span>
                        <MdKeyboardArrowDown className='h-4 w-4 flex-shrink-0' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[90vw] sm:w-[300px] p-0' align='start'>
                      <div className='p-4'>
                        <div className='flex items-center justify-between mb-4'>
                          <h4 className='font-medium text-base'>Diện tích</h4>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-6 w-6'
                            onClick={() => setShowAreaFilter(false)}
                          >
                            <X className='h-4 w-4' />
                          </Button>
                        </div>

                        <div className='mb-6'>
                          <div className='flex justify-between mb-2'>
                            <span className='text-sm font-medium'>Diện tích nhỏ nhất</span>
                            <span className='text-sm font-medium'>Diện tích lớn nhất</span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Input
                              type='text'
                              placeholder='Từ'
                              value={minArea}
                              onChange={(e) => setMinArea(e.target.value)}
                              className='flex-1'
                            />
                            <span>→</span>
                            <Input
                              type='text'
                              placeholder='Đến'
                              value={maxArea}
                              onChange={(e) => setMaxArea(e.target.value)}
                              className='flex-1'
                            />
                          </div>
                          <div className='mt-4'>
                            <Slider
                              defaultValue={[0, 100]}
                              max={100}
                              step={5}
                              value={[parseInt(minArea || '0'), parseInt(maxArea || '100')]}
                              onValueChange={(value) => {
                                setMinArea(value[0].toString());
                                setMaxArea(value[1].toString());
                                setSelectedAreaOption('');
                              }}
                            />
                          </div>
                        </div>

                        <RadioGroup
                          value={selectedAreaOption}
                          onValueChange={handleAreaOptionChange}
                          className='space-y-2'
                        >
                          {areaOptions.map((option) => (
                            <div key={option.value} className='flex items-center space-x-2'>
                              <RadioGroupItem
                                value={option.value}
                                id={option.value}
                                className='text-[#00B4D8] border-[#00B4D8]'
                              />
                              <label htmlFor={option.value} className='text-sm'>
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </RadioGroup>

                        <div className='flex gap-2 mt-4 border-t pt-4'>
                          <Button
                            variant='outline'
                            className='flex-1'
                            onClick={() => {
                              setMinArea('');
                              setMaxArea('');
                              setSelectedAreaOption('all');
                            }}
                          >
                            Đặt lại
                          </Button>
                          <Button
                            className='flex-1 bg-[#EF4444] hover:bg-[#FF837A]'
                            onClick={() => setShowAreaFilter(false)}
                          >
                            Áp dụng
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Popover open={showPriceFilter} onOpenChange={setShowPriceFilter}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className='w-full sm:w-[33%] justify-between bg-white text-gray-600 border'
                      >
                        <span className='text-sm truncate'>Mức giá</span>
                        <MdKeyboardArrowDown className='h-4 w-4 flex-shrink-0' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[90vw] sm:w-[300px] p-0' align='start'>
                      <div className='p-4'>
                        <div className='flex items-center justify-between mb-4'>
                          <h4 className='font-medium text-base'>Mức giá</h4>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-6 w-6'
                            onClick={() => setShowPriceFilter(false)}
                          >
                            <X className='h-4 w-4' />
                          </Button>
                        </div>

                        <div className='mb-6'>
                          <div className='flex justify-between mb-2'>
                            <span className='text-sm font-medium'>Giá thấp nhất</span>
                            <span className='text-sm font-medium'>Giá cao nhất</span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Input
                              type='text'
                              placeholder='Từ'
                              value={minPrice}
                              onChange={(e) => setMinPrice(e.target.value)}
                              className='flex-1'
                            />
                            <span>→</span>
                            <Input
                              type='text'
                              placeholder='Đến'
                              value={maxPrice}
                              onChange={(e) => setMaxPrice(e.target.value)}
                              className='flex-1'
                            />
                          </div>
                          <div className='mt-4'>
                            <Slider
                              defaultValue={[0, 2000]}
                              max={2000}
                              step={100}
                              value={[parseInt(minPrice || '0'), parseInt(maxPrice || '2000')]}
                              onValueChange={(value) => {
                                setMinPrice(value[0].toString());
                                setMaxPrice(value[1].toString());
                                setSelectedPriceOption('');
                              }}
                              className='[&_.bg-\[\#EF4444\]]:bg-[#00B4D8]'
                            />
                          </div>
                        </div>

                        <RadioGroup
                          value={selectedPriceOption}
                          onValueChange={handlePriceOptionChange}
                          className='space-y-2'
                        >
                          {priceOptions.map((option) => (
                            <div key={option.value} className='flex items-center space-x-2'>
                              <RadioGroupItem
                                value={option.value}
                                id={option.value}
                                className='text-[#00B4D8] border-[#00B4D8]'
                              />
                              <label htmlFor={option.value} className='text-sm'>
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </RadioGroup>

                        <div className='flex gap-2 mt-4 border-t pt-4'>
                          <Button
                            variant='outline'
                            className='flex-1'
                            onClick={() => {
                              setMinPrice('');
                              setMaxPrice('');
                              setSelectedPriceOption('all');
                            }}
                          >
                            Đặt lại
                          </Button>
                          <Button
                            className='flex-1 bg-[#EF4444] hover:bg-[#FF837A]'
                            onClick={() => setShowPriceFilter(false)}
                          >
                            Áp dụng
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
          <div className={cn(
            'flex flex-col lg:flex-row flex-1 overflow-hidden',
            showMap ? 'w-full' : 'max-w-7xl mx-auto w-full'
          )}>
            <div className='post w-full lg:w-[75%] p-[15px] overflow-y-auto'>
              <div className='post__title mb-[30px]'>
                <h2 className='text-[22px] font-[650] mb-[10px]'>Mua bán bất động sản trên toàn quốc</h2>
                <p className='font-[400] text-[14px] text-sm'>Hiện có {getSumByCity()} bất động sản trên toàn quốc</p>
              </div>
              <div className='post__detail flex flex-col gap-6'>
                {realEstateListings.map((realEstateListing) => (
                  <Link to={"/post/:id"}>
                    <Card
                    key={realEstateListing.id}
                    className='overflow-hidden hover:shadow-lg transition-shadow border rounded-[5px] shadow-sm'
                  >
                    <CardContent className='p-6'>
                      <div className='grid grid-cols-5 grid-rows-2 gap-2 h-[250px]'>
                        <div className='col-span-3 row-span-2  relative rounded-l-lg overflow-hidden'>
                          <img
                            src={realEstateListing.images[0]}
                            alt={realEstateListing.title}
                            className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                          />
                        </div>

                        <div className='col-span-2 col-start-4 relative overflow-hidden'>
                          <img
                            src={realEstateListing.images[1]}
                            alt={realEstateListing.title}
                            className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                          />
                        </div>

                        <div className='col-start-4 row-start-2 relative overflow-hidden'>
                          <img
                            src={realEstateListing.images[2]}
                            alt={realEstateListing.title}
                            className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                          />
                        </div>

                        <div className='col-start-5 row-start-2 relative overflow-hidden rounded-br-lg'>
                          <img
                            src={realEstateListing.images[3]}
                            alt={realEstateListing.title}
                            className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                          />
                          {realEstateListing.images.length > 4 && (
                            <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                              <span className='text-white text-lg font-medium'>
                                +{realEstateListing.images.length - 4}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className='mt-4 space-y-2'>
                        <h3 className='text-xl font-semibold hover:text-[#E03C31] cursor-pointer transition-colors'>
                          {realEstateListing.title}
                        </h3>
                        <div className='flex items-center gap-2 text-gray-600'>
                          <IoLocationOutline className='h-5 w-5' />
                          <span>{realEstateListing.location}</span>
                        </div>
                        <div className='flex items-center justify-start gap-4'>
                          <div className='flex items-center gap-4'>
                            <span className='text-[#E03C31] font-semibold text-lg'>
                              {realEstateListing.details.price}
                            </span>
                            <span className='flex items-center gap-1 text-gray-600'>
                              <LuExpand />
                              {realEstateListing.area}
                            </span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <span className='flex items-center gap-1 text-gray-600'>
                              <IoBedOutline className='h-5 w-5' />
                              {realEstateListing.details.bedrooms}
                            </span>
                            <span className='flex items-center gap-1 text-gray-600'>
                              <PiBathtubLight className='h-5 w-5' />
                              {realEstateListing.details.bathrooms}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className='infor mt-[15px] flex items-center gap-2 justify-between'>
                        <div className='flex items-center gap-2'>
                          <div className='image__poster '>
                            <Avatar>
                              <AvatarImage
                                src='https://th.bing.com/th?id=OIP.5z3tSnN6TDMrwyp7C_55_QHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
                                alt='@shadcn'
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className='poster__detail'>
                            <p className='text-[10px] font-[600]'>{realEstateListing.poster.name}</p>
                          </div>
                        </div>
                        <div className='flex items-center gap-4'>
                          <button className='flex items-center gap-2 bg-[#E03C31] text-white px-4 py-2 rounded-lg hover:bg-[#d02e23] transition-colors'>
                            <TbPhoneRinging className='text-xl' />
                            <span>{realEstateListing.poster.phone}</span>
                          </button>

                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <button className='p-2 border border-gray-200 rounded-lg hover:border-[#E03C31] hover:text-[#E03C31] transition-colors'>
                                <CiHeart className='text-xl' />
                              </button>
                            </HoverCardTrigger>
                            <HoverCardContent className='w-fit p-3 bg-white rounded-lg shadow-lg border border-gray-200'>
                              <div className='text-sm text-gray-600'>Bấm để lưu tin</div>
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  </Link>
                ))}
              </div>
            </div>
            <div className='fill w-full lg:w-[25%] p-[15px] overflow-y-auto'>
              <div className='bg-white rounded-lg shadow-sm p-4 border border-gray-200'>
                <h3 className='text-lg font-semibold mb-[10px]'>Lọc theo diện tích</h3>

                <div className='space-y-2'>
                  {[
                    { label: 'Dưới 30 m²', value: '0-30' },
                    { label: '30 - 50 m²', value: '30-50' },
                    { label: '50 - 80 m²', value: '50-80' },
                    { label: '80 - 100 m²', value: '80-100' },
                    { label: '100 - 150 m²', value: '100-150' },
                    { label: '150 - 200 m²', value: '150-200' },
                    { label: '200 - 250 m²', value: '200-250' },
                    { label: '250 - 300 m²', value: '250-300' },
                    { label: '300 - 500 m²', value: '300-500' },
                    { label: 'Trên 500 m²', value: '500-999999' },
                  ].map((item) => (
                    <div className='flex flex-col group cursor-pointer' key={item.value}>
                      <span className='text-gray-700 group-hover:text-[#E03C31] transition-colors'>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='bg-white rounded-lg shadow-sm p-4 mt-4 border border-gray-200'>
                <h3 className='text-lg font-semibold mb-[10px]'>Lọc theo khoảng giá</h3>

                <div className='space-y-2 '>
                  {[
                    { label: 'Thỏa thuận', value: 'negotiable' },
                    { label: 'Dưới 500 triệu', value: '0-500000000' },
                    { label: '500 - 800 triệu', value: '500000000-800000000' },
                    { label: '800 triệu - 1 tỷ', value: '800000000-1000000000' },
                    { label: '1 - 2 tỷ', value: '1000000000-2000000000' },
                    { label: '2 - 3 tỷ', value: '2000000000-3000000000' },
                    { label: '3 - 5 tỷ', value: '3000000000-5000000000' },
                    { label: '5 - 7 tỷ', value: '5000000000-7000000000' },
                    { label: '7 - 10 tỷ', value: '7000000000-10000000000' },
                    { label: '10 - 20 tỷ', value: '10000000000-20000000000' },
                    { label: '20 - 30 tỷ', value: '20000000000-30000000000' },
                    { label: '30 - 40 tỷ', value: '30000000000-40000000000' },
                    { label: '40 - 60 tỷ', value: '40000000000-60000000000' },
                    { label: 'Trên 60 tỷ', value: '60000000000-999999999999' },
                  ].map((item) => (
                    <div
                      key={item.value}
                      className='flex items-center justify-between  hover:bg-gray-50 rounded-md cursor-pointer group'
                    >
                      <span className='text-gray-700 text-sm group-hover:text-[#E03C31] transition-colors'>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='bg-white rounded-lg shadow-sm p-4 mt-4 border border-gray-200'>
                <h3 className='text-lg font-semibold mb-[10px]'>Mua bán nhà đất</h3>

                <div className='mb-4'>
                  <div className='relative'>
                    <input
                      type='text'
                      placeholder='Tìm kiếm tỉnh thành...'
                      className='w-full px-3 py-2 pl-9 border border-gray-300 rounded-md focus:outline-none focus:border-[#E03C31] text-sm'
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                    />
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                      />
                    </svg>
                  </div>
                </div>

                <div className='space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar '>
                  {(searchCity ? filteredCities : showAllCities ? allCities : allCities.slice(0, 10)).map((city) => (
                    <div
                      key={city}
                      className='flex items-center justify-between py-1.5  hover:bg-gray-50 rounded-md cursor-pointer group'
                    >
                      <span className='text-gray-700 text-sm group-hover:text-[#E03C31] transition-colors'>{city}</span>
                    </div>
                  ))}

                  {!searchCity && !showAllCities && (
                    <div className='pt-2'>
                      <button
                        className='text-[#E03C31] text-sm hover:underline flex items-center gap-1'
                        onClick={() => setShowAllCities(true)}
                      >
                        Xem thêm
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                        </svg>
                      </button>
                    </div>
                  )}

                  {!searchCity && showAllCities && (
                    <div className='pt-2'>
                      <button
                        className='text-[#E03C31] text-sm hover:underline flex items-center gap-1'
                        onClick={() => setShowAllCities(false)}
                      >
                        Thu gọn
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4 transform rotate-180'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className='bg-white rounded-lg shadow-sm p-4 mt-4 border border-gray-200'>
                <h3 className='text-lg font-semibold mb-[10px]'>Bài viết được quan tâm</h3>

                <div className='space-y-3'>
                  {[
                    {
                      id: 1,
                      title: 'Trọn Bộ Lãi Suất Vay Mua Nhà Mới Nhất Tháng 2/2025',
                    },
                    {
                      id: 2,
                      title: 'Toàn Cảnh Thị Trường Bất Động Sản Tháng 12/2024',
                    },
                    {
                      id: 3,
                      title: 'Bình Chánh Tỏa Sáng Trên Bản Đồ Phát Triển Đô Thị',
                    },
                    {
                      id: 4,
                      title: 'Thị Trường Chung Cư Hà Nội Vắng Bóng Nhà Đầu Tư',
                    },
                    {
                      id: 5,
                      title: 'Bình Dương Đối Đầu Nguồn Cung Dự Án Mới Trong Quý 1/2025',
                    },
                  ].map((article, index) => (
                    <div key={article.id} className='flex items-center group cursor-pointer border-b pb-2'>
                      <h4 className='text-sm text-gray-700 group-hover:text-[#E03C31] transition-colors line-clamp-2'>
                        {article.title}
                      </h4>
                    </div>
                  ))}
                </div>

                <div className='mt-4 text-center'>
                  <button
                    className='text-[#E03C31] text-sm hover:underline inline-flex items-center gap-1'
                    onClick={() => {
                      console.log('Chuyển đến trang tin tức');
                    }}
                  >
                    Xem tất cả tin tức
                    <FaAngleRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showMap && (
          <div className='w-full md:w-1/2 bg-white h-[calc(100vh-80px)]'>
            <Map />
          </div>
        )}
      </div>
    </div>
  );
}

export default SellDetail;
