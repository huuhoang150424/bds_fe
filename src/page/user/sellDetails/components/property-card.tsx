import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card';
import { IoLocationOutline } from 'react-icons/io5';
import { IoBedOutline } from 'react-icons/io5';
import { PiBathtubLight } from 'react-icons/pi';
import { LuExpand } from 'react-icons/lu';
import { TbPhoneRinging } from 'react-icons/tb';
import { CiHeart } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { CiMoneyCheck1 } from 'react-icons/ci';
interface Tag {
  tagName: string;
}

interface TagPost {
  id: string;
  tag: Tag;
}

interface User {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  avatar: string;
}
interface Image {
  image_url: string;
}

interface Post {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  title: string;
  priceUnit: string;
  address: string;
  price: number;
  squareMeters: number;
  description: string;
  floor: number;
  bedroom: number;
  bathroom: number;
  priority: number;
  isFurniture: boolean;
  direction: string;
  verified: boolean;
  expiredDate: string;
  status: string;
  slug: string;
  images: Image[];
  user : User;
}
export default function PropertyCard(post: Post) {
  console.log('post', post);
  console.log('post.user', post.user);
  return (
    <Card className='overflow-hidden hover:shadow-lg transition-shadow border rounded-[5px] shadow-sm'>
      <CardContent className='p-6'>
        <div className='grid grid-cols-5 grid-rows-2 gap-2 h-[250px]'>
          <div className='col-span-3 row-span-2 relative rounded-l-lg overflow-hidden'>
            <img
              src={post.images[0]?.image_url || '/placeholder.svg'}
              alt={post.title}
              className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
            />
          </div>

          <div className='col-span-2 col-start-4 relative overflow-hidden'>
            <img
              src={post.images[0]?.image_url || post.images[0]?.image_url}
              alt={post.title}
              className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
            />
          </div>

          <div className='col-start-4 row-start-2 relative overflow-hidden'>
            <img
              src={post.images[0]?.image_url}
              alt={post.title}
              className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
            />
          </div>

          <div className='col-start-5 row-start-2 relative overflow-hidden rounded-br-lg'>
            <img
              src={post.images[0]?.image_url}
              alt={post.title}
              className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
            />
            {post.images.length > 4 && (
              <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                <span className='text-white text-lg font-medium'>+{post.images.length - 4}</span>
              </div>
            )}
          </div>
        </div>

        <div className='mt-4 space-y-2'>
          <h3 className='text-2xl font-semibold hover:text-[#E03C31] cursor-pointer transition-colors'>{post.title}</h3>
          <div className='flex items-center gap-2 text-gray-600'>
            <IoLocationOutline className='h-5 w-5' />
            <span className='text-lg'>{post.address}</span>
          </div>
          <div className='flex items-center justify-start gap-4'>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-4 text-[16px] font-[500]'>
                <CiMoneyCheck1 className='text-[24px]  font-[500]' />
                
              </div>
              <span className='text-[#E03C31] font-[500] text-lg'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(post.price)}</span>
              {/* <span className='text-[#E03C31] font-semibold text-lg'>{listing.details.price}</span> */}
              <span className='flex items-center gap-2 text-gray-600'>
                <LuExpand />
                <span className='text-[#E03C31] font-[500] text-lg'>{post.squareMeters} m²</span>
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='flex items-center gap-1 text-gray-600'>
                <IoBedOutline className='h-5 w-5' />
                <span>{post.bedroom}</span>
              </span>
              <span className='flex items-center gap-1 text-gray-600'>
                <PiBathtubLight className='h-5 w-5' />
                <span>{post.bathroom}</span>
              </span>
            </div>
          </div>
        </div>

        {/* <div className='infor mt-[15px] flex items-center gap-2 justify-between'>
          <Link to={''}>
          <div className='flex items-center gap-2'>
            <div className='image__poster'>
              <Avatar>
                <AvatarImage src={post.user.avatar} alt="avt" />
                <AvatarFallback>{post.user.fullname.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className='poster__detail'>
              <p className='text-[10px] font-[600]'>{listing.poster.name}</p>
            </div>
          </div>
          </Link>
          <div className='flex items-center gap-4'>
            <button
              className='flex items-center gap-2 bg-[#E03C31] text-white px-4 py-2 rounded-lg hover:bg-[#d02e23] transition-colors'
              onClick={(e) => e.stopPropagation()} // Chặn sự kiện click lan truyền lên Link
            >
              <TbPhoneRinging className='text-xl' />
              <span>{post.user.phone}</span>
            </button>

            <HoverCard>
              <HoverCardTrigger asChild>
                <button
                  className='p-2 border border-gray-200 rounded-lg hover:border-[#E03C31] hover:text-[#E03C31] transition-colors'
                  onClick={(e) => e.stopPropagation()} // Chặn sự kiện click lan truyền lên Link
                >
                  <CiHeart className='text-xl' />
                </button>
              </HoverCardTrigger>
              <HoverCardContent className='w-fit p-3 bg-white rounded-lg shadow-lg border border-gray-200'>
                <div className='text-sm text-gray-600'>Bấm để lưu tin</div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}
