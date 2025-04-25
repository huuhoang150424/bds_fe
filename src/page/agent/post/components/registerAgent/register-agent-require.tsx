import AgentRegistrationModal from './agent-registration-modal';
import { BadgeCheck, Home, TrendingUp, Users, Briefcase, Award } from 'lucide-react';
import FeatureCard from './feature-card';
import AnimatedBackground from './animated-background';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';

export default function RegisterAgentRequire() {
  useScrollToTopOnMount();

  
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-orange-50 relative overflow-hidden'>
      <AnimatedBackground />

      <div className='w-full max-w-4xl mx-auto text-center mb-8 relative z-10'>
        <h1 className='text-2xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent'>
          Trở thành Môi giới Bất động sản
        </h1>
        <p className='text-gray-600 max-w-xl mx-auto'>
          Đăng ký làm môi giới và bắt đầu kinh doanh bất động sản ngay hôm nay. Chúng tôi cung cấp nền tảng hiện đại
          giúp bạn kết nối với khách hàng tiềm năng và phát triển sự nghiệp.
        </p>
        <img
          src='https://i.pinimg.com/originals/ec/d3/b6/ecd3b6b355ab6f67c9679c42f585d817.gif'
          alt=''
          className='object-cover mx-auto w-[400px] h-[300px] mb-[20px] '
        
        />

        <div className='mb-8'>
          <AgentRegistrationModal />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'>
          <FeatureCard
            icon={<TrendingUp size={24} />}
            title='Tăng thu nhập'
            description='Tiếp cận hàng ngàn khách hàng tiềm năng và tăng cơ hội giao dịch thành công.'
            delay={0.1}
          />
          <FeatureCard
            icon={<Home size={24} />}
            title='Đa dạng BĐS'
            description='Tiếp cận nhiều loại bất động sản từ căn hộ, nhà phố đến đất nền, biệt thự.'
            delay={0.3}
          />
          <FeatureCard
            icon={<Users size={24} />}
            title='Mạng lưới rộng lớn'
            description='Kết nối với cộng đồng môi giới chuyên nghiệp và mở rộng mạng lưới kinh doanh.'
            delay={0.5}
          />
        </div>

        <div className='mt-16 bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-bl-full -z-0'></div>

          <h2 className='text-2xl font-bold mb-6 relative z-10'>Lợi ích khi trở thành Môi giới</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10'>
            <div className='flex items-start'>
              <BadgeCheck className='text-orange-500 mr-3 mt-1 flex-shrink-0' />
              <div>
                <h3 className='font-semibold mb-1'>Công cụ chuyên nghiệp</h3>
                <p className='text-sm text-gray-600'>
                  Tiếp cận các công cụ hiện đại để quản lý danh sách bất động sản và khách hàng.
                </p>
              </div>
            </div>

            <div className='flex items-start'>
              <Briefcase className='text-orange-500 mr-3 mt-1 flex-shrink-0' />
              <div>
                <h3 className='font-semibold mb-1'>Hỗ trợ pháp lý</h3>
                <p className='text-sm text-gray-600'>
                  Được tư vấn về các vấn đề pháp lý liên quan đến giao dịch bất động sản.
                </p>
              </div>
            </div>

            <div className='flex items-start'>
              <Award className='text-orange-500 mr-3 mt-1 flex-shrink-0' />
              <div>
                <h3 className='font-semibold mb-1'>Chứng nhận uy tín</h3>
                <p className='text-sm text-gray-600'>
                  Nhận chứng nhận môi giới chính thức, tăng độ tin cậy với khách hàng.
                </p>
              </div>
            </div>

            <div className='flex items-start'>
              <TrendingUp className='text-orange-500 mr-3 mt-1 flex-shrink-0' />
              <div>
                <h3 className='font-semibold mb-1'>Phát triển sự nghiệp</h3>
                <p className='text-sm text-gray-600'>
                  Cơ hội đào tạo và phát triển kỹ năng chuyên môn trong lĩnh vực bất động sản.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
