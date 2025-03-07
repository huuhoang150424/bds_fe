import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { IoIosSearch } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { useState } from 'react';

import CustomImage from '@/components/common/images';
import { MessageSquare } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { CiHeart } from 'react-icons/ci';
import { AiOutlinePicture } from 'react-icons/ai';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

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
  const [selectedPriceOption, setSelectedPriceOption] = useState<string>('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showAreaFilter, setShowAreaFilter] = useState(false);
  const [selectedAreaOption, setSelectedAreaOption] = useState<string>('all');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [activeTab, setActiveTab] = useState('nha-dat-ban');
  const [visibleProperties, setVisibleProperties] = useState<number>(8);

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
        icon: '🏗️',
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
        icon: '🏡',
      },
      {
        id: 'condotel',
        label: 'Condotel',
      },
      {
        id: 'kho-xuong',
        label: 'Kho, nhà xưởng',
        icon: '🏭',
      },
      {
        id: 'bat-dong-san-khac',
        label: 'Bất động sản khác',
        icon: '🏢',
      },
    ],
    'nha-dat-cho-thue': [
      {
        id: 'can-ho-chung-cu',
        label: 'Căn hộ chung cư',
        icon: '🏢',
      },
      {
        id: 'nha-rieng',
        label: 'Nhà riêng',
        icon: '🏠',
      },
      {
        id: 'nha-mat-pho',
        label: 'Nhà mặt phố',
        icon: '🏪',
      },
      {
        id: 'nha-tro-phong-tro',
        label: 'Nhà trọ, phòng trọ',
        icon: '🏘️',
      },
      {
        id: 'van-phong',
        label: 'Văn phòng',
        icon: '🏢',
      },
      {
        id: 'cua-hang',
        label: 'Cửa hàng, ki ốt',
        icon: '🏪',
      },
      {
        id: 'kho-xuong',
        label: 'Kho, xưởng',
        icon: '🏭',
      },
      {
        id: 'dat',
        label: 'Đất',
        icon: '🏞️',
      },
      {
        id: 'khac',
        label: 'Khác',
        icon: '🏢',
      },
    ],
    'du-an': [
      {
        id: 'tat-ca-loai-hinh',
        label: 'Tất cả loại hình',
        icon: '🏢',
      },
      {
        id: 'can-ho-chung-cu',
        label: 'Căn hộ chung cư',
        icon: '🏢',
      },
      {
        id: 'cao-oc-van-phong',
        label: 'Cao ốc văn phòng',
        icon: '🏢',
      },
      {
        id: 'trung-tam-thuong-mai',
        label: 'Trung tâm thương mại',
        icon: '🏬',
      },
      {
        id: 'khu-do-thi-moi',
        label: 'Khu đô thị mới',
        icon: '🌆',
      },
      {
        id: 'khu-phuc-hop',
        label: 'Khu phức hợp',
        icon: '🏙️',
      },
      {
        id: 'nha-o-xa-hoi',
        label: 'Nhà ở xã hội',
        icon: '🏘️',
      },
      {
        id: 'khu-nghi-duong',
        label: 'Khu nghỉ dưỡng, Sinh thái',
        icon: '🌳',
      },
      {
        id: 'khu-cong-nghiep',
        label: 'Khu công nghiệp',
        icon: '🏭',
      },
    ],
  };

  interface Property {
    id: string;
    title: string;
    price: string;
    area: string;
    location: string;
    images: string[];
    pricePerMonth?: string;
    isFavorite?: boolean;
  }

  // Thêm vào trong component Home, sau phần News
  const recommendedProperties: Property[] = [
    {
      id: '1',
      title: 'Chung cư cao cấp Gemory Định giá 4,5 tỷ rẻ nhất thị trường khi mua',
      price: '4.5 tỷ',
      area: '62 m²',
      location: 'Nam Từ Liêm, Hà Nội',
      images: [
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        '/images/property1-2.jpg',
        '/images/property1-3.jpg',
      ],
      isFavorite: false,
    },
    {
      id: '2',
      title: 'Cho thuê căn hộ studio - 1 PN - 2 PN tại Ecolife Capitol với giá r',
      price: '11 triệu/tháng',
      area: '75 m²',
      location: 'Nam Từ Liêm, Hà Nội',
      images: [
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        '/images/property2-2.jpg',
      ],
      pricePerMonth: '11 triệu',
      isFavorite: true,
    },
    {
      id: '3',
      title: 'Bán nhà 4 tầng phân lô vip trạch, ngõ thông kinh doanh phố',
      price: '39 tỷ',
      area: '115 m²',
      location: 'Đống Đa, Hà Nội',
      images: [
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        '/images/property3-2.jpg',
        '/images/property3-3.jpg',
      ],
      isFavorite: false,
    },
    {
      id: '4',
      title: 'Nhà 7 tỷ có nhà đẹp TDL ĐT45m2 57 ngõ thông rộng',
      price: 'Giá thỏa thuận',
      area: '45 m²',
      location: 'Đống Đa, Hà Nội',
      images: ['https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg'],
      isFavorite: false,
    },
    {
      id: '5',
      title: 'Biệt thự ven hồ Tây - View đẹp - Nội thất sang trọng',
      price: '75 tỷ',
      area: '250 m²',
      location: 'Tây Hồ, Hà Nội',
      images: [
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        '/images/property5-2.jpg',
      ],
      isFavorite: true,
    },
    {
      id: '6',
      title: 'Căn hộ cao cấp Vinhomes Ocean Park 3PN giá tốt nhất',
      price: '6.8 tỷ',
      area: '90 m²',
      location: 'Gia Lâm, Hà Nội',
      images: [
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        '/images/property6-2.jpg',
        '/images/property6-3.jpg',
      ],
      isFavorite: false,
    },
    {
      id: '7',
      title: 'Bán nhà riêng tại Cầu Giấy - Nhà đẹp, ngõ ô tô vào tận cửa',
      price: '9.2 tỷ',
      area: '80 m²',
      location: 'Cầu Giấy, Hà Nội',
      images: ['https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg'],
      isFavorite: true,
    },
    {
      id: '8',
      title: 'Nhà mặt phố Trung Hòa - Kinh doanh sầm uất - Giá cực tốt',
      price: '56 tỷ',
      area: '120 m²',
      location: 'Cầu Giấy, Hà Nội',
      images: [
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        '/images/property8-2.jpg',
      ],
      isFavorite: false,
    },
    {
      id: '9',
      title: 'Shophouse The Manor Central Park - Vị trí đắc địa',
      price: '21 tỷ',
      area: '100 m²',
      location: 'Hoàng Mai, Hà Nội',
      images: [
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        '/images/property9-2.jpg',
      ],
      isFavorite: false,
    },
    {
      id: '10',
      title: 'Căn hộ studio tại Times City - Giá hấp dẫn',
      price: '3.5 tỷ',
      area: '50 m²',
      location: 'Hai Bà Trưng, Hà Nội',
      images: ['https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg'],
      isFavorite: true,
    },
    {
      id: '11',
      title: 'Nhà phố thương mại tại KĐT Ciputra - Tiện ích đầy đủ',
      price: '28 tỷ',
      area: '150 m²',
      location: 'Tây Hồ, Hà Nội',
      images: [
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        '/images/property11-2.jpg',
      ],
      isFavorite: false,
    },
    {
      id: '12',
      title: 'Bán biệt thự liền kề 4 tầng tại Vinhomes Smart City',
      price: '15 tỷ',
      area: '200 m²',
      location: 'Nam Từ Liêm, Hà Nội',
      images: [
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        '/images/property12-2.jpg',
      ],
      isFavorite: true,
    },
    {
      id: '13',
      title: 'Căn hộ 2PN tại Sunshine City - Nội thất hiện đại',
      price: '5.2 tỷ',
      area: '75 m²',
      location: 'Bắc Từ Liêm, Hà Nội',
      images: ['https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg'],
      isFavorite: false,
    },
    {
      id: '14',
      title: 'Nhà riêng tại Long Biên - Gần cầu Chương Dương',
      price: '6.5 tỷ',
      area: '85 m²',
      location: 'Long Biên, Hà Nội',
      images: [
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        '/images/property14-2.jpg',
      ],
      isFavorite: false,
    },
    {
      id: '15',
      title: 'Bán đất nền dự án VinCity Ocean Park - Đầu tư sinh lời',
      price: '12 tỷ',
      area: '300 m²',
      location: 'Gia Lâm, Hà Nội',
      images: ['https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg'],
      isFavorite: true,
    },
    {
      id: '16',
      title: 'Bán nhà mặt phố cổ Hàng Ngang - Khu kinh doanh sầm uất',
      price: '100 tỷ',
      area: '180 m²',
      location: 'Hoàn Kiếm, Hà Nội',
      images: [
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        '/images/property16-2.jpg',
      ],
      isFavorite: false,
    },
  ];

  const getPostCountByCity = () => {
    const cityCounts: { [key: string]: number } = {};

    recommendedProperties.forEach((property) => {
      const city = property.location.split(', ')[1]; // Lấy tên thành phố sau dấu phẩy
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });

    return cityCounts;
  };

  // Tạo interface cho thông tin thành phố
  interface CityInfo {
    name: string;
    count: number;
    image: string;
  }

  // Thêm mảng thông tin các thành phố
  const cityInfos: CityInfo[] = [
    {
      name: 'TP. Hồ Chí Minh',
      count: 63542,
      image: 'https://file4.batdongsan.com.vn/images/newhome/cities/HCM-web-1.jpg',
    },
    {
      name: 'Hà Nội',
      count: getPostCountByCity()['Hà Nội'] || 0, // Lấy số lượng thực tế từ dữ liệu
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

  const propertyTypes = propertyTypesByTab[activeTab as keyof typeof propertyTypesByTab];

  const priceOptions = [
    { value: 'all', label: 'Tất cả mức giá' },
    { value: '0-500', label: 'Dưới 500 triệu' },
    { value: '500-800', label: '500 - 800 triệu' },
    { value: '800-1000', label: '800 triệu - 1 tỷ' },
    { value: '1000-2000', label: '1 - 2 tỷ' },
  ];

  const areaOptions = [
    { value: 'all', label: 'Tất cả diện tích' },
    { value: '0-30', label: 'Dưới 30 m²' },
    { value: '30-50', label: '30 - 50 m²' },
    { value: '50-80', label: '50 - 80 m²' },
    { value: '80-100', label: '80 - 100 m²' },
  ];

  const handleSearch = () => {
    console.log('Searching with:', { selectedCity, searchQuery });
  };

  const handlePropertyTypeChange = (propertyId: string) => {
    setSelectedPropertyTypes((prev) => {
      if (prev.includes(propertyId)) {
        return prev.filter((id) => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
  };

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

  const newsByTab: NewsData = {
    highlight: [
      {
        title: 'Đất Dịch Vụ Hà Nội Tăng Giá Đầu Năm Nhưng Giao Dịch Chậm',
        time: '6 giờ trước',
        img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        description: 'Thị trường bất động sản đầu năm ghi nhận nhiều biến động...',
      },
      {
        title: "Đừng Để 'Sụt Bẫy' Tại Điểm Nóng Đất Nền Đông Anh",
        time: '8 giờ trước',
        img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
      },
      {
        title: '6 Chỉ Báo Của Chuyên Gia Về Tỷ Suất Cho Thuê Khi Đầu Tư Căn Hộ',
        time: '1 ngày trước',
        img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
      },
      {
        title: 'Đất Nền Đan Phượng Nổi Sóng Đầu Năm 2025',
        time: '2 ngày trước',
        img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
      },
      {
        title: 'Những Loại Đất Nền Cần Tránh Xa Khi Đầu Tư',
        time: '2 ngày trước',
        img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
      },
    ],
    news: [
      {
        title: 'Thị Trường BĐS 2024: Dự Báo và Triển Vọng',
        time: '1 giờ trước',
        img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        description: 'Các chuyên gia nhận định về triển vọng thị trường BĐS năm 2024...',
      },
      {
        title: 'Chính Sách Mới Về Vay Mua Nhà Năm 2024',
        time: '3 giờ trước',
        img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
      },
      {
        title: 'Top 5 Dự Án Căn Hộ Được Quan Tâm Nhất Tháng 2/2024',
        time: '5 giờ trước',
        img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
      },
      {
        title: 'Xu Hướng Đầu Tư BĐS: Căn Hộ Du Lịch Lên Ngôi',
        time: '1 ngày trước',
        img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
      },
    ],
    'bds-tphcm': [
      {
        title: 'Thị Trường Căn Hộ TP.HCM: Nguồn Cung Khan Hiếm',
        time: '2 giờ trước',
        img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        description: 'Thị trường căn hộ TP.HCM đang đối mặt với tình trạng khan hiếm nguồn cung...',
      },
      {
        title: 'Quận 9 Sẽ Là Tâm Điểm BĐS Năm 2024',
        time: '4 giờ trước',
        img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
      },
      {
        title: 'Giá Nhà Phố Thương Mại Tại TP.HCM Tăng Mạnh',
        time: '1 ngày trước',
        img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
      },
      {
        title: 'Các Dự Án Metro Tác Động Đến BĐS TP.HCM',
        time: '2 ngày trước',
        img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
      },
    ],
    'bds-hanoi': [
      {
        title: 'Thị Trường BĐS Hà Nội Khởi Sắc Đầu Năm',
        time: '1 giờ trước',
        img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
        description: 'Thị trường bất động sản Hà Nội ghi nhận những tín hiệu tích cực...',
      },
      {
        title: 'Giá Đất Nền Khu Vực Hoài Đức Tăng Mạnh',
        time: '5 giờ trước',
        img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
      },
      {
        title: 'Dự Án Đường Vành Đai 4 Tác Động BĐS Hà Nội',
        time: '1 ngày trước',
        img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
      },
      {
        title: 'Khu Đô Thị Mới Tây Hồ Tây Thu Hút Nhà Đầu Tư',
        time: '2 ngày trước',
        img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
      },
    ],
  };

  const [activeNewsTab, setActiveNewsTab] = useState<keyof NewsData>('highlight');

  const handleLoadMore = () => {
    setVisibleProperties((prev) => prev + 8);
  };

  return (
    <>
      {/* Banner */}
      <div className='banner bg-[url(/banner.jpg)] bg-cover bg-center h-[500px] inset-0 w-auto relative'>
        <div className='banner__content top-[100px] absolute md:left-[20%] lg:left-[20%] left-[5%] text-center w-[90%] md:w-[70%] lg:w-[55%]'>
          <div className='search w-full'>
            <div className='search__tab'>
              <ul className='flex flex-wrap justify-start text-[#fff] text-sm md:text-base'>
                <li
                  className={cn(
                    'mr-[5px] mb-2 md:mb-0 inset-0 bg-black/60 z-[99] transition-opacity duration-300 px-[10px] py-[5px] rounded-t-[5px] cursor-pointer hover:bg-black/80',
                    activeTab === 'nha-dat-ban' && 'bg-[#EF4444]/80 hover:bg-[#EF4444]',
                  )}
                  onClick={() => setActiveTab('nha-dat-ban')}
                >
                  Nhà đất bán
                </li>
                <li
                  className={cn(
                    'mr-[5px] mb-2 md:mb-0 inset-0 bg-black/60 z-[99] transition-opacity duration-300 px-[10px] py-[5px] rounded-t-[5px] cursor-pointer hover:bg-black/80',
                    activeTab === 'nha-dat-cho-thue' && 'bg-[#EF4444]/80 hover:bg-[#EF4444]',
                  )}
                  onClick={() => setActiveTab('nha-dat-cho-thue')}
                >
                  Nhà đất cho thuê
                </li>
                <li
                  className={cn(
                    'mb-2 md:mb-0 inset-0 bg-black/60 z-[99] transition-opacity duration-300 px-[10px] py-[5px] rounded-t-[5px] cursor-pointer hover:bg-black/80',
                    activeTab === 'du-an' && 'bg-[#EF4444]/80 hover:bg-[#EF4444]',
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
                    <span className='hidden md:inline'>Tìm kiếm</span>
                    <IoIosSearch className='w-4 h-4 md:hidden' />
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
                      <span className='text-sm truncate'>Loại hình dự án</span>
                      <MdKeyboardArrowDown className='h-4 w-4 flex-shrink-0' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-[90vw] sm:w-[300px] p-0' align='start'>
                    <div className='p-4'>
                      <div className='flex items-center justify-between mb-4'>
                        <h4 className='font-medium text-base'>Loại nhà đất</h4>
                        <Button
                          variant='ghost'
                          size='icon'
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
                              {type.icon && <span className='mr-2'>{type.icon}</span>}
                              {type.label}
                            </label>
                          </div>
                        ))}
                      </div>
                      <div className='flex gap-2 mt-4 border-t pt-4'>
                        <Button
                          variant='outline'
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

                <Popover open={showAreaFilter} onOpenChange={setShowAreaFilter}>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      className='w-full sm:w-[33%] justify-between bg-white text-gray-600 border-none'
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner */}

      {/* News */}
      <div className='max-w-5xl mx-auto p-[60px]'>
        <Tabs value={activeNewsTab} onValueChange={(value: string) => setActiveNewsTab(value as keyof NewsData)}>
          <div className='flex items-center justify-between'>
            <TabsList className='mb-4 border-b flex flex-wrap gap-2 md:gap-4'>
              <TabsTrigger
                value='highlight'
                className={cn(
                  'font-semibold border-b-2 transition-colors',
                  activeNewsTab === 'highlight' ? 'border-red-500 text-red-500' : 'border-transparent',
                )}
              >
                Tin nổi bật
              </TabsTrigger>
              <TabsTrigger
                value='news'
                className={cn(
                  'font-semibold border-b-2 transition-colors',
                  activeNewsTab === 'news' ? 'border-red-500 text-red-500' : 'border-transparent',
                )}
              >
                Tin tức
              </TabsTrigger>
              <TabsTrigger
                value='bds-tphcm'
                className={cn(
                  'font-semibold border-b-2 transition-colors',
                  activeNewsTab === 'bds-tphcm' ? 'border-red-500 text-red-500' : 'border-transparent',
                )}
              >
                BĐS TPHCM
              </TabsTrigger>
              <TabsTrigger
                value='bds-hanoi'
                className={cn(
                  'font-semibold border-b-2 transition-colors',
                  activeNewsTab === 'bds-hanoi' ? 'border-red-500 text-red-500' : 'border-transparent',
                )}
              >
                BĐS Hà Nội
              </TabsTrigger>
            </TabsList>
            <Button variant='link' className='text-red-500'>
              Xem thêm →
            </Button>
          </div>

          <TabsContent value={activeNewsTab} className='mt-4'>
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
                  <p className='text-gray-500 text-sm flex items-center mt-1'>⏳ {newsByTab[activeNewsTab][0].time}</p>
                  {newsByTab[activeNewsTab][0].description && (
                    <p className='text-gray-600 mt-2 text-sm line-clamp-2'>{newsByTab[activeNewsTab][0].description}</p>
                  )}
                </CardContent>
              </Card>

              <div className='space-y-3'>
                {newsByTab[activeNewsTab].slice(1).map((item: NewsItem, index: number) => (
                  <div
                    key={index}
                    className='border-b pb-2 last:border-none hover:bg-gray-50 transition-colors rounded p-2 cursor-pointer'
                  >
                    <h4 className='text-sm font-semibold hover:text-red-500 transition-colors'>{item.title}</h4>
                    <p className='text-gray-500 text-xs flex items-center mt-1'>⏳ {item.time}</p>
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

      {/* bđs for you */}
      <div className='bg-gray-100 w-full px-[60px] pt-[30px] pb-[60px] '>
        <div className='content  mx-auto max-w-6xl px-[60px]'>
          <div className='title flex justify-between items-center pb-[20px]'>
            <h2 className='text-[22px] font-bold'>Bất động sản dành cho bạn</h2>
            <div className='flex'>
              <div className='block pr-[10px] border border-r-[1px border-r-gray-500 text-[12px]'>
                <span>
                  <a href='#'>Tin nhà đất mới</a>
                </span>
              </div>
              <div className='block border border-r-[1px] text-[12px] ml-[10px]'>
                <span>
                  <a href='#'>Tin nhà đất cho thuê mới</a>
                </span>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] '>
            {recommendedProperties.slice(0, visibleProperties).map((property) => (
              <Card key={property.id} className='rounded-[5px]'>
                <CardContent className='p-0 pb-[10px] relative '>
                  <div className=' overflow-hidden w-full  '>
                    <CustomImage
                      src={property.images[0]}
                      alt='Placeholder Image'
                      width='full'
                      height='full'
                      className='rounded-[5px]'
                    />
                  </div>
                  <div className='flex'>
                    <AiOutlinePicture className='text-[#fff] absolute top-[100px] right-[30px] text-[24px]' />
                    <p className='text-[#fff] absolute top-[100px] right-[15px] text-[16px]'>
                      {property.images.length}
                    </p>
                  </div>
                  <div className='px-[15px]'>
                    <div className=' '>
                      <span className='font-[700] text-[#2C2C2C] text-sm mt-[10px]'>{property.title}</span>
                    </div>
                    <div className='text-red flex '>
                      <div className='text-[#E03C31] mr-[30px] font-[500]'>
                        <span>{property.price}</span>
                      </div>
                      <div className='text-[#E03C31] font-[500]'>
                        <span>{property.area}</span>
                      </div>
                    </div>
                    <div className='flex justify-start items-center mt-[5px]'>
                      <IoLocationOutline />
                      <span className='text-sm ml-[5px] font-[0] '>{property.location}</span>
                    </div>
                    <div className='flex justify-between items-center mt-[10px] '>
                      <span className='text-[14px] text-gray-400'>Đăng hôm nay</span>

                      <HoverCard>
                        <HoverCardTrigger className='border p-[5px] rounded-[5px]'>
                          <CiHeart className='font-bold text-[18px]' />
                        </HoverCardTrigger>
                        <HoverCardContent>Bấm để lưu tin</HoverCardContent>
                      </HoverCard>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {visibleProperties < recommendedProperties.length && (
            <div className='flex justify-center mt-8'>
              <Button
                onClick={handleLoadMore}
                className='bg-white text-[#E03C31] hover:bg-[#E03C31] hover:text-white border border-[#E03C31] px-8 py-2 rounded-full transition-colors duration-300'
              >
                Xem thêm
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* bđs for you */}

      {/* Bất động sản theo địa điểm */}

      <div className='max-w-6xl mx-auto px-[60px] py-[60px]'>
        <div className='title flex justify-between items-center pb-[20px]'>
          <h2 className='text-[22px] font-bold'>Bất động sản theo địa điểm</h2>
        </div>

        <div className='grid grid-cols-7 grid-rows-4 gap-6'>
          {cityInfos.map((city, index) => (
            <div 
              key={city.name}
              className={`relative rounded-lg overflow-hidden group cursor-pointer
                ${index === 0 ? 'col-span-3 row-span-4' : ''} 
                ${index === 1 ? 'col-span-2 row-span-2 col-start-4' : ''}
                ${index === 2 ? 'col-span-2 row-span-2 col-start-6' : ''}
                ${index === 3 ? 'col-span-2 row-span-2 col-start-4 row-start-3' : ''}
                ${index === 4 ? 'col-span-2 row-span-2 col-start-6 row-start-3' : ''}`
                
              }
            >
              <img 
                src={city.image}
                alt={city.name}
                className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'>
                <div className='absolute bottom-4 left-4 text-white'>
                  <h3 className='text-xl font-bold mb-1'>{city.name}</h3>
                  <p className='text-sm text-gray-200'>{city.count.toLocaleString('vi-VN')} tin đăng</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tin tức bất động sản */}
        <div className='max-w-6xl mx-auto  py-[60px]'>
          <div className='title flex justify-between items-center pb-[20px]'>
            <h2 className='text-[22px] font-bold'>Tin tức bất động sản</h2>
            <Button variant='link' className='text-[#E03C31] hover:text-[#FF837A]'>
              Xem thêm →
            </Button>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className='w-full'
          >
            <CarouselContent>
              <CarouselItem className='basis-full md:basis-1/2 lg:basis-1/3'>
                <Card className='border-none'>
                  <CardContent className='p-0'>
                    <div className='relative h-[200px] rounded-lg overflow-hidden'>
                      <img 
                        src='https://file4.batdongsan.com.vn/crop/393x222/2024/03/23/20240323141334-a1f4_wm.jpg'
                        alt='Chu kì mới của thị trường BĐS'
                        className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
                      />
                    </div>
                    <div className='pt-4'>
                      <h3 className='font-semibold text-base line-clamp-2 hover:text-[#E03C31] cursor-pointer'>
                        Chu Kì Mới Của Thị Trường Bất Động Sản Sẽ Diễn Biến Ra Sao?
                      </h3>
                      <p className='text-gray-500 text-sm mt-2'>⏳ 6 giờ trước</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className='basis-full md:basis-1/2 lg:basis-1/3'>
                <Card className='border-none'>
                  <CardContent className='p-0'>
                    <div className='relative h-[200px] rounded-lg overflow-hidden'>
                      <img 
                        src='https://file4.batdongsan.com.vn/crop/393x222/2024/03/23/20240323094614-8e58_wm.jpg'
                        alt='Bảng lãi suất Agribank'
                        className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
                      />
                    </div>
                    <div className='pt-4'>
                      <h3 className='font-semibold text-base line-clamp-2 hover:text-[#E03C31] cursor-pointer'>
                        Bảng Lãi Suất Ngân Hàng Agribank Tháng 03/2024 Mới Nhất
                      </h3>
                      <p className='text-gray-500 text-sm mt-2'>⏳ 1 ngày trước</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className='basis-full md:basis-1/2 lg:basis-1/3'>
                <Card className='border-none'>
                  <CardContent className='p-0'>
                    <div className='relative h-[200px] rounded-lg overflow-hidden'>
                      <img 
                        src='https://file4.batdongsan.com.vn/crop/393x222/2024/03/22/20240322143242-fcd7_wm.jpg'
                        alt='Thách thức thị trường Lê Hà Nội'
                        className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
                      />
                    </div>
                    <div className='pt-4'>
                      <h3 className='font-semibold text-base line-clamp-2 hover:text-[#E03C31] cursor-pointer'>
                        Thách Thức Của Thị Trường Bán Lẻ Hà Nội
                      </h3>
                      <p className='text-gray-500 text-sm mt-2'>⏳ 2 ngày trước</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className='basis-full md:basis-1/2 lg:basis-1/3'>
                <Card className='border-none'>
                  <CardContent className='p-0'>
                    <div className='relative h-[200px] rounded-lg overflow-hidden'>
                      <img 
                        src='https://file4.batdongsan.com.vn/crop/393x222/2024/03/22/20240322111449-5cd4_wm.jpg'
                        alt='Thị trường BĐS phía Nam'
                        className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
                      />
                    </div>
                    <div className='pt-4'>
                      <h3 className='font-semibold text-base line-clamp-2 hover:text-[#E03C31] cursor-pointer'>
                        Thị Trường Bất Động Sản Phía Nam: Dấu Hiệu Khởi Sắc
                      </h3>
                      <p className='text-gray-500 text-sm mt-2'>⏳ 3 ngày trước</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className='hidden md:flex -left-12 hover:bg-[#E03C31] hover:text-white shadow-md' />
            <CarouselNext className='hidden md:flex -right-12 hover:bg-[#E03C31] hover:text-white shadow-md' />
          </Carousel>
        </div>
        {/* Tin tức bất động sản */}
      </div>

      {/* Bất động sản theo địa điểm */}

      {/* Hỗ trợ tiện ích */}
      <div className='max-w-6xl mx-auto px-[60px] py-[60px]'>
        <div className='title flex justify-between items-center pb-[20px]'>
          <h2 className='text-[22px] font-bold'>Hỗ trợ tiện ích</h2>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {/* Xem tuổi xây nhà */}
          <div className='flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-[#E03C31] transition-colors cursor-pointer group'>
            <div className='w-12 h-12 flex items-center justify-center rounded-full bg-[#E8F7F7]'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#00B4D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6V12L16 14" stroke="#00B4D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className='font-semibold text-gray-900 group-hover:text-[#E03C31]'>Xem tuổi xây nhà</h3>
              <p className='text-sm text-gray-500'>Xem tuổi xây nhà hợp phong thủy</p>
            </div>
          </div>

          {/* Chi phí làm nhà */}
          <div className='flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-[#E03C31] transition-colors cursor-pointer group'>
            <div className='w-12 h-12 flex items-center justify-center rounded-full bg-[#FFF4DE]'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H21C22.1046 19 23 18.1046 23 17V7C23 5.89543 22.1046 5 21 5Z" stroke="#FFA800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#FFA800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 9H23" stroke="#FFA800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className='font-semibold text-gray-900 group-hover:text-[#E03C31]'>Chi phí làm nhà</h3>
              <p className='text-sm text-gray-500'>Tính toán chi phí xây dựng</p>
            </div>
          </div>

          {/* Tính lãi suất */}
          <div className='flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-[#E03C31] transition-colors cursor-pointer group'>
            <div className='w-12 h-12 flex items-center justify-center rounded-full bg-[#E8E8FC]'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#696CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z" stroke="#696CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 8V14" stroke="#696CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 8V14" stroke="#696CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className='font-semibold text-gray-900 group-hover:text-[#E03C31]'>Tính lãi suất</h3>
              <p className='text-sm text-gray-500'>Tính lãi suất vay mua nhà</p>
            </div>
          </div>

          {/* Tư vấn phong thủy */}
          <div className='flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-[#E03C31] transition-colors cursor-pointer group'>
            <div className='w-12 h-12 flex items-center justify-center rounded-full bg-[#FFE2E5]'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="#FF424F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 1V3" stroke="#FF424F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 21V23" stroke="#FF424F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.22 4.22L5.64 5.64" stroke="#FF424F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.36 18.36L19.78 19.78" stroke="#FF424F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 12H3" stroke="#FF424F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12H23" stroke="#FF424F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.22 19.78L5.64 18.36" stroke="#FF424F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.36 5.64L19.78 4.22" stroke="#FF424F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className='font-semibold text-gray-900 group-hover:text-[#E03C31]'>Tư vấn phong thủy</h3>
              <p className='text-sm text-gray-500'>Xem hướng nhà hợp phong thủy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Doanh nghiệp tiêu biểu */}
      <div className='max-w-6xl mx-auto px-[60px] pb-[60px]'>
        <div className='title flex justify-between items-center pb-[20px]'>
          <h2 className='text-[22px] font-bold'>Doanh nghiệp tiêu biểu</h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className='w-full'
        >
          <CarouselContent>
            <CarouselItem className='basis-1/2 md:basis-1/3 lg:basis-1/6'>
              <div className='p-4 border rounded-lg hover:border-[#E03C31] transition-colors'>
                <img src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg' alt="Green House" className='w-full h-auto' />
              </div>
            </CarouselItem>
            <CarouselItem className='basis-1/2 md:basis-1/3 lg:basis-1/6'>
              <div className='p-4 border rounded-lg hover:border-[#E03C31] transition-colors'>
                <img src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg' alt="Thiên Minh Capital" className='w-full h-auto' />
              </div>
            </CarouselItem>
            <CarouselItem className='basis-1/2 md:basis-1/3 lg:basis-1/6'>
              <div className='p-4 border rounded-lg hover:border-[#E03C31] transition-colors'>
                <img src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg' alt="HausLand" className='w-full h-auto' />
              </div>
            </CarouselItem>
            <CarouselItem className='basis-1/2 md:basis-1/3 lg:basis-1/6'>
              <div className='p-4 border rounded-lg hover:border-[#E03C31] transition-colors'>
                <img src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg' alt="CityLand" className='w-full h-auto' />
              </div>
            </CarouselItem>
            <CarouselItem className='basis-1/2 md:basis-1/3 lg:basis-1/6'>
              <div className='p-4 border rounded-lg hover:border-[#E03C31] transition-colors'>
                <img src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg' alt="Hoàng Thổ Group" className='w-full h-auto' />
              </div>
            </CarouselItem>
            <CarouselItem className='basis-1/2 md:basis-1/3 lg:basis-1/6'>
              <div className='p-4 border rounded-lg hover:border-[#E03C31] transition-colors'>
                <img src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg' alt="Kim Tinh Group" className='w-full h-auto' />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className='hidden md:flex -left-12 hover:bg-[#E03C31] hover:text-white shadow-md' />
          <CarouselNext className='hidden md:flex -right-12 hover:bg-[#E03C31] hover:text-white shadow-md' />
        </Carousel>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Bất động sản bán */}
          <div className="group cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4">
                <svg viewBox="0 0 24 24" className="w-full h-full text-[#E03C31]" fill="currentColor">
                  <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm9-8.586 6 6V15l.001 5H6v-9.586l6-6z"/>
                  <path d="M12 18c3.703 0 4.901-3.539 4.95-3.689l-1.9-.621c-.008.023-.781 2.31-3.05 2.31-2.238 0-3.02-2.221-3.051-2.316l-1.899.627C7.099 14.461 8.297 18 12 18z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-[#E03C31] transition-colors">Bất động sản bán</h3>
              <p className="text-sm text-gray-600 text-center">
                Bạn có thể tìm thấy ngôi nhà mơ ước hoặc cơ hội đầu tư hấp dẫn thông qua lượng tin rao lớn, uy tín về các loại hình 
                <span className="text-[#E03C31]"> bất động sản bán</span> tại Việt Nam, bao gồm bán nhà riêng, 
                <span className="text-[#E03C31]"> bán nhà mặt tiền</span>, bán căn hộ chung cư, 
                <span className="text-[#E03C31]"> bán biệt thự</span>, bán đất, 
                <span className="text-[#E03C31]"> bán shophouse</span> và các loại hình BĐS khác.
              </p>
            </div>
          </div>

          {/* Bất động sản cho thuê */}
          <div className="group cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4">
                <svg viewBox="0 0 24 24" className="w-full h-full text-[#E03C31]" fill="currentColor">
                  <path d="M19 2H5C3.346 2 2 3.346 2 5v2.831c0 1.053.382 2.01 1 2.746V19c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8.424c.618-.735 1-1.692 1-2.746V5c0-1.654-1.346-3-3-3zm1 3v2.831c0 1.14-.849 2.112-1.891 2.167L18 10c-1.103 0-2-.897-2-2V4h3c.552 0 1 .449 1 1zM10 4h4v4c0 1.103-.897 2-2 2s-2-.897-2-2V4zM4 5c0-.551.448-1 1-1h3v4c0 1.103-.897 2-2 2l-.109-.003C4.849 9.943 4 8.971 4 7.831V5zm6 14v-3h4v3h-4zm6 0v-3c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v3H5v-7.131c.254.067.517.111.787.125A3.988 3.988 0 0 0 9 10.643c.733.832 1.807 1.357 3 1.357s2.267-.525 3-1.357a3.988 3.988 0 0 0 3.213 1.351c.271-.014.533-.058.787-.125V19h-3z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-[#E03C31] transition-colors">Bất động sản cho thuê</h3>
              <p className="text-sm text-gray-600 text-center">
                Cập nhật thường xuyên và đầy đủ các loại hình 
                <span className="text-[#E03C31]"> bất động sản cho thuê</span> như: thuê phòng trọ, nhà riêng, 
                <span className="text-[#E03C31]"> thuê biệt thự</span>, văn phòng, kho xưởng hay 
                <span className="text-[#E03C31]"> thuê mặt bằng</span> kinh doanh giúp bạn nhanh chóng tìm được bất động sản ưng ý.
              </p>
            </div>
          </div>

          {/* Đánh giá dự án */}
          <div className="group cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4">
                <svg viewBox="0 0 24 24" className="w-full h-full text-[#E03C31]" fill="currentColor">
                  <path d="M20 2H4c-1.103 0-2 .897-2 2v18l4-4h14c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H5.17l-1.17 1.17V4h16v12z"/>
                  <path d="m12.445 10.964-.866-3.351a1 1 0 0 0-1.931.498l.867 3.351a1 1 0 0 0 1.93-.498z"/>
                  <path d="m16.445 10.964-.866-3.351a1 1 0 0 0-1.931.498l.867 3.351a1 1 0 0 0 1.93-.498z"/>
                  <path d="m8.445 10.964-.866-3.351a1 1 0 0 0-1.931.498l.867 3.351a1 1 0 0 0 1.93-.498z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-[#E03C31] transition-colors">Đánh giá dự án</h3>
              <p className="text-sm text-gray-600 text-center">
                Các <span className="text-[#E03C31]">video đánh giá tổng quan dự án</span> cung cấp góc nhìn khách quan của các chuyên gia về những dự án nổi bật tại Việt Nam, giúp bạn đưa ra quyết định đúng đắn cho nơi an cư lý tưởng hoặc cơ hội đầu tư sinh lời.
              </p>
            </div>
          </div>

          {/* Wiki BDS */}
          <div className="group cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4">
                <svg viewBox="0 0 24 24" className="w-full h-full text-[#E03C31]" fill="currentColor">
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                  <path d="M11 11h2v6h-2zm0-4h2v2h-2z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-[#E03C31] transition-colors">Wiki BDS</h3>
              <p className="text-sm text-gray-600 text-center">
                Ngoài cập nhật những biến động thị trường, chúng tôi còn cung cấp kiến thức, kinh nghiệm về mua bán, cho thuê, đầu tư, vay mua nhà, 
                <span className="text-[#E03C31]"> phong thủy</span>, thiết kế nhà, mọi thông tin cần thiết để dẫn lối người tìm nhà tìm thấy căn nhà mơ ước.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
