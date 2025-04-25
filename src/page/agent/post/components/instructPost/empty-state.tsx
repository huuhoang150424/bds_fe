import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function EmptyState({type}: {type:string}) {

  return (
    <div className='flex flex-col items-center h-screen'>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className='text-center max-w-sm border border-red-200 rounded-lg py-6 px-10 bg-white shadow-sm mt-[80px] '
      >
        <div className='w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center'>
          <AlertCircle className='w-8 h-8 text-red-500' />
        </div>

        <h2 className='text-[18px] font-medium mb-2 text-red-600'>
          {
            type==='Post' ? 'Chưa có bất động sản':'Bạn chưa có bài đăng nháp'
          }
          
        </h2>

        <p className='text-[14px] text-gray-600 mb-5'>
          Bạn chưa có bất động sản nào trong danh sách. Hãy thêm mới để bắt đầu.
        </p>

        <motion.div whileHover={{ scale: 1.02 }} className='mb-4'>
          <Button size='sm' className='w-full bg-red-500 hover:bg-red-600 text-[14px] font-normal'>
            <Plus className='w-3 h-3 mr-1' /> Thêm bất động sản
          </Button>
        </motion.div>

        <div className='grid grid-cols-2 gap-2'>
          <Link to='/agent/guideline' className='w-full'>
            <Button
              variant='outline'
              size='sm'
              className='w-full text-[14px] font-normal border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600'
            >
              <FileText className='w-3 h-3 mr-1' /> Hướng dẫn
            </Button>
          </Link>
          <Link to='/agent/sample' className='w-full'>
            <Button
              variant='outline'
              size='sm'
              className='w-full text-[14px] font-normal border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600'
            >
              <FileText className='w-3 h-3 mr-1' /> Xem mẫu
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className='mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[640px] '>
        {[
          { title: 'Thêm nhanh', desc: 'Thêm bất động sản chỉ với vài bước đơn giản' },
          { title: 'Quản lý dễ dàng', desc: 'Theo dõi và cập nhật thông tin bất động sản' },
          { title: 'Báo cáo chi tiết', desc: 'Xem thống kê và báo cáo về danh mục của bạn' },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
            className='py-3 px-5  rounded-md bg-white border border-red-100 hover:border-red-300 cursor-pointer group'
          >
            <div className='flex items-start'>
              <div className='flex-1'>
                <h3 className='text-[15px] font-medium text-red-500'>{item.title}</h3>
                <p className='text-[13px] text-gray-500 mt-1'>{item.desc}</p>
              </div>
              <ArrowRight className='w-3 h-3 text-red-300 group-hover:text-red-500 transition-colors' />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className='mt-6  text-gray-400 text-[15px] '
      >
        Bạn cần trợ giúp?{' '}
        <Link to='/ho-tro' className='text-red-500 font-[500] hover:underline text-[15px] '>
          Liên hệ hỗ trợ
        </Link>
      </motion.div>
    </div>
  );
}
