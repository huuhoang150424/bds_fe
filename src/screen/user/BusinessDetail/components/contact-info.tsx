import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className='bg-white rounded-xl  p-6 sticky top-[80px]'>
      <h2 className='text-xl font-bold mb-4 text-gray-800'>Thông tin về dự án</h2>
      <p className='text-gray-600 mb-6'>
        Liên hệ với chúng tôi để có thêm thông tin chi tiết về dự án thuộc chủ đầu tư này
      </p>

      <Button className='w-full flex items-center justify-center mb-4 bg-[#E03C31] hover:bg-[#FF837A] transition-colors py-6 text-lg'>
        <Phone className='w-5 h-5 mr-3' />
        Gọi ngay cho chúng tôi
      </Button>

      <Button variant='outline' className='w-full flex items-center justify-center py-6 text-lg hover:bg-gray-50'>
        <Mail className='w-5 h-5 mr-3' />
        Gửi thông tin liên hệ
      </Button>
    </div>
  );
};

export default ContactInfo; 