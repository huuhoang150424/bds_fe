import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { PropertyTable } from '../components/property-table';

const sampleProperty = {
  createdAt: '2025-04-19T16:03:53.000Z',
  updatedAt: '2025-04-19T16:03:53.000Z',
  userId: '0168008a-cd39-4297-a1ee-6c742de0d1e1',
  title: 'Căn hộ cao cấp Đội Cấn, Ba Đình',
  priceUnit: 'VND',
  address: '56 Đội Cấn, Ba Đình, Hà Nội',
  price: 7430508614.923058,
  squareMeters: 102,
  description: 'Căn hộ sang trọng, đầy đủ nội thất, vị trí trung tâm.',
  floor: 2,
  bedroom: 2,
  bathroom: 2,
  priority: 1,
  isFurniture: false,
  direction: 'Tây',
  verified: true,
  expiredDate: '2025-04-29T12:33:59.000Z',
  status: 'Đã bàn giao',
  slug: 'can-ho-cao-cap-djoi-can-ba-djinh',
  user: {
    id: '0168008a-cd39-4297-a1ee-6c742de0d1e1',
    fullname: 'User 10',
    email: 'user10@gmail.com',
    phone: '0349938737',
    avatar:
      'https://img.freepik.com/premium-vector/user-icons-includes-user-icons-people-icons-symbols-premiumquality-graphic-design-elements_981536-526.jpg',
  },
  images: [
    {
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoStzDovGJyNEWEwE-FaNPbjKenYUrX1_3O-tAnndeqK9kmiLYvCWaaJ6zy1b-G7MuJSA&usqp=CAU',
    },
    {
      imageUrl: 'https://thanhvietcorp.vn/uploads/images/Bao%20chi/download-hinh-ngoi-nha-1024x684.jpg',
    },
    {
      imageUrl: 'https://cdn.hita.com.vn/storage/blog/meo-vat-gia-dinh/anh-ngoi-nha-28.jpg',
    },
    {
      imageUrl: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/hinh-anh-ngoi-nha-6.jpg',
    },
    {
      imageUrl: 'https://cdn.hita.com.vn/storage/blog/meo-vat-gia-dinh/anh-ngoi-nha-9.jpg',
    },
    {
      imageUrl: 'https://anphatgroups.vn/upload/post/mau-biet-thu-dep-9680.jpg',
    },
    {
      imageUrl: 'https://xaydungancu.com.vn/wp-content/uploads/2023/03/anh-nha-dep-phong-cach-hien-dai-11.jpg',
    },
    {
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSblI1sIp7Qx6E-tCbJn97j7yYinA7Cze5ksg&s',
    },
  ],
};

const generateProperties = () => {
  const locations = [
    { title: 'Căn hộ cao cấp Đội Cấn, Ba Đình', address: '56 Đội Cấn, Ba Đình, Hà Nội' },
    { title: 'Căn hộ cao cấp Liễu Giai, Ba Đình', address: '39 Liễu Giai, Ba Đình, Hà Nội' },
    { title: 'Căn hộ cao cấp Lê Văn Lương, Hoàng Mai', address: '92 Lê Văn Lương, Hoàng Mai, Hà Nội' },
    { title: 'Căn hộ cao cấp Láng Hạ, Đống Đa', address: '31 Láng Hạ, Đống Đa, Hà Nội' },
    { title: 'Căn hộ cao cấp Nguyễn Chí Thanh, Thanh Xuân', address: '43 Nguyễn Chí Thanh, Thanh Xuân, Hà Nội' },
    { title: 'Căn hộ cao cấp Phạm Hùng, Hoàng Mai', address: '97 Phạm Hùng, Hoàng Mai, Hà Nội' },
    { title: 'Căn hộ cao cấp Đội Cấn, Hoàng Mai', address: '51 Đội Cấn, Hoàng Mai, Hà Nội' },
    { title: 'Căn hộ cao cấp Liễu Giai, Hà Đông', address: '51 Liễu Giai, Hà Đông, Hà Nội' },
    { title: 'Căn hộ cao cấp Trần Duy Hưng, Thanh Xuân', address: '69 Trần Duy Hưng, Thanh Xuân, Hà Nội' },
    { title: 'Căn hộ cao cấp Tây Sơn, Hai Bà Trưng', address: '68 Tây Sơn, Hai Bà Trưng, Hà Nội' },
  ];

  const directions = ['Tây', 'Nam', 'Bắc', 'Đông', 'Tây Nam', 'Tây Bắc', 'Đông Bắc', 'Đông Nam'];
  const statuses = ['Đã bàn giao', 'Đã hết hạng', 'Đang bán', 'Sắp mở bán'];

  return locations.map((location, index) => {
    const price = Math.round(2000000000 + Math.random() * 9000000000);
    const squareMeters = Math.round(70 + Math.random() * 80);
    const bedroom = Math.round(1 + Math.random() * 3);
    const bathroom = Math.round(1 + Math.random() * 2);

    // Create date objects for different dates
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - Math.round(Math.random() * 30));

    const expiredDate = new Date();
    expiredDate.setDate(expiredDate.getDate() + Math.round(Math.random() * 30));

    return {
      ...sampleProperty,
      title: location.title,
      address: location.address,
      price: price,
      squareMeters: squareMeters,
      bedroom: bedroom,
      bathroom: bathroom,
      direction: directions[Math.floor(Math.random() * directions.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createdAt: createdDate.toISOString(),
      expiredDate: expiredDate.toISOString(),
    };
  });
};

export default function ManagePost() {
  useScrollToTopOnMount();
  const [properties] = useState(generateProperties());

  return (
    <div className='max-w-[1280px] mx-auto py-6 overflow-hidden px-[20px]  '>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-xl font-[600] text-gray-700 '>Danh sách bất động sản</h1>
        <div className='relative w-64'>
          <Search className='absolute left-2 top-3 h-4 w-4 text-muted-foreground' />
          <Input placeholder='Tìm kiếm...' className='pl-8 outline-none py-[8px] rounded-[8px] ' />
        </div>
      </div>

      <PropertyTable properties={properties} />
      <div className='mt-4'>

      </div>
    </div>
  );
}
