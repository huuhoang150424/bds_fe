import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React, { useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { useGetWishlist } from '../hooks/use-get-wishlist';
import { Card, CardContent } from '@/components/ui/card';
import { CustomImage } from '@/components/common';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDeleteWishlist } from '../hooks/use-delete-wishlist';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

function Wishlist() {
  const { data, isLoading, isError } = useGetWishlist();
  const { mutate: deleteWishlist } = useDeleteWishlist();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading wishlist.</div>;

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <CiHeart size={24} className=' mt-[5px]' />
        </PopoverTrigger>
        <PopoverContent className='z-[100] mt-[10px] w-[350px]'>
          <div>
            <span className='flex justify-center text-[16px] font-bold'>Tin đăng đã lưu</span>
            <div className='w-full border border-gray-100 my-[15px]'></div>
            <ScrollArea className='h-[300px] w-full'>
              {data?.map(
                (item: { post: { images: { imageUrl: string }[]; title: string; id: string, slug:string }; postId: string }) => (
                  <Link to={`/post/${item?.post?.slug}`} key={item?.post?.id}>
                    <Card
                      key={item?.post?.id}
                      className='mb-2 border-b-[1px] relative hover:bg-gray-200 pl-[5px] mr-[15px] rounded-[5px]'
                      onMouseEnter={() => {
                        setHoveredId(item?.post?.id);
                        console.log(item?.post?.id);
                      }}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <CardContent className='flex items-center gap-2 p-[5px] relative'>
                        <CustomImage
                          src={item?.post?.images[0]?.imageUrl}
                          alt='image'
                          className='object-cover rounded-lg'
                          width={80}
                          height={50}
                        />
                        <div className='flex flex-col gap-2'>
                          <h3 className='text-[16px] font-[500]'>{item?.post?.title}</h3>
                        </div>
                        {hoveredId === item?.post?.id && (
                          <button
                            className='absolute right-2 top-1 text-red-500 hover:text-red-700'
                            onClick={() => deleteWishlist(item?.post?.id)}
                          >
                            <X className='h-4 w-4' />
                          </button>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ),
              )}
            </ScrollArea>
            <div className='flex items-center gap-1 justify-center'>
              bấm <CiHeart /> để lưu tin
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default Wishlist;
