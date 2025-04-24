import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PropertyTable } from './property-table';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { useGetMyPosts } from '../hooks/use-get-myposts';
import { Loading } from '@/components/common';
import EmptyState from './instructPost/empty-state';

export function DraftPostsPage() {
  useScrollToTopOnMount();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetMyPosts('PostDraft', page, 10);
  const handlePageChange = (newPage: number) => {
    window.scrollTo(0, 0);
    setPage(newPage);
  };
  return (
    <div className='max-w-[1280px] '>
      {data?.data?.data?.length === 0 ? (
        <EmptyState type='PostDraft'/>
      ) : ( 
        <div className=' mx-auto py-6 overflow-hidden px-[20px] '>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-xl font-[600] text-gray-700 '>Danh sách bất động sản</h1>
            <div className='relative w-64'>
              <Search className='absolute left-2 top-3 h-4 w-4 text-muted-foreground' />
              <Input placeholder='Tìm kiếm...' className='pl-8 outline-none py-[8px] rounded-[8px] ' />
            </div>
          </div>
          {isLoading ? (
            <Loading className='mt-[200px] ' />
          ) : (
            <PropertyTable data={data} onPageChange={handlePageChange} typeListPost='PostDraft' />
          )}
        </div>
      )}
    </div>
  );
}
