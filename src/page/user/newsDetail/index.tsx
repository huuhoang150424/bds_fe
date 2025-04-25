
import { Clock } from 'lucide-react';

import { useGetNewsDetail } from './hooks/use-get-new-detail';
import { useParams } from 'react-router-dom';
import NewsPopular from '../news/components/news-popular';




function NewsArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useGetNewsDetail(slug || '');
  if (!data) return <div>Article not found</div>;

  const formattedDate = new Date(data?.updatedAt).toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className='flex flex-col max-w-6xl bg-white mx-auto'>

      <div className='px-4 py-4'>
        <h1 className='text-2xl md:text-3xl font-bold mb-4'>{data?.title}</h1>

        <div className='flex items-center mb-6'>
          <div className='flex items-center text-red-500 mr-4'>
            <div className='w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2'>
              <Clock className='h-4 w-4 text-red-500' />
            </div>
            <p className='text-xs text-gray-600'>
              Cập nhật lần cuối vào {formattedDate}
            </p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-12 gap-7 px-4 pb-6'>
        <div className='col-span-8'>
          <div 
            className='prose max-w-none' 
            dangerouslySetInnerHTML={{ __html: data?.content || '' }} 
          />
        </div>

        <div className='col-span-4'>
          <NewsPopular />
        </div>
      </div>
    </div>
  );
}

export default NewsArticle;
