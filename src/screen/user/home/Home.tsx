import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { IoIosSearch } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { useState } from 'react';

import CustomImage from '@/components/common/images';
import { MessageSquare } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface NewsItem {
  title: string;
  time: string;
  img: string;
  description?: string;
}

interface NewsData {
  [key: string]: NewsItem[];
}

function Home() {
  const [show, setShow] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPropertyTypes, setShowPropertyTypes] = useState(false);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20]);
  const [selectedPriceOption, setSelectedPriceOption] = useState<string>("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showAreaFilter, setShowAreaFilter] = useState(false);
  const [selectedAreaOption, setSelectedAreaOption] = useState<string>("all");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [activeTab, setActiveTab] = useState('nha-dat-ban');

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

  const propertyTypesByTab = {
    'nha-dat-ban': [
      {
        id: 'nha-mat-pho',
        label: 'Nhà mặt phố',
      },
      {
        id: 'shophouse',
        label: 'Shophouse, nhà phố thương mại',
      },
      {
        id: 'dat-ban',
        label: 'Các loại đất bán',
        icon: '🏗️'
      },
      {
        id: 'dat-nen',
        label: 'Đất nền dự án',
      },
      {
        id: 'ban-dat',
        label: 'Bán đất',
      },
      {
        id: 'trang-trai',
        label: 'Trang trại, khu nghỉ dưỡng',
        icon: '🏡'
      },
      {
        id: 'condotel',
        label: 'Condotel',
      },
      {
        id: 'kho-xuong',
        label: 'Kho, nhà xưởng',
        icon: '🏭'
      },
      {
        id: 'bat-dong-san-khac',
        label: 'Bất động sản khác',
        icon: '🏢'
      }
    ],
    'nha-dat-cho-thue': [
      {
        id: 'can-ho-chung-cu',
        label: 'Căn hộ chung cư',
        icon: '🏢'
      },
      {
        id: 'nha-rieng',
        label: 'Nhà riêng',
        icon: '🏠'
      },
      {
        id: 'nha-mat-pho',
        label: 'Nhà mặt phố',
        icon: '🏪'
      },
      {
        id: 'nha-tro-phong-tro',
        label: 'Nhà trọ, phòng trọ',
        icon: '🏘️'
      },
      {
        id: 'van-phong',
        label: 'Văn phòng',
        icon: '🏢'
      },
      {
        id: 'cua-hang',
        label: 'Cửa hàng, ki ốt',
        icon: '🏪'
      },
      {
        id: 'kho-xuong',
        label: 'Kho, xưởng',
        icon: '🏭'
      },
      {
        id: 'dat',
        label: 'Đất',
        icon: '🏞️'
      },
      {
        id: 'khac',
        label: 'Khác',
        icon: '🏢'
      }
    ],
    'du-an': [
      {
        id: 'tat-ca-loai-hinh',
        label: 'Tất cả loại hình',
        icon: '🏢'
      },
      {
        id: 'can-ho-chung-cu',
        label: 'Căn hộ chung cư',
        icon: '🏢'
      },
      {
        id: 'cao-oc-van-phong',
        label: 'Cao ốc văn phòng',
        icon: '🏢'
      },
      {
        id: 'trung-tam-thuong-mai',
        label: 'Trung tâm thương mại',
        icon: '🏬'
      },
      {
        id: 'khu-do-thi-moi',
        label: 'Khu đô thị mới',
        icon: '🌆'
      },
      {
        id: 'khu-phuc-hop',
        label: 'Khu phức hợp',
        icon: '🏙️'
      },
      {
        id: 'nha-o-xa-hoi',
        label: 'Nhà ở xã hội',
        icon: '🏘️'
      },
      {
        id: 'khu-nghi-duong',
        label: 'Khu nghỉ dưỡng, Sinh thái',
        icon: '🌳'
      },
      {
        id: 'khu-cong-nghiep',
        label: 'Khu công nghiệp',
        icon: '🏭'
      }
    ]
  };

  const propertyTypes = propertyTypesByTab[activeTab as keyof typeof propertyTypesByTab];

  const priceOptions = [
    { value: "all", label: "Tất cả mức giá" },
    { value: "0-500", label: "Dưới 500 triệu" },
    { value: "500-800", label: "500 - 800 triệu" },
    { value: "800-1000", label: "800 triệu - 1 tỷ" },
    { value: "1000-2000", label: "1 - 2 tỷ" },
  ];

  const areaOptions = [
    { value: "all", label: "Tất cả diện tích" },
    { value: "0-30", label: "Dưới 30 m²" },
    { value: "30-50", label: "30 - 50 m²" },
    { value: "50-80", label: "50 - 80 m²" },
    { value: "80-100", label: "80 - 100 m²" },
  ];

  const handleSearch = () => {
    console.log('Searching with:', { selectedCity, searchQuery });
  };

  const handlePropertyTypeChange = (propertyId: string) => {
    setSelectedPropertyTypes(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
  };

  const handlePriceOptionChange = (value: string) => {
    setSelectedPriceOption(value);
    switch(value) {
      case "0-500":
        setMinPrice("");
        setMaxPrice("500");
        break;
      case "500-800":
        setMinPrice("500");
        setMaxPrice("800");
        break;
      case "800-1000":
        setMinPrice("800");
        setMaxPrice("1000");
        break;
      case "1000-2000":
        setMinPrice("1000");
        setMaxPrice("2000");
        break;
      default:
        setMinPrice("");
        setMaxPrice("");
    }
  };

  const handleAreaOptionChange = (value: string) => {
    setSelectedAreaOption(value);
    switch(value) {
      case "0-30":
        setMinArea("");
        setMaxArea("30");
        break;
      case "30-50":
        setMinArea("30");
        setMaxArea("50");
        break;
      case "50-80":
        setMinArea("50");
        setMaxArea("80");
        break;
      case "80-100":
        setMinArea("80");
        setMaxArea("100");
        break;
      default:
        setMinArea("");
        setMaxArea("");
    }
  };

  const newsByTab: NewsData = {
    'highlight': [
      {
        title: 'Đất Dịch Vụ Hà Nội Tăng Giá Đầu Năm Nhưng Giao Dịch Chậm',
        time: '6 giờ trước',
        img: '/images/news1.jpg',
        description: 'Thị trường bất động sản đầu năm ghi nhận nhiều biến động...'
      },
      {
        title: "Đừng Để 'Sụt Bẫy' Tại Điểm Nóng Đất Nền Đông Anh",
        time: '8 giờ trước',
        img: '/images/news2.jpg'
      },
      {
        title: '6 Chỉ Báo Của Chuyên Gia Về Tỷ Suất Cho Thuê Khi Đầu Tư Căn Hộ',
        time: '1 ngày trước',
        img: '/images/news3.jpg'
      },
      {
        title: 'Đất Nền Đan Phượng Nổi Sóng Đầu Năm 2025',
        time: '2 ngày trước',
        img: '/images/news4.jpg'
      },
      {
        title: 'Những Loại Đất Nền Cần Tránh Xa Khi Đầu Tư',
        time: '2 ngày trước',
        img: '/images/news5.jpg'
      },
    ],
    'news': [
      {
        title: 'Thị Trường BĐS 2024: Dự Báo và Triển Vọng',
        time: '1 giờ trước',
        img: '/images/news6.jpg',
        description: 'Các chuyên gia nhận định về triển vọng thị trường BĐS năm 2024...'
      },
      {
        title: 'Chính Sách Mới Về Vay Mua Nhà Năm 2024',
        time: '3 giờ trước',
        img: '/images/news7.jpg'
      },
      {
        title: 'Top 5 Dự Án Căn Hộ Được Quan Tâm Nhất Tháng 2/2024',
        time: '5 giờ trước',
        img: '/images/news8.jpg'
      },
      {
        title: 'Xu Hướng Đầu Tư BĐS: Căn Hộ Du Lịch Lên Ngôi',
        time: '1 ngày trước',
        img: '/images/news9.jpg'
      },
    ],
    'bds-tphcm': [
      {
        title: 'Thị Trường Căn Hộ TP.HCM: Nguồn Cung Khan Hiếm',
        time: '2 giờ trước',
        img: '/images/news10.jpg',
        description: 'Thị trường căn hộ TP.HCM đang đối mặt với tình trạng khan hiếm nguồn cung...'
      },
      {
        title: 'Quận 9 Sẽ Là Tâm Điểm BĐS Năm 2024',
        time: '4 giờ trước',
        img: '/images/news11.jpg'
      },
      {
        title: 'Giá Nhà Phố Thương Mại Tại TP.HCM Tăng Mạnh',
        time: '1 ngày trước',
        img: '/images/news12.jpg'
      },
      {
        title: 'Các Dự Án Metro Tác Động Đến BĐS TP.HCM',
        time: '2 ngày trước',
        img: '/images/news13.jpg'
      },
    ],
    'bds-hanoi': [
      {
        title: 'Thị Trường BĐS Hà Nội Khởi Sắc Đầu Năm',
        time: '1 giờ trước',
        img: '/images/news14.jpg',
        description: 'Thị trường bất động sản Hà Nội ghi nhận những tín hiệu tích cực...'
      },
      {
        title: 'Giá Đất Nền Khu Vực Hoài Đức Tăng Mạnh',
        time: '5 giờ trước',
        img: '/images/news15.jpg'
      },
      {
        title: 'Dự Án Đường Vành Đai 4 Tác Động BĐS Hà Nội',
        time: '1 ngày trước',
        img: '/images/news16.jpg'
      },
      {
        title: 'Khu Đô Thị Mới Tây Hồ Tây Thu Hút Nhà Đầu Tư',
        time: '2 ngày trước',
        img: '/images/news17.jpg'
      },
    ],
  };

  const [activeNewsTab, setActiveNewsTab] = useState<keyof NewsData>('highlight');

  return (
    <>
      {/* Banner */}
      <div className='banner bg-[url(/banner.jpg)] bg-cover bg-center h-[500px] inset-0 w-auto relative'>
        <div className='banner__content top-[20px] absolute md:left-[20%] lg:left-[30%] left-[5%] text-center w-[90%] md:w-[70%] lg:w-[55%]'>
          <div className='search w-full'>
            <div className='search__tab'>
              <ul className='flex flex-wrap justify-start text-[#fff] text-sm md:text-base'>
                <li 
                  className={cn(
                    'mr-[5px] mb-2 md:mb-0 inset-0 bg-black/60 z-[99] transition-opacity duration-300 px-[10px] py-[5px] rounded-t-[5px] cursor-pointer hover:bg-black/80',
                    activeTab === 'nha-dat-ban' && 'bg-[#EF4444]/80 hover:bg-[#EF4444]'
                  )}
                  onClick={() => setActiveTab('nha-dat-ban')}
                >
                  Nhà đất bán
                </li>
                <li 
                  className={cn(
                    'mr-[5px] mb-2 md:mb-0 inset-0 bg-black/60 z-[99] transition-opacity duration-300 px-[10px] py-[5px] rounded-t-[5px] cursor-pointer hover:bg-black/80',
                    activeTab === 'nha-dat-cho-thue' && 'bg-[#EF4444]/80 hover:bg-[#EF4444]'
                  )}
                  onClick={() => setActiveTab('nha-dat-cho-thue')}
                >
                  Nhà đất cho thuê
                </li>
                <li 
                  className={cn(
                    'mb-2 md:mb-0 inset-0 bg-black/60 z-[99] transition-opacity duration-300 px-[10px] py-[5px] rounded-t-[5px] cursor-pointer hover:bg-black/80',
                    activeTab === 'du-an' && 'bg-[#EF4444]/80 hover:bg-[#EF4444]'
                  )}
                  onClick={() => setActiveTab('du-an')}
                >
                  Dự án
                </li>
              </ul>
            </div>
            <div className='search__content bg-black/60 z-[99] transition-opacity duration-30 py-[30px] px-[15px]'>
              <div className='flex flex-col md:flex-row gap-2'>
                <div className='relative w-full md:w-auto'>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className='w-full md:w-[200px] justify-between bg-white text-gray-600 border-none h-full'
                      >
                        <div className='flex items-center gap-2'>
                          <IoLocationOutline className='w-4 h-4' />
                          <span className="truncate">{selectedCity || 'Hồ Chí Minh'}</span>
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
                                  <span className='absolute bottom-2 left-2 text-white font-medium text-sm'>{city.name}</span>
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
                <div className='flex relative w-full bg-white rounded-[5px]'>
                  <Input
                    className='block w-full p-[15px] border-none'
                    placeholder='Nhập tối đa 5 địa điểm, dự án.'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    className='absolute right-[10px] top-[8px] bg-[#EF4444] hover:bg-[#FF837A]'
                    onClick={handleSearch}
                  >
                    <span className="hidden md:inline">Tìm kiếm</span>
                    <IoIosSearch className="w-4 h-4 md:hidden" />
                  </Button>
                </div>
              </div>

              <div className='flex flex-col sm:flex-row gap-2 mt-2'>
                <Popover open={showPropertyTypes} onOpenChange={setShowPropertyTypes}>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      className='w-full sm:w-[33%] justify-between bg-white text-gray-600 border-none'
                    >
                      <span className="text-sm truncate">Loại hình dự án</span>
                      <MdKeyboardArrowDown className='h-4 w-4 flex-shrink-0' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-[90vw] sm:w-[300px] p-0' align='start'>
                    <div className='p-4'>
                      <div className='flex items-center justify-between mb-4'>
                        <h4 className='font-medium text-base'>Loại nhà đất</h4>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className='h-6 w-6'
                          onClick={() => setShowPropertyTypes(false)}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                      <div className='space-y-3'>
                        {propertyTypes.map((type) => (
                          <div key={type.id} className='flex items-center space-x-2'>
                            <Checkbox
                              id={type.id}
                              checked={selectedPropertyTypes.includes(type.id)}
                              onCheckedChange={() => handlePropertyTypeChange(type.id)}
                            />
                            <label
                              htmlFor={type.id}
                              className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                              {type.icon && <span className="mr-2">{type.icon}</span>}
                              {type.label}
                            </label>
                          </div>
                        ))}
                      </div>
                      <div className='flex gap-2 mt-4 border-t pt-4'>
                        <Button 
                          variant="outline" 
                          className='flex-1'
                          onClick={() => {
                            setSelectedPropertyTypes([]);
                            setShowPropertyTypes(false);
                          }}
                        >
                          Đặt lại
                        </Button>
                        <Button 
                          className='flex-1 bg-[#EF4444] hover:bg-[#FF837A]'
                          onClick={() => setShowPropertyTypes(false)}
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
                      className='w-full sm:w-[33%] justify-between bg-white text-gray-600 border-none'
                    >
                      <span className="text-sm truncate">Mức giá</span>
                      <MdKeyboardArrowDown className='h-4 w-4 flex-shrink-0' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-[90vw] sm:w-[300px] p-0' align='start'>
                    <div className='p-4'>
                      <div className='flex items-center justify-between mb-4'>
                        <h4 className='font-medium text-base'>Mức giá</h4>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className='h-6 w-6'
                          onClick={() => setShowPriceFilter(false)}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>

                      <div className="mb-6">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Giá thấp nhất</span>
                          <span className="text-sm font-medium">Giá cao nhất</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="text"
                            placeholder="Từ"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="flex-1"
                          />
                          <span>→</span>
                          <Input
                            type="text"
                            placeholder="Đến"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                        <div className="mt-4">
                          <Slider
                            defaultValue={[0, 2000]}
                            max={2000}
                            step={100}
                            value={[parseInt(minPrice || "0"), parseInt(maxPrice || "2000")]}
                            onValueChange={(value) => {
                              setMinPrice(value[0].toString());
                              setMaxPrice(value[1].toString());
                              setSelectedPriceOption("");
                            }}
                            className="[&_.bg-\[\#EF4444\]]:bg-[#00B4D8]"
                          />
                        </div>
                      </div>

                      <RadioGroup 
                        value={selectedPriceOption} 
                        onValueChange={handlePriceOptionChange}
                        className="space-y-2"
                      >
                        {priceOptions.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={option.value} className="text-[#00B4D8] border-[#00B4D8]" />
                            <label htmlFor={option.value} className="text-sm">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>

                      <div className='flex gap-2 mt-4 border-t pt-4'>
                        <Button 
                          variant="outline" 
                          className='flex-1'
                          onClick={() => {
                            setMinPrice("");
                            setMaxPrice("");
                            setSelectedPriceOption("all");
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

                <Popover open={showAreaFilter} onOpenChange={setShowAreaFilter}>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      className='w-full sm:w-[33%] justify-between bg-white text-gray-600 border-none'
                    >
                      <span className="text-sm truncate">Diện tích</span>
                      <MdKeyboardArrowDown className='h-4 w-4 flex-shrink-0' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-[90vw] sm:w-[300px] p-0' align='start'>
                    <div className='p-4'>
                      <div className='flex items-center justify-between mb-4'>
                        <h4 className='font-medium text-base'>Diện tích</h4>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className='h-6 w-6'
                          onClick={() => setShowAreaFilter(false)}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>

                      <div className="mb-6">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Diện tích nhỏ nhất</span>
                          <span className="text-sm font-medium">Diện tích lớn nhất</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="text"
                            placeholder="Từ"
                            value={minArea}
                            onChange={(e) => setMinArea(e.target.value)}
                            className="flex-1"
                          />
                          <span>→</span>
                          <Input
                            type="text"
                            placeholder="Đến"
                            value={maxArea}
                            onChange={(e) => setMaxArea(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                        <div className="mt-4">
                          <Slider
                            defaultValue={[0, 100]}
                            max={100}
                            step={5}
                            value={[parseInt(minArea || "0"), parseInt(maxArea || "100")]}
                            onValueChange={(value) => {
                              setMinArea(value[0].toString());
                              setMaxArea(value[1].toString());
                              setSelectedAreaOption("");
                            }}
                          />
                        </div>
                      </div>

                      <RadioGroup 
                        value={selectedAreaOption} 
                        onValueChange={handleAreaOptionChange}
                        className="space-y-2"
                      >
                        {areaOptions.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={option.value} className="text-[#00B4D8] border-[#00B4D8]" />
                            <label htmlFor={option.value} className="text-sm">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>

                      <div className='flex gap-2 mt-4 border-t pt-4'>
                        <Button 
                          variant="outline" 
                          className='flex-1'
                          onClick={() => {
                            setMinArea("");
                            setMaxArea("");
                            setSelectedAreaOption("all");
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner */}

      {/* News */}
      <div className='max-w-4xl mx-auto p-4'>
        <Tabs value={activeNewsTab} onValueChange={(value: keyof NewsData) => setActiveNewsTab(value)}>
          <div className="flex items-center justify-between">
            <TabsList className='mb-4 border-b flex flex-wrap gap-2 md:gap-4'>
              <TabsTrigger 
                value='highlight' 
                className={cn(
                  'font-semibold border-b-2 transition-colors',
                  activeNewsTab === 'highlight' ? 'border-red-500 text-red-500' : 'border-transparent'
                )}
              >
                Tin nổi bật
              </TabsTrigger>
              <TabsTrigger 
                value='news'
                className={cn(
                  'font-semibold border-b-2 transition-colors',
                  activeNewsTab === 'news' ? 'border-red-500 text-red-500' : 'border-transparent'
                )}
              >
                Tin tức
              </TabsTrigger>
              <TabsTrigger 
                value='bds-tphcm'
                className={cn(
                  'font-semibold border-b-2 transition-colors',
                  activeNewsTab === 'bds-tphcm' ? 'border-red-500 text-red-500' : 'border-transparent'
                )}
              >
                BĐS TPHCM
              </TabsTrigger>
              <TabsTrigger 
                value='bds-hanoi'
                className={cn(
                  'font-semibold border-b-2 transition-colors',
                  activeNewsTab === 'bds-hanoi' ? 'border-red-500 text-red-500' : 'border-transparent'
                )}
              >
                BĐS Hà Nội
              </TabsTrigger>
            </TabsList>
            <Button variant='link' className='text-red-500'>
              Xem thêm →
            </Button>
          </div>

          <TabsContent value={activeNewsTab} className="mt-4">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <Card className='col-span-1 md:col-span-2 border-none shadow-none'>
                <div className='relative h-48 rounded-lg overflow-hidden'>
                  <img 
                    src={newsByTab[activeNewsTab][0].img} 
                    alt={newsByTab[activeNewsTab][0].title}
                    className='w-full h-full object-cover transition-transform hover:scale-105'
                  />
                </div>
                <CardContent className='mt-2 px-0'>
                  <h3 className='text-lg font-semibold hover:text-red-500 cursor-pointer transition-colors'>
                    {newsByTab[activeNewsTab][0].title}
                  </h3>
                  <p className='text-gray-500 text-sm flex items-center mt-1'>
                    ⏳ {newsByTab[activeNewsTab][0].time}
                  </p>
                  {newsByTab[activeNewsTab][0].description && (
                    <p className='text-gray-600 mt-2 text-sm line-clamp-2'>
                      {newsByTab[activeNewsTab][0].description}
                    </p>
                  )}
                </CardContent>
              </Card>

              <div className='space-y-3'>
                {newsByTab[activeNewsTab].slice(1).map((item: NewsItem, index: number) => (
                  <div 
                    key={index} 
                    className='border-b pb-2 last:border-none hover:bg-gray-50 transition-colors rounded p-2 cursor-pointer'
                  >
                    <h4 className='text-sm font-semibold hover:text-red-500 transition-colors'>
                      {item.title}
                    </h4>
                    <p className='text-gray-500 text-xs flex items-center mt-1'>
                      ⏳ {item.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Button className='fixed bottom-4 right-4 p-3 rounded-full bg-gray-800 text-white shadow-lg'>
          <MessageSquare size={20} />
        </Button>
      </div>
      {/* News */}
    </>
  );
}

export default Home;
