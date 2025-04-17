export const menuItemsSell = [
  'Căn hộ',
  'Biệt thự',
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
export const menuItemsRent = [
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

export const menuItemsContact = ['Nhà môi giới', 'Doanh nghiệp'];


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
