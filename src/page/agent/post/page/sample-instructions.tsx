import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Home, Bed, Bath, ArrowRight, Square, Compass, Tag, Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Sample() {
  const sampleProperty = {
    id: '8b2f4d92-d462-485d-b3f3-f0908f133cf6',
    createdAt: '2025-04-22T17:20:09.000Z',
    updatedAt: '2025-04-22T17:20:09.000Z',
    userId: 'f2bb40dc-553b-48a0-ab6f-dc93d1c04eaa',
    title: 'Nhà mặt phố cao cấp tại Bắc Kạn',
    priceUnit: 'VND/tháng',
    slug: 'nha-mat-pho-cao-cap-tai-bac-kan',
    address: 'Xã Nông Hạ, Huyện Chợ Mới, Tỉnh Bắc Kạn',
    price: 12500000,
    squareMeters: 85,
    description:
      '<p>Nhà mặt phố cao cấp, vị trí đắc địa tại trung tâm Bắc Kạn. Thiết kế hiện đại, không gian thoáng đãng với 3 phòng ngủ, 5 phòng tắm. Nội thất đầy đủ, sẵn sàng chuyển vào ở ngay. Phù hợp cho gia đình hoặc kinh doanh.</p>',
    floor: 3,
    bedroom: 3,
    bathroom: 5,
    isFurniture: true,
    direction: 'Đông Nam',
    status: 'ACTIVE',
    images: [
      {
        image_url:
          'https://media4.giphy.com/media/cw29eAnsAt3Gefthh9/giphy.gif?cid=6c09b952sa4bsjk9cg02n4feix4g5x6ajzlhazyycxd3n12u&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s',
      },
    ],
    propertyType: [
      {
        name: 'Nhà mặt phố',
        listingType: {
          listingType: 'Dự án',
        },
      },
    ],
  };
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className='max-w-[1240px] mx-auto py-4 px-4'>
      <div className='flex items-center mb-3'>
        <Link to='/agent/manage-post'>
          <Button variant='ghost' size='sm' className='text-red-500 hover:text-red-600 hover:bg-red-50 p-0 h-8 w-8'>
            <ArrowLeft className='w-4 h-4' />
          </Button>
        </Link>
        <h1 className='text-[17px] font-medium ml-2 text-gray-800'>Xem mẫu bất động sản</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className='bg-white rounded-md border border-red-100 overflow-hidden mb-6'
      >
        <div className='relative h-48 bg-gray-100'>
          <img
            src={sampleProperty.images[0].image_url}
            alt={sampleProperty.title}
            className='object-contain  w-full h-full  '
          />
          <div className='absolute top-2 right-2 bg-red-500 text-white text-[13px] px-2 py-1 rounded-sm'>
            {sampleProperty.propertyType[0].listingType.listingType}
          </div>
        </div>

        <div className='p-4'>
          <h2 className='text-[16px]  font-medium text-gray-800 mb-2'>{sampleProperty.title}</h2>

          <div className='flex items-center text-[13px] text-gray-500 mb-3'>
            <MapPin className='w-3 h-3 text-red-400 mr-1' />
            <span>{sampleProperty.address}</span>
          </div>

          <div className='flex justify-between mb-4'>
            <div className='text-red-500 font-medium text-[16px] '>
              {formatPrice(sampleProperty.price)}{' '}
              <span className='text-[13px] font-normal'>{sampleProperty.priceUnit}</span>
            </div>
            <div className='text-[13px] text-gray-500 flex items-center'>
              <Square className='w-3 h-3 mr-1' />
              {sampleProperty.squareMeters} m²
            </div>
          </div>

          <div className='grid grid-cols-4 gap-2 mb-4'>
            <div className='bg-red-50 rounded-sm p-2 flex flex-col items-center'>
              <Bed className='w-4 h-4 text-red-400 mb-1' />
              <span className='text-[13px] text-gray-600'>{sampleProperty.bedroom} P.Ngủ</span>
            </div>
            <div className='bg-red-50 rounded-sm p-2 flex flex-col items-center'>
              <Bath className='w-4 h-4 text-red-400 mb-1' />
              <span className='text-[13px] text-gray-600'>{sampleProperty.bathroom} P.Tắm</span>
            </div>
            <div className='bg-red-50 rounded-sm p-2 flex flex-col items-center'>
              <Home className='w-4 h-4 text-red-400 mb-1' />
              <span className='text-[13px] text-gray-600'>{sampleProperty.floor} Tầng</span>
            </div>
            <div className='bg-red-50 rounded-sm p-2 flex flex-col items-center'>
              <Compass className='w-4 h-4 text-red-400 mb-1' />
              <span className='text-[13px] text-gray-600'>{sampleProperty.direction}</span>
            </div>
          </div>

          <div
            className='text-[13px] text-gray-600 mb-4'
            dangerouslySetInnerHTML={{ __html: sampleProperty.description }}
          ></div>

          <div className='flex flex-wrap gap-2 mb-4'>
            <div className='bg-red-100 text-red-600 text-[13px] px-2 py-1 rounded-sm flex items-center'>
              <Tag className='w-2.5 h-2.5 mr-1' />
              {sampleProperty.propertyType[0].name}
            </div>
            {sampleProperty.isFurniture && (
              <div className='bg-red-100 text-red-600 text-[13px] px-2 py-1 rounded-sm flex items-center'>
                <Tag className='w-2.5 h-2.5 mr-1' />
                Đầy đủ nội thất
              </div>
            )}
          </div>

          <div className='border-t border-gray-100 pt-3 flex justify-between items-center'>
            <div className='text-[13px] text-gray-500 flex items-center'>
              <Calendar className='w-3 h-3 mr-1' />
              Đăng ngày: {formatDate(sampleProperty.createdAt)}
            </div>
            <Button size='sm' className='bg-red-500 hover:bg-red-600 text-[13px] h-7 px-3'>
              Liên hệ ngay
            </Button>
          </div>
        </div>
      </motion.div>

      <div className='bg-white rounded-md border border-red-100 p-4 mb-6'>
        <h3 className='text-xs font-medium text-gray-800 mb-2'>Mẫu hiển thị</h3>
        <p className='text-[13px] text-gray-600 mb-3'>
          Đây là mẫu hiển thị bất động sản trên hệ thống. Khi bạn tạo bất động sản mới, thông tin sẽ được hiển thị tương
          tự như mẫu này.
        </p>
        <div className='flex space-x-2'>
          <Button size='sm' variant='outline' className='text-[13px] border-red-200 text-red-500 hover:bg-red-50'>
            Xem thêm mẫu
          </Button>
          <Button size='sm' className='bg-red-500 hover:bg-red-600 text-[13px]'>
            <Plus className='w-3 h-3 mr-1' /> Tạo mới
          </Button>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <Link to='/huong-dan'>
          <Button variant='ghost' size='sm' className='text-red-500 hover:text-red-600 hover:bg-red-50 text-[14px]'>
            <ArrowLeft className='w-3 h-3 mr-1' /> Xem hướng dẫn
          </Button>
        </Link>
        <Link to='/'>
          <Button variant='ghost' size='sm' className='text-red-500 hover:text-red-600 hover:bg-red-50 text-[14px]'>
            Quay lại trang chủ <ArrowRight className='w-3 h-3 ml-1' />
          </Button>
        </Link>
      </div>
    </div>
  );
}
