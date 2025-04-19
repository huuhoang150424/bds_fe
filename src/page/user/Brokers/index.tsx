import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Search } from 'lucide-react';
import { CustomImage } from '@/components/common';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import formSendEmail from '@/page/user/Brokers/schema';
import { z } from 'zod';
import { agents, recommendedProperties } from '@/constant/const-brokers';
import Infor from './components/infor';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';


export default function RealEstateAgentDirectory() {
  useScrollToTopOnMount();
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate the current page's data
  const indexOfLastAgent = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstAgent = indexOfLastAgent - ITEMS_PER_PAGE;
  const currentAgents = agents.slice(indexOfFirstAgent, indexOfLastAgent);
  const totalPages = Math.ceil(agents.length / ITEMS_PER_PAGE);

  function onSubmit(values: z.infer<typeof formSendEmail>) {
    console.log(values);
  }
  const form = useForm<z.infer<typeof formSendEmail>>({
    resolver: zodResolver(formSendEmail),
    defaultValues: {
      title: '',
      name: '',
      email: '',
      content: '',
    },
  });

  return (
    <div className='max-w-6xl mx-auto py-6'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex-1'>
          <h1 className='text-2xl font-bold text-red-600'>TÌM KIẾM NHANH CHÓNG</h1>
          <p className='text-sm text-gray-500'>Tìm kiếm môi giới viên</p>
        </div>
        <div className='flex space-x-2'>
          <div className='relative'>
            <Input placeholder='Tìm kiếm' className='pl-9 w-64' />
            <Search className='absolute left-3 top-2.5 h-4 w-4 text-gray-400' />
          </div>
          <Button className='bg-red-600 hover:bg-red-700'>Tìm kiếm</Button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div className='md:col-span-3 '>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-bold'>Danh bạ nhà môi giới</h2>
            <div className='flex items-center space-x-2'>
              <span className='text-sm text-gray-500'>Sắp xếp theo:</span>
              <Select defaultValue='newest'>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Sắp xếp theo' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='newest'>Mới nhất</SelectItem>
                  <SelectItem value='oldest'>Cũ nhất</SelectItem>
                  <SelectItem value='name'>Tên A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Infor />
        </div>

        <div className='md:col-span-1'>

          <div className='border rounded-md p-4'>
            <h3 className='font-bold text-center mb-4'>Dự án nổi bật</h3>
            <div className='space-y-4'>
              <div className='space-y-4'>
                <div className='flex flex-wrap gap-4'>
                  {recommendedProperties.slice(0, 4).map((item, index) => (
                    <div key={index} className='w-[240px] border rounded-md  p-[15px] shadow-sm hover:shadow-lg'>
                      <CustomImage
                        src={item.images[0]}
                        alt='Dự án nổi bật'
                        width={210}
                        height={120}
                        className='rounded-md w-full object-cover mb-2'
                      />
                      <h4 className='font-bold text-sm'>Vinhome Ocean Park</h4>
                      <p className='text-xs text-gray-500'>Gia Lâm, Hà Nội</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
