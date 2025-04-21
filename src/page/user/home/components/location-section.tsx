import type { CityInfo } from '@/constant/const-home';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, MapPin, Building, ChevronRight, Star, ArrowRight } from 'lucide-react';
const projectTags = [
  'Vinhomes Central Park',
  'Vinhomes Grand Park',
  'Vinhomes Smart City',
  'Vinhomes Ocean Park',
  'Vũng Tàu Pearl',
  'Bcons Green View',
  'Grandeur Palace',
];
export default function LocationSection() {
  const getPostCountByCity = () => {
    const cityCounts: { [key: string]: number } = {};
    return cityCounts;
  };
  const cityInfos: CityInfo[] = [
    {
      name: 'TP. Hồ Chí Minh',
      count: 63542,
      image: 'https://file4.batdongsan.com.vn/images/newhome/cities/HCM-web-1.jpg',
    },
    {
      name: 'Hà Nội',
      count: getPostCountByCity()['Hà Nội'] || 0,
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

  return (
    <div className='max-w-6xl mx-auto py-[60px]'>
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
              ${index === 4 ? 'col-span-2 row-span-2 col-start-6 row-start-3' : ''}`}
          >
            <img
              src={city.image || '/placeholder.svg'}
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
      <div className='mt-[40px] '>
        <h3 className='text-xl font-[600] mb-4 text-gray-700 '>Dự án nổi bật tại Hà Nội</h3>
        <div className='flex flex-wrap gap-3'>
          {projectTags.map((tag, index) => (
            <motion.div
              key={tag}
              className='perspective-500'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <motion.button
                className='  px-4 py-2 rounded-lg text-gray-300  border border-gray-200 hover:border-red-500/30 transition-all duration-300 shadow-lg'
                whileHover={{
                  rotateX: 10,
                  rotateY: -10,
                  scale: 1.05,
                  boxShadow: '0 20px 25px -5px rgba(245, 158, 11, 0.1), 0 10px 10px -5px rgba(245, 158, 11, 0.04)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className='text-[14px] text-gray-600 '>{tag}</span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        className='relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-amber-700 p-8 md:p-12 mt-[30px] '
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className='absolute -right-10 -top-10 h-64 w-64 rounded-full bg-amber-600/30 blur-3xl' />
        <div className='absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl' />

        <div className='relative z-10 flex flex-col md:flex-row justify-between items-center gap-6'>
          <div>
            <h3 className='text-2xl md:text-3xl font-bold text-white mb-2'>Bạn muốn đăng tin bất động sản?</h3>
            <p className='text-amber-100 max-w-xl'>
              Tiếp cận hàng triệu người mua và nhà đầu tư tiềm năng với dịch vụ đăng tin bất động sản của chúng tôi
            </p>
          </div>
          <motion.button
            className='bg-black text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 whitespace-nowrap'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Đăng tin ngay
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
