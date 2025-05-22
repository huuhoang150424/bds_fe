import { Link } from 'react-router-dom';
import PropertyCard from './property-card';
import { useState } from 'react';
import { Pagination } from '@/components/user/pagination';
import { Loading } from '@/components/common';
import FilterSidebar from './filter-sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { convertDate } from '@/lib/convert-date';

export default function PropertyListings({
  showMap,
  data,
  isLoading,
  onPageChange,
  currentPage,
}: {
  showMap: boolean;
  data?: any;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  currentPage: number;
}) {
  const [page, setPage] = useState(currentPage);
  
  const handleChangePage = (newPage: number) => {
    onPageChange(newPage);
    setPage(newPage);
    window.scrollTo(0, 0);
  };
  return (
    <div className="w-full mb-[50px] overflow-y-auto px-[20px] " style={{ maxHeight: showMap ? 'calc(100vh - 160px)' : 'auto' }}>
      <div className='mb-[30px]'></div>

      <div className='grid grid-cols-12 gap-4'>
        {!showMap && (
          <div className='col-span-3'>
            <FilterSidebar />
          </div>
        )}
        <div className={`${showMap ? 'col-span-12' : 'col-span-9'}`}>
          {isLoading ? (
            <Loading className='mx-auto my-[300px]' />
          ) : (
            <div className=''>
              <div className='flex flex-wrap items-center justify-between gap-4'>
                <div className='flex flex-col'>
                  <div className='bg-red-50 w-full md:w-[50%] p-3 rounded-lg mb-4 flex items-center gap-2'>
                    <img
                      src='https://i.pinimg.com/originals/fc/3e/4f/fc3e4f219110231f1942b213c3c2eea2.gif'
                      className='w-[30px] h-[30px]'
                      alt="notification"
                    />
                    <span className='text-[14px] font-medium'>Có {data?.data?.total} kết quả trả về.</span>
                  </div>
                  <h1 className='text-[18px] font-[500] text-gray-800 mb-2'>
                    Mua Bán Nhà Đất Hồ Chí Minh Giá Rẻ Mới Nhất {convertDate(new Date().toDateString())}
                  </h1>
                  <p className='text-gray-600 mb-6'>Hiện có 60.605 bất động sản.</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' className='ml-auto text-gray-600'>
                      Thời gian <ChevronDown className='ml-2 h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>7 ngày</DropdownMenuItem>
                      <DropdownMenuItem>1 tháng</DropdownMenuItem>
                      <DropdownMenuItem>3 tháng</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {data?.data?.posts?.length === 0 ? (
                <div className='w-full flex flex-col items-center justify-center pt-[50px] pb-[200px]'>
                  <h1 className='text-[17px] text-gray-700 font-[500]'>Không có kết quả tìm kiếm </h1>
                  <img src='https://i.gifer.com/embedded/download/4jJm.gif' alt='no results' className='w-[300px] h-[300px]' />
                </div>
              ) : (
                <div className=''>
                  <div className='flex flex-col gap-5'>
                    {data?.data?.posts?.map((post: any) => (
                      <Link key={post?.id} to={`/post/${post?.slug}`}>
                        <PropertyCard {...post} />
                      </Link>
                    ))}
                  </div>
                  <Pagination
                    currentPage={page}
                    totalPages={data?.data?.totalPages || 1}
                    onPageChange={handleChangePage}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}