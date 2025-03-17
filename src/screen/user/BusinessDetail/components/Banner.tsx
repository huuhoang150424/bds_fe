import { CustomImage } from '@/components/common';
import { realEstateCompanies } from '@/constant/constBusinessDetail';

const Banner = () => {
  return (
    <div className="relative h-[350px] bg-gradient-to-r  bg-[url('https://th.bing.com/th/id/R.8ebe95e12c829f4a31c26c6cc587c77d?rik=%2fGT3qHOaunsgAg&pid=ImgRaw&r=0')] bg-cover bg-center bg-blend-overlay">
      <div className='absolute bottom-[30px] left-0 w-full'>
        <div className='container max-w-6xl mx-auto flex items-end'>
          <div className='bg-white p-3 rounded-xl shadow-lg mr-6 transform hover:scale-105 transition-transform duration-300'>
            <CustomImage
              src={realEstateCompanies.logo}
              alt='Company Logo'
              width={120}
              height={120}
              className='h-24 w-24 object-cover rounded-lg'
            />
          </div>
          <div className='text-white '>
            <h1 className='text-5xl font-bold mb-4 text-shadow'>{realEstateCompanies.name}</h1>
            <div className='flex space-x-12 text-lg'>
              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-3 transition-all hover:bg-white/20'>
                <div className='text-gray-100 font-medium'>Dự án đầu tư</div>
                <div className='font-bold text-2xl'>{realEstateCompanies.projecct_to_open}</div>
              </div>
              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-3 transition-all hover:bg-white/20'>
                <div className='text-gray-100 font-medium'>Đang mở bán</div>
                <div className='font-bold text-2xl'>{realEstateCompanies.open_for_sale}</div>
              </div>
              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-3 transition-all hover:bg-white/20'>
                <div className='text-gray-100 font-medium'>Đã bàn giao</div>
                <div className='font-bold text-2xl'>{realEstateCompanies.handle_over}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner; 