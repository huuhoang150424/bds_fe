import { useState } from 'react';

import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import NewsForm from '../components/news-form';

export default function CreateNews() {
  useScrollToTopOnMount();

  return (
    <div className=''>
      <div className='mb-6'>
        <h1 className='text-2xl font-[600] text-gray-700  tracking-tight'>Tạo mới tin tức</h1>
        <p className='text-muted-foreground text-xs'>Tạo mới tin tức để người dùng xem mỗi ngày</p>
      </div>
      <NewsForm />
    </div>
  );
}
