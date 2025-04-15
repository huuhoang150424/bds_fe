export interface NewsItem {
  title: string;
  time: string;
  img: string;
  description?: string;
}
interface NewsData {
  [key: string]: NewsItem[];
}
export const featuredCities = [
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
export const allCities = [
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

export const propertyTypesByTab = {
  'nha-dat-ban': [
    {
      id: 'tat-ca',
      label: 'Tất cả',
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
      id: 'can-ho',
      label: 'Căn hộ',
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
export interface Property {
  id: string;
  title: string;
  price: string;
  area: string;
  location: string;
  images: string[];
  pricePerMonth?: string;
  isFavorite?: boolean;
}
export const recommendedProperties: Property[] = [
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
    images: ['https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg', '/images/property2-2.jpg'],
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
    images: ['https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg', '/images/property5-2.jpg'],
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
    images: ['https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg', '/images/property8-2.jpg'],
    isFavorite: false,
  },
  {
    id: '9',
    title: 'Shophouse The Manor Central Park - Vị trí đắc địa',
    price: '21 tỷ',
    area: '100 m²',
    location: 'Hoàng Mai, Hà Nội',
    images: ['https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg', '/images/property9-2.jpg'],
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
    images: ['https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg', '/images/property11-2.jpg'],
    isFavorite: false,
  },
  {
    id: '12',
    title: 'Bán biệt thự liền kề 4 tầng tại Vinhomes Smart City',
    price: '15 tỷ',
    area: '200 m²',
    location: 'Nam Từ Liêm, Hà Nội',
    images: ['https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg', '/images/property12-2.jpg'],
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
    images: ['https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg', '/images/property14-2.jpg'],
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
    images: ['https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg', '/images/property16-2.jpg'],
    isFavorite: false,
  },
];
export interface CityInfo {
  name: string;
  count: number;
  image: string;
}

export const priceOptions = [
  { value: 'all', label: 'Tất cả mức giá' },
  { value: '1000-2000', label: '1 - 2 tỷ' },
  { value: '2000-4000', label: '2 - 4 tỷ' },
  { value: '4000-8000', label: '4 - 8 tỷ' },
  { value: '8000+', label: 'Trên 8 tỷ' },
];

export const areaOptions = [
  { value: 'all', label: 'Tất cả diện tích' },
  { value: '0-30', label: 'Dưới 30 m²' },
  { value: '30-50', label: '30 - 50 m²' },
  { value: '50-80', label: '50 - 80 m²' },
  { value: '80-100', label: '80 - 100 m²' },
];
export const newsByTab: NewsData = {
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
