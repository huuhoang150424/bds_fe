import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, MapPin, Clock, Link2 } from 'lucide-react';
import { CustomImage } from '@/components/common';
import { brokers } from '@/constant/constProfile';
import { MdPostAdd } from 'react-icons/md';
import { FaRegEye } from 'react-icons/fa';
import { CiCalendar } from 'react-icons/ci';
import { FiPhoneCall } from 'react-icons/fi';
import { SiZalo } from 'react-icons/si';
import { FaFacebook } from 'react-icons/fa';
import { GoLink } from 'react-icons/go';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { AiOutlinePicture } from 'react-icons/ai';
import { FaCheckCircle } from 'react-icons/fa';

export default function Profile() {
  const [active, setActive] = useState(false);
  const [typePost, setTypePost] = useState('forSale');
  const [visible, setVisible] = useState(6);
  const handleLoadMore = () => {
    setVisible((prev) => prev + 6);
  };
  return (
    <div className='max-w-6xl mx-auto pt-[80px]'>
      <main className='container mx-auto px-4 py-8'>
        <div className='grid md:grid-cols-[300px_1fr] gap-8'>
          {/* Profile Section */}
          <div className='space-y-6 h-[750px] border px-[10px] py-[15px] rounded-[10px] border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow'>
            <div className='text-center'>
              <Avatar className='w-32 h-32 mx-auto'>
                <AvatarImage src={brokers.avatar} alt='Agent' />
                <AvatarFallback>NK</AvatarFallback>
              </Avatar>
              <h2 className='mt-4 text-xl font-bold'>{brokers.name}</h2>
              {brokers.certified === true ? (
                <p className='text-sm text-muted-foreground'>Môi giới chuyên nghiệp</p>
              ) : null}
            </div>

            <div className='space-y-4'>
              <div className='flex flex-col gap-2 text-sm'>
                {brokers.certified === true ? (
                  <div className='flex items-center gap-2'>
                    <FaCheckCircle color='green'/>
                    <p className='text-sm'>Có chứng chỉ môi giới</p>
                  </div>
                ) : null}
                <div className='flex items-center gap-[6px]'>
                  <MdPostAdd />
                  <span>
                    <span className='text-sm font-[500]'>{brokers.postCount}</span> bài đăng{' '}
                  </span>
                </div>
                <div className='flex  items-center gap-[6px]'>
                  <FaRegEye />
                  <span>
                    <span className='text-sm font-[500]'>{brokers.viewPost}</span> lượt xem tin{' '}
                  </span>
                </div>
                <div className='flex  items-center gap-[6px]'>
                  <CiCalendar />
                  <span>
                    <span className='text-sm font-[500]'>{brokers.experience}</span> kinh nghiệm làm việc với bất động
                    sản
                  </span>
                </div>
              </div>
              <div className='border border-gray-100 my-[30px]'></div>

              <Button className='w-full gap-2 bg-[#fff] text-black hover:bg-[#F0F2F5]'>
                <MessageCircle className='w-4 h-4' />
                Chat Zalo
              </Button>
              <Button className=' text-[#fff] w-full gap-2 bg-[#E03C31]  hover:bg-[#FF837A]'>
                <FiPhoneCall className='w-4 h-4' />
                {brokers.phone}
              </Button>

              <div className='flex items-center justify-between gap-8 pt-4'>
                <span className='text-sm font-[500]'>Chia sẻ trang cá nhân</span>
                <div className='flex items-center- gap-2 text-lg'>
                  <FaFacebook color='blue' />
                  <SiZalo color='blue' className='border border-blue-200 p-[1px]' />
                  <GoLink />
                </div>
                {/* Add other social links */}
              </div>

              <div className='border border-gray-100  my-[30px]'></div>
              <div className='flex flex-col gap-1'>
                <span className='text-lg font-[500]'>Khu vực hoạt động</span>
                <span className='text-sm'>
                  {brokers.zone} <span className='text-gray-400'>({brokers.postCount})</span>
                </span>
              </div>
              <div className='border border-gray-100  my-[30px]'></div>
              <div className='flex flex-col gap-1'>
                <span className='text-lg font-[500]'>Loại hình môi giới</span>
                <span className='text-sm'>
                  {brokers.type[0]} <span className='text-gray-400'>({brokers.posts.forSale.length})</span>
                </span>
                <span className='text-sm'>
                  {brokers.type[1]} <span className='text-gray-400'>({brokers.posts.forRent.length})</span>
                </span>
              </div>
              <div className='border border-gray-100  my-[30px]'></div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className='space-y-6'>
            <div className='flex gap-4'>
              <Button
                variant='secondary'
                onClick={() => {
                  setActive(!active);
                  setTypePost('forSale');
                }}
                className={cn(active === false ? 'bg-[#E03C31] hover:bg-[#FF837A] text-[#fff]' : 'bg-[#fff]')}
              >
                Tin đăng bán ({brokers.posts.forSale.length})
              </Button>
              <Button
                variant='secondary'
                onClick={() => {
                  setActive(!active);
                  setTypePost('forRent');
                }}
                className={cn(active === true ? 'bg-[#E03C31] hover:bg-[#FF837A] text-[#fff]' : 'bg-[#fff]')}
              >
                Tin đăng cho thuê ({brokers.posts.forRent.length})
              </Button>
            </div>

            <div className=''>
              {typePost === 'forSale' && (
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {brokers.posts.forSale.slice(0, visible).map((post) => (
                    <div className=''>
                      <Card
                        key={post.postId}
                        className='overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow'
                      >
                        <div className='relative aspect-video realative'>
                          <CustomImage src={post.image[0]} alt='Property' className='object-cover rounded-t-[5px]' />
                          <div className='absolute right-[10px] bottom-[10px] text-[#fff]  flex items-center  '>
                            <AiOutlinePicture />
                            <span>{post.image.length}</span>
                          </div>
                        </div>
                        <CardContent className='p-4'>
                          <h3 className='font-semibold line-clamp-2 text-lg'>Căn hộ cao cấp quận 9</h3>
                          <div className='mt-2 space-y-2'>
                            <div className='flex items-center gap-2 text-sm'>
                              <MapPin className='w-4 h-4' />
                              <span>{post.location}</span>
                            </div>
                            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                              <Clock className='w-4 h-4' />
                              <span>{post.datePosted}</span>
                            </div>
                            <div className='flex items-center justify-between mt-2 '>
                              <span className='text-[#E03C31] font-bold'>{post.price}</span>
                              <span className='text-sm font-bold text-[#E03C31]'>{post.area}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              )}

              {typePost === 'forRent' && (
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {brokers.posts.forRent.slice(0, visible).map((post) => (
                    <div className=''>
                      <Card
                        key={post.postId}
                        className='overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow'
                      >
                        <div className='relative aspect-video realative'>
                          <CustomImage src={post.image[0]} alt='Property' className='object-cover' />
                          <div className='absolute right-[10px] bottom-[10px] text-[#fff]  flex items-center  '>
                            <AiOutlinePicture />
                            <span>{post.image.length}</span>
                          </div>
                        </div>
                        <CardContent className='p-4 '>
                          <h3 className='font-semibold line-clamp-2 text-lg'>Căn hộ cao cấp quận 9</h3>
                          <div className='mt-2 space-y-2'>
                            <div className='flex items-center gap-2 text-sm'>
                              <MapPin className='w-4 h-4' />
                              <span>{post.location}</span>
                            </div>
                            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                              <Clock className='w-4 h-4' />
                              <span>{post.datePosted}</span>
                            </div>
                            <div className='flex items-center justify-between mt-2 '>
                              <span className='text-[#E03C31] font-bold'>{post.price}</span>
                              <span className='text-sm font-bold text-[#E03C31]'>{post.area}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {typePost === 'forSale' && visible < brokers.posts.forSale.length && (
              <div className='flex justify-center mt-8'>
                <Button
                  onClick={handleLoadMore}
                  className='bg-white text-[#E03C31] hover:bg-[#E03C31] hover:text-white border border-[#E03C31] px-8 py-2 rounded-full transition-colors duration-300'
                >
                  Xem thêm
                </Button>
              </div>
            )}

            {typePost === 'forRent' && visible < brokers.posts.forRent.length && (
              <div className='flex justify-center mt-8'>
                <Button
                  onClick={handleLoadMore}
                  className='bg-white text-[#E03C31] hover:bg-[#E03C31] hover:text-white border border-[#E03C31] px-8 py-2 rounded-full transition-colors duration-300'
                >
                  Xem thêm
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
