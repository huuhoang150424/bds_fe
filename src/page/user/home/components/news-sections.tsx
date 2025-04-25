import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { newsByTab } from '@/constant/const-home';
import TabsUser from '@/components/user/tab';

interface NewsItem {
  title: string;
  time: string;
  img: string;
  description?: string;
}

interface NewsData {
  highlight: NewsItem[];
  news: NewsItem[];
  'bds-tphcm': NewsItem[];
  'bds-hanoi': NewsItem[];
}

export default function NewsSection() {
  const [activeNewsTab, setActiveNewsTab] = useState<keyof NewsData>('highlight');
  const [currentTab, setCurrentTab] = useState<number | string>(0);

  const tabs = [
    { id: 0, label: 'Tổng quan' },
    { id: 1, label: 'Tin tức' },
    { id: 2, label: 'Thế giới' },
  ];

  const handleTabChange = (id: number | string) => {
    setCurrentTab(id);
    console.log('Tab đang chọn:', id);
  };
  return (
    <div className='max-w-6xl mx-auto p-[60px]'>
      <TabsUser tabs={tabs} getIdTab={handleTabChange} />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Card className='col-span-1 md:col-span-2 border-none shadow-none'>
          <div className='relative h-48 rounded-lg overflow-hidden'>
            <img
              src={newsByTab[activeNewsTab][0].img || '/placeholder.svg'}
              alt={newsByTab[activeNewsTab][0].title}
              className='w-full h-full object-cover transition-transform hover:scale-105'
            />
          </div>
          <CardContent className='mt-2 px-0'>
            <h3 className='text-lg font-semibold hover:text-red-500 cursor-pointer transition-colors'>
              {newsByTab[activeNewsTab][0].title}
            </h3>
            <p className='text-gray-500 text-sm flex items-center mt-1'>⏳ {newsByTab[activeNewsTab][0].time}</p>
            {newsByTab[activeNewsTab][0].description && (
              <p className='text-gray-600 mt-2 text-sm line-clamp-2'>{newsByTab[activeNewsTab][0].description}</p>
            )}
          </CardContent>
        </Card>

        <div className='space-y-3'>
          {newsByTab[activeNewsTab].slice(1).map((item: NewsItem, index: number) => (
            <div
              key={index}
              className='border-b pb-2 last:border-none hover:bg-gray-50 transition-colors rounded p-2 cursor-pointer'
            >
              <h4 className='text-sm font-semibold hover:text-red-500 transition-colors'>{item.title}</h4>
              <p className='text-gray-500 text-xs flex items-center mt-1'>⏳ {item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
