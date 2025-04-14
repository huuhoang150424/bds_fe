import { Link } from 'react-router-dom';
import PropertyCard from './property-card';
import { useGetListPosts } from '../hooks/use-get-list-post';
import { useState } from 'react';
import { Pagination } from '@/components/user/pagination';
import { Loading } from '@/components/common';
import FilterSidebar from './filter-sidebar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PropertyListings({ showMap }: { showMap: boolean }) {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetListPosts(5, page);
  const handleChangePage = () => {};

  return (
    <div className=' w-full mb-[50px] '>
      <div className=' mb-[30px]'></div>

      <div className='grid grid-cols-12 gap-4'>
        {!showMap && (
          <div className='col-span-3'>
            <FilterSidebar />
          </div>
        )}
        <div className={`${showMap ? 'col-span-12 pl-[14px] overflow-y-auto ' : 'col-span-9'} `}>
          {isLoading ? (
            <Loading className='mx-auto my-[300px] ' />
          ) : (
            <div className=''>
                <div className='bg-red-50 w-[50%] p-3 rounded-lg mb-4 flex items-center gap-2'>
                  <img
                    src='https://i.pinimg.com/originals/fc/3e/4f/fc3e4f219110231f1942b213c3c2eea2.gif'
                    className='w-[30px] h-[30px] '
                  />
                  <span className='text-[14px] font-medium'>Có 1.356.416 lượt xem khu vực này trong 7 ngày vừa qua.</span>
                </div>
                <h1 className='text-xl font-[500]  text-gray-800 mb-2'>
                  Mua Bán Nhà Đất Hồ Chí Minh Giá Rẻ Mới Nhất T4/2025
                </h1>
                <p className='text-gray-600 mb-6'>Hiện có 60.605 bất động sản.</p>
              <div className='flex flex-wrap items-center justify-between gap-4 mb-4'>
                <Tabs defaultValue='cheapest' className='w-auto'>
                  <TabsList className='h-10'>
                    <TabsTrigger value='cheapest' className='px-6'>
                      Rẻ nhất
                    </TabsTrigger>
                    <TabsTrigger value='best' className='px-6'>
                      Vừa giá
                    </TabsTrigger>
                    <TabsTrigger value='quickest' className='px-6'>
                      Đắt nhất
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' className='ml-auto'>
                      Theo ngày <ChevronDown className='ml-2 h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Morning</DropdownMenuItem>
                      <DropdownMenuItem>Afternoon</DropdownMenuItem>
                      <DropdownMenuItem>Evening</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-col gap-5">
                {data?.posts?.map((post: any) => (
                  <Link key={post?.id} to={`/post/${post?.slug}`}>
                    <PropertyCard {...post} />
                  </Link>
                ))}
              </div>
              <Pagination currentPage={1} totalPages={100} onPageChange={handleChangePage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
