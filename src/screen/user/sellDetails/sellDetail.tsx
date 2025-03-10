import React, { useState } from 'react';
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

function SellDetail() {
  const [showAllCities, setShowAllCities] = useState(false);
  const [searchCity, setSearchCity] = useState('');

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

  return (
    <>
      <div className='bg-blue-500 max-w-5xl mx-auto contain-content h-full'>
        {/* Search */}
        <div className='search bg-red-500 mb-[60px] h-[200px]'>
          <p>Search</p>
        </div>
        {/* Search */}
        {/* bài đăng */}
        <div className='flex  '>
          <div className='post w-[75%] p-[15px]'>
            <div className='post__title '>
              <h2 className='text-[22px] font-bold'>Mua bán bất động sản trên toàn quốc</h2>
              <p className='font-[400]'>Hiện có {getSumByCity()} bất động sản trên toàn quốc</p>
            </div>
            <div className='fillter'></div>
            <div className='post__detail flex flex-col gap-6 relative'>
              {realEstateListings.map((realEstateListing) => (
                <Card key={realEstateListing.id} className='overflow-hidden hover:shadow-lg transition-shadow'>
                  <CardContent className='p-6'>
                    {/* Grid ảnh */}
                    <div className='grid grid-cols-5 grid-rows-2 gap-2 h-[250px]'>
                      {/* Ảnh lớn bên trái */}
                      <div className='col-span-3 row-span-2  relative rounded-l-lg overflow-hidden'>
                        <img
                          src={realEstateListing.images[0]}
                          alt={realEstateListing.title}
                          className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                        />
                      </div>

                      {/* Ảnh lớn bên phải trên */}
                      <div className='col-span-2 col-start-4 relative overflow-hidden'>
                        <img
                          src={realEstateListing.images[1]}
                          alt={realEstateListing.title}
                          className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                        />
                      </div>

                      {/* Hai ảnh nhỏ bên phải dưới */}
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

                    {/* Thông tin bất động sản */}
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

                    {/* infor poster */}
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
                        {/* Nút gọi điện */}
                        <button className='flex items-center gap-2 bg-[#E03C31] text-white px-4 py-2 rounded-lg hover:bg-[#d02e23] transition-colors'>
                          <TbPhoneRinging className='text-xl' />
                          <span>{realEstateListing.poster.phone}</span>
                        </button>

                        {/* Nút lưu tin với HoverCard */}
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

                    {/* infor poster */}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className='fill w-[25%] p-[15px] bg-gray-500'>
            {/* Phần lọc diện tích */}
            <div className='bg-white rounded-lg shadow-sm p-4'>
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

            {/* Phần lọc khoảng giá */}
            <div className='bg-white rounded-lg shadow-sm p-4 mt-4'>
              <h3 className='text-lg font-semibold mb-[10px]'>Lọc theo khoảng giá</h3>

              <div className='space-y-2'>
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

            {/* Phần lọc theo thành phố */}
            <div className='bg-white rounded-lg shadow-sm p-4 mt-4'>
              <h3 className='text-lg font-semibold mb-[10px]'>Mua bán nhà đất</h3>

              {/* Tìm kiếm thành phố */}
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

              <div className='space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar'>
                {/* Danh sách các thành phố */}
                {(searchCity ? filteredCities : showAllCities ? allCities : allCities.slice(0, 10)).map((city) => (
                  <div
                    key={city}
                    className='flex items-center justify-between py-1.5  hover:bg-gray-50 rounded-md cursor-pointer group'
                  >
                    <span className='text-gray-700 text-sm group-hover:text-[#E03C31] transition-colors'>{city}</span>
                    <span className='text-xs text-gray-500'>
                      {/* Giả lập số lượng BĐS cho mỗi thành phố */}({Math.floor(Math.random() * 1000 + 100)})
                    </span>
                  </div>
                ))}

                {/* Nút xem thêm - chỉ hiển thị khi không có tìm kiếm */}
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

                {/* Nút thu gọn - chỉ hiển thị khi đang xem tất cả và không có tìm kiếm */}
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

            {/* Bài viết được quan tâm */}
            <div className='bg-white rounded-lg shadow-sm p-4 mt-4'>
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
                  <div key={article.id} className='flex items-center group cursor-pointer'>
                    <h4 className='text-sm text-gray-700 group-hover:text-[#E03C31] transition-colors line-clamp-2'>
                      {article.title}
                    </h4>
                  </div>
                ))}
              </div>

              {/* Nút xem thêm */}
              <div className='mt-4 text-center'>
                <button
                  className='text-[#E03C31] text-sm hover:underline inline-flex items-center gap-1'
                  onClick={() => {
                    // Xử lý logic chuyển đến trang tin tức
                    console.log('Chuyển đến trang tin tức');
                  }}
                >
                  Xem tất cả tin tức
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* bài đăng */}
      </div>

      {/* Thêm style cho custom scrollbar */}
      {/* <style jsx global="true">{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style> */}
    </>
  );
}

export default SellDetail;
