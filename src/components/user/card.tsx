import { Card, CardContent } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Link } from 'react-router-dom'
import { AiOutlinePicture } from 'react-icons/ai';
import { IoLocationOutline } from 'react-icons/io5';
import { CiHeart } from 'react-icons/ci';
import { formatRelativeTime } from '@/lib/convert-date';

export default function CardItem({post}: {post:any}) {
  return (
    <Link key={`${post?.id}-index`} to={`/post/${post?.slug}`}>
    <Card className='rounded-[8px] overflow-hidden border border-gray-200 '>
      <CardContent className='p-0 pb-[10px] relative h-[350px]   '>
        <div className='overflow-hidden w-full'>
          <img
            src={post?.images[0]?.image_url}
            alt='Placeholder Image'
            className='rounded-t-[5px] h-[150px] w-full'
          />
        </div>
        <div className='flex'>
          <AiOutlinePicture className='text-[#fff] absolute top-[100px] right-[30px] text-[24px]' />
          <p className='text-[#fff] absolute top-[100px] right-[15px] text-[16px]'>{post?.images?.length}</p>
        </div>
        <div className='px-[15px]'>
          <div className=''>
            <span className='font-[700] text-[#2C2C2C] text-sm mt-[10px]'>{post?.title}</span>
          </div>
          <div className=' flex'>
            <div className='text-[#E03C31] mr-[30px] font-[500]'>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(post?.price)}
            </div>
            <div className='text-[#E03C31] font-[500] text-[15px] '>
              <span>{post?.squareMeters} m²</span>
            </div>
          </div>
          <div className='flex justify-start items-center mt-[5px]'>
            <IoLocationOutline />
            <span className='text-sm ml-[5px] font-[0]'>{post?.address}</span>
          </div>
          <div className='flex justify-between items-center mt-[10px]'>
            <span className='text-[14px] text-gray-400'>{formatRelativeTime(post?.createdAt)}</span>
            <HoverCard>
              <HoverCardTrigger asChild>
                <button className='border p-[5px] rounded-[5px]'>
                  <CiHeart className='font-bold text-[18px]' />
                </button>
              </HoverCardTrigger>
              <HoverCardContent>Bấm để lưu tin</HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
  )
}
