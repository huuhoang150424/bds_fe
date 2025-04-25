import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Edit, Eye, ImageIcon, FileText, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

export default function Guideline() {
  const navigate=useNavigate();
  const steps = [
    {
      title: 'Tạo bất động sản mới',
      icon: <Plus className='w-3 h-3' />,
      description: "Nhấn vào nút 'Thêm bất động sản' để bắt đầu tạo mới.",
      tips: 'Chuẩn bị sẵn thông tin và hình ảnh để quá trình tạo mới nhanh chóng hơn.',
    },
    {
      title: 'Nhập thông tin cơ bản',
      icon: <Edit className='w-3 h-3' />,
      description: 'Điền các thông tin như tiêu đề, giá, diện tích, địa chỉ...',
      tips: 'Tiêu đề nên ngắn gọn, súc tích và chứa từ khóa quan trọng.',
    },
    {
      title: 'Thêm hình ảnh',
      icon: <ImageIcon className='w-3 h-3' />,
      description: 'Tải lên các hình ảnh chất lượng cao của bất động sản.',
      tips: 'Hình ảnh rõ nét, đủ sáng sẽ thu hút người xem tốt hơn.',
    },
    {
      title: 'Viết mô tả chi tiết',
      icon: <FileText className='w-3 h-3' />,
      description: 'Mô tả đầy đủ về bất động sản, tiện ích và môi trường xung quanh.',
      tips: 'Nêu bật các điểm nổi bật và lợi thế cạnh tranh của bất động sản.',
    },
    {
      title: 'Xem trước và đăng tin',
      icon: <Eye className='w-3 h-3' />,
      description: 'Kiểm tra lại thông tin và đăng tin lên hệ thống.',
      tips: 'Kiểm tra kỹ lỗi chính tả và thông tin sai sót trước khi đăng.',
    },
  ];

  return (
    <div className='max-w-[1240px] mx-auto py-4 px-4'>
      <div className='flex items-center mb-6'>
        <Link to='/agent/manage-post'>
          <Button variant='ghost' size='sm' className='text-red-500 hover:text-red-600 hover:bg-red-50 p-0 h-8 w-8'>
            <ArrowLeft className='w-4 h-4' />
          </Button>
        </Link>
        <h1 className='text-[16px] font-medium ml-2 text-gray-800'>Hướng dẫn sử dụng</h1>
      </div>

      <div className='bg-white rounded-md border border-red-100 p-4 mb-6'>
        <div className='flex items-start'>
          <div className='bg-red-100 rounded-full p-1.5 mr-3 mt-0.5'>
            <Info className='w-3 h-3 text-red-500' />
          </div>
          <div>
            <h2 className='text-[14px] font-medium text-red-600 mb-1'>Lưu ý quan trọng</h2>
            <p className='text-[14px] text-gray-600'>
              Để tối ưu hiệu quả, bạn nên cập nhật thông tin bất động sản thường xuyên và đầy đủ. Hệ thống sẽ ưu tiên
              hiển thị các tin đăng có thông tin chi tiết và hình ảnh chất lượng.
            </p>
          </div>
        </div>
      </div>

      <div className='space-y-4 mb-8'>
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className='bg-white rounded-md border border-red-100 p-4 hover:border-red-300 hover:shadow-sm transition-all'
          >
            <div className='flex'>
              <div className='bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-medium mr-3 mt-0.5 flex-shrink-0'>
                {index + 1}
              </div>
              <div>
                <div className='flex items-center'>
                  <span className='mr-1.5'>{step.icon}</span>
                  <h3 className='text-xs font-medium text-gray-800'>{step.title}</h3>
                </div>
                <p className='text-[14px] text-gray-600 mt-1.5 mb-2'>{step.description}</p>
                <div className='bg-red-50 rounded-sm p-2 border-l-2 border-red-400'>
                  <p className='text-[13px] text-gray-600 flex items-start'>
                    <AlertCircle className='w-3 h-3 text-red-400 mr-1.5 mt-0.5 flex-shrink-0' />
                    <span>{step.tips}</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className='bg-gradient-to-r from-red-500 to-red-600 rounded-md p-4 text-white'>
        <h3 className='text-[14px] font-medium mb-2'>Bạn đã sẵn sàng?</h3>
        <p className='text-[12px] mb-3 text-white/90'>Hãy bắt đầu tạo bất động sản đầu tiên của bạn ngay bây giờ.</p>
        <Button
          onClick={()=>navigate('/agent/create-post')}
          size='sm'
          variant='outline'
          className='bg-white/10 hover:bg-white/20 text-white border-white/30 text-[12x]'
        >
          <Plus className='w-3 h-3 mr-1' /> Thêm bất động sản
        </Button>
      </div>

      <div className='mt-6 text-center'>
        <p className='text-[12px] text-gray-500'>
          Cần thêm trợ giúp?{' '}
          <Link to='/ho-tro' className='text-red-500 hover:underline'>
            Liên hệ hỗ trợ
          </Link>
        </p>
      </div>
    </div>
  );
}
