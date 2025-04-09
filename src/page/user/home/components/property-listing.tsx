import { useState } from 'react';
import { useGetPostsPrioritys } from '@/page/user/home/hook/use-get-post-priority';
import { Link } from 'react-router-dom';
import CardItem from '@/components/user/card';

export default function PropertyListings() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetPostsPrioritys(8, page);

  return (
    <div className='bg-gray-100 w-full px-[60px] pt-[30px] pb-[60px]'>
      <div className='content mx-auto max-w-6xl px-[60px]'>
        <div className='title flex justify-between items-center pb-[20px]'>
          <h1 className='text-[18px] font-[500] text-gray-800 '>Bất Dành cho bạn</h1>
          <div className='flex'>
            <div className='block pr-[10px] border border-r-[1px border-r-gray-500 text-[12px]'>
              <span>
                <Link to='#'>Tin nhà đất mới</Link>
              </span>
            </div>
            <div className='block border border-r-[1px] text-[12px] ml-[10px]'>
              <span>
                <Link to='#'>Tin nhà đất cho thuê mới</Link>
              </span>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px]'>
          {data?.posts?.map((post: any) => (
            <CardItem post={post} key={post?.id}/>
          ))}
        </div>
      </div>
    </div>
  );
}
