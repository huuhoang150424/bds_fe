import React, { ReactNode, useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import Carousel, {
  Slider,
  SliderContainer,
  SliderNextButton,
  SliderPrevButton,
  ThumsSlider,
} from '@/components/core/carousel';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import SliderItem from './components/slideItem';
import { ChevronLeft, ChevronRight, GitGraph } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IoShareSocialOutline } from 'react-icons/io5';
import { IoMdHeartEmpty } from 'react-icons/io';
import Warning from './components/warning';
import { comments, imgPreview, posts } from '../../../constant/constPostDetail';
import Share from './components/share';
import { CiMoneyCheck1 } from 'react-icons/ci';
import { GrMapLocation } from 'react-icons/gr';
import { LuBed } from 'react-icons/lu';
import { MdOutlineBathroom } from 'react-icons/md';
import { GrDirections } from 'react-icons/gr';
import { AiOutlineHome } from 'react-icons/ai';
import { GoLaw } from 'react-icons/go';
import { RiArmchairLine } from 'react-icons/ri';
import Chart from './components/lineChart';
import BdsForU from './components/bdsForU';
import { FaCircleCheck } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { FiPhoneCall } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';
import { CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/authReducer';
import { Textarea } from '@/components/ui/textarea';
import { BsSendFill } from 'react-icons/bs';
import { color } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AiFillLike } from 'react-icons/ai';
import CommentItem from './components/CommentItem';

function PostDetail() {
  const user = useSelector(selectUser);
  const [like, setLike] = useState<Boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [send, setSend] = useState(false);
  const [fillLike, setFillLike] = useState<{ [key: number]: boolean }>({});
  const [numberLike, setNumberLike] = useState(comments);
  const [likeCount, setLikeCount] = useState<{ [key: number]: number }>({});
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const toggleLike = (id: number) => {
    setFillLike((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    setLikeCount((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + (fillLike[id] ? -1 : 1),
    }));
  };

  const toggleNumberLike = (id: number) => {
    setNumberLike((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? { ...comment, likes: comment.likes + 1 } // Tăng like
          : comment
      )
    );
  };
  
  const OPTIONS: EmblaOptionsType = {
    loop: true,
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
    skipSnaps: false,
  };

  const handleReply = (commentId: number | null) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setReplyContent('');
  };

  const handleSubmitReply = (commentId: number) => {
    if (replyContent.trim()) {
      // Xử lý logic submit reply ở đây
      
      // Reset state
      setReplyingTo(null);
      setReplyContent('');
    }
  };

  return (
    <div className='max-w-6xl h-full mx-auto pt-[80px] px-4 md:px-6 lg:px-8'>
      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-12 lg:col-span-9'>
          <div className='image relative mt-[30px]'>
            <div className='w-full'>
              <Carousel options={OPTIONS} className='relative' isAutoPlay={false}>
                <SliderContainer className='gap-2'>
                  {Object.values(imgPreview).map((src, index) => (
                    <SliderItem
                      key={index}
                      src={src}
                        alt={`Hình ảnh ${index + 1}`}
                      onClick={() => {
                        setCurrentIndex(index);
                        setIsOpen(true);
                      }}
                    />
                  ))}
                </SliderContainer>

                {/* Nút điều hướng */}
                <SliderPrevButton
                  className='absolute left-4 top-1/2 -translate-y-1/2 z-10 
                    bg-white/80 hover:bg-white p-2 rounded-full shadow-md 
                    transition-all duration-300 hover:scale-110
                    dark:bg-black/80 dark:hover:bg-black dark:text-white'
                >
                  <ChevronLeft className='w-6 h-6' />
                </SliderPrevButton>

                <SliderNextButton
                  className='absolute right-4 top-1/2 -translate-y-1/2 z-10 
                    bg-white/80 hover:bg-white p-2 rounded-full shadow-md 
                    transition-all duration-300 hover:scale-110
                    dark:bg-black/80 dark:hover:bg-black dark:text-white'
                >
                  <ChevronRight className='w-6 h-6' />
                </SliderNextButton>

                {/* Thumbnail slider */}
                <div className='mt-4'>
                  <ThumsSlider />
                </div>
              </Carousel>
              {/* Hiển thị Lightbox khi click vào ảnh */}
              {isOpen && (
                <Lightbox
                  mainSrc={Object.values(imgPreview)[currentIndex]}
                  nextSrc={Object.values(imgPreview)[(currentIndex + 1) % Object.values(imgPreview).length]}
                  prevSrc={
                    Object.values(imgPreview)[
                      (currentIndex + Object.values(imgPreview).length - 1) % Object.values(imgPreview).length
                    ]
                  }
                  onCloseRequest={() => setIsOpen(false)}
                  onMovePrevRequest={() =>
                    setCurrentIndex(
                      (currentIndex + Object.values(imgPreview).length - 1) % Object.values(imgPreview).length,
                    )
                  }
                  onMoveNextRequest={() => setCurrentIndex((currentIndex + 1) % Object.values(imgPreview).length)}
                />
              )}
            </div>
          </div>
          <div className='title mt-[8px]'>
            <span className='text-2xl font-[500]'>{posts.title}</span>
          </div>
          <div className='location mt-[8px]'>
            <span className='text-sm font-normal'>{posts.location}</span>
          </div>
          <div className='border border-gray-100 my-[10px]'></div>
          <div className='flex item-center justify-between'>
            <div className='price flex flex-col'>
              <span className='text-sm text-gray-500'>Mức giá</span>
              <span className='text-lg font-[500] mt-[4px]'>
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(posts.price)}
              </span>
              <span className='text-[12px] text-gray-500'>
                {' '}
                ~
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                  posts.price / posts.square_meters,
                )}{' '}
                /m²
              </span>
            </div>
            <div className='S flex flex-col'>
              <span className='text-sm text-gray-500'>Diện tích</span>
              <span className='text-lg font-[500] mt-[4px]'>{posts.square_meters} m²</span>
            </div>
            <div className='bedroom flex flex-col'>
              <span className='text-sm text-gray-500'>Phòng ngủ</span>
              <span className='text-lg font-[500] mt-[4px]'>{posts.bedroom} PN</span>
            </div>
            <div className='icon flex items-center justify-center gap-4'>
              <Share />
              <Warning />
              <div className='like'>
                <HoverCard>
                  <HoverCardTrigger>
                    <div className='text-[24px]' onClick={() => setLike(!like)}>
                      {like === true ? <IoMdHeartEmpty className='text-red-500' /> : <IoMdHeartEmpty />}
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent side='top' className='mt-[10px]'>
                    Bấm để lưu tin
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          </div>
          <div className='border border-gray-100 my-[10px]'></div>
          {/* Thông tin mô tả */}
          <div className='des'>
            <div className='my-[20px]'>
              <span className='text-2xl font-[500] '>Thông tin mô tả</span>
            </div>
            <div className=''>
              <p className='text-sm'>{posts.description}</p>
            </div>
          </div>

          {/* đặc điểm */}
          <div className='characteristic'>
            <div className='my-[20px]'>
              <span className='text-2xl font-[500] '>Đặc điểm bất động sản</span>
            </div>
            <div className='border border-gray-100 my-[10px]'></div>

            <div className='flex item-center justify-between'>
              <div className='space-y-6'>
                <div className=''>
                  <div className='flex items-center gap-[64px] text-[16px]  justify-between'>
                    <div className='flex items-center gap-4 text-[16px] font-[500]'>
                      <CiMoneyCheck1 className='text-[24px]  font-[500]' />
                      <span>Mức giá</span>
                    </div>
                    <span>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(posts.price)}
                    </span>
                  </div>
                </div>

                <div className=''>
                  <div className='flex items-center gap-[64px] text-[16px]  justify-between'>
                    <div className='flex items-center gap-4 text-[16px] font-[500]'>
                      <GrMapLocation className='text-[24px]  font-[500]' />
                      <span>Diện tích</span>
                    </div>
                    <span>{posts.square_meters} m²</span>
                  </div>
                </div>

                <div className=''>
                  <div className='flex items-center gap-[64px] text-[16px]  justify-between'>
                    <div className='flex items-center gap-4 text-[16px] font-[500]'>
                      <LuBed className='text-[24px]  font-[500]' />
                      <span>Số phòng ngủ </span>
                    </div>
                    <span>{posts.bedroom} phòng</span>
                  </div>
                </div>

                <div className=''>
                  <div className='flex items-center gap-[64px] text-[16px]  justify-between'>
                    <div className='flex items-center gap-4 text-[16px] font-[500]'>
                      <MdOutlineBathroom className='text-[24px]  font-[500]' />
                      <span>Số phòng tắm, vệ sinh </span>
                    </div>
                    <span>{posts.bathroom} phòng</span>
                  </div>
                </div>
              </div>
              <div className='space-y-6'>
                <div className=''>
                  <div className='flex items-center gap-[64px] text-[16px] justify-between  '>
                    <div className='flex items-center gap-4 text-[16px] font-[500]'>
                      <GrDirections className='text-[24px]  font-[500]' />
                      <span>Hướng nhà</span>
                    </div>
                    <span>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(posts.price)}
                    </span>
                  </div>
                </div>

                <div className=''>
                  <div className='flex items-center gap-[64px] text-[16px]   justify-between'>
                    <div className='flex items-center gap-4 text-[16px] font-[500]'>
                      <AiOutlineHome className='text-[24px]  font-[500]' />
                      <span>Hợp đồng mua bán</span>
                    </div>
                    <span>{posts.square_meters} m²</span>
                  </div>
                </div>

                <div className=''>
                  <div className='flex items-center gap-[64px] text-[16px]  justify-between'>
                    <div className='flex items-center gap-4 text-[16px] font-[500]'>
                      <GoLaw className='text-[24px]  font-[500]' />
                      <span>Pháp Lý </span>
                    </div>
                    <span>{posts.bedroom} phòng</span>
                  </div>
                </div>

                <div className=''>
                  <div className='flex items-center gap-[64px] text-[16px]  justify-between'>
                    <div className='flex items-center gap-4 text-[16px] font-[500]'>
                      <RiArmchairLine className='text-[24px]  font-[500]' />
                      <span>Nội thất </span>
                    </div>
                    <span>{posts.bathroom} phòng</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='border border-gray-100 my-[10px]'></div>
            <div className='my-[20px]'>
              <span className='text-2xl font-[500]'>Lịch sử bán {posts.name} </span>
            </div>
            <div className='w-full h-[400px]'>
              <Chart />
            </div>
            <div className='border border-gray-100 my-[10px]'></div>
            <div className='my-[20px]'>
              <span className='text-2xl font-[500] '>Xem trên bản đồ</span>
            </div>
            <div className='w-full h-[300px]'>
              <iframe src={posts.map} width='100%' height='100%' style={{ border: 'none' }}></iframe>
            </div>
          </div>
          <div className='border border-gray-100 my-[10px]'></div>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-2 items-start'>
              <span className='text-sm text-gray-500'>Ngày đăng</span>
              <span className='font-[500]'>{posts.postDate}</span>
            </div>
            <div className='flex flex-col gap-2 items-start'>
              <span className='text-sm text-gray-500'>Ngày hết hạn</span>
              <span className='font-[500]'>{posts.expirationDate}</span>
            </div>
            <div className='flex flex-col gap-2 items-start'>
              <span className='text-sm text-gray-500'>Loại tin</span>
              <span className='font-[500]'>{posts.type}</span>
            </div>
            <div className='flex flex-col gap-2 items-start'>
              <span className='text-sm text-gray-500'>mã tin</span>
              <span className='font-[500]'>{posts.id}</span>
            </div>
          </div>
          <div className='border border-gray-100 my-[10px]'></div>
          {/* Bất động sản dành cho bạn */}
          {/* <div>
            <div className='my-[20px]'>
              <span className='text-2xl font-[500] '>Bất động sản dành cho bạn</span>
            </div>
            <div>
              
            </div>
          </div> */}
          {/* Bất động sản dành cho bạn */}

          {/* đặc điểm */}

          {/* Thông tin mô tả */}

          {/* Comment section */}
          <div className='space-y-6 my-[30px]'>
            {/* Comment input */}
            <div className='flex items-start gap-2'>
              <div className='shrink-0'>
                <img className='w-[32px] h-[32px] rounded-full' src={user?.avatar} alt='avatar' />
              </div>
              <div className='w-full relative'>
                <Textarea
                  className='rounded-[10px] w-full p-2 border border-gray-300 bg-[#F0F2F5]'
                  placeholder='Viết bình luận...'
                  onChange={(e) => setSend(e.target.value.trim() !== '')}
                />
                <BsSendFill
                  className={cn(
                    'absolute right-3 bottom-3 transition-all',
                    send ? 'text-blue-500 cursor-pointer' : 'text-gray-400 opacity-70'
                  )}
                />
              </div>
            </div>

            <div className='border border-gray-100 my-[10px]'></div>

            {/* Comments list */}
            <div className='space-y-4'>
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onReply={handleReply}
                  onLike={toggleLike}
                  replyingTo={replyingTo}
                  replyContent={replyContent}
                  setReplyContent={setReplyContent}
                  user={user}
                  fillLike={fillLike}
                  likeCount={likeCount}
                  handleSubmitReply={handleSubmitReply}
                />
              ))}
            </div>
          </div>

          <div className='border border-gray-100 my-[10px] my-[30px]'></div>
          
        </div>
        

        {/* Thông tin chi tiết */}
        <div className='col-span-12 lg:col-span-3'>
          <div className='rounded-lg mt-[30px] p-2 lg:sticky lg:top-[100px] border-gray-200 border'>
            <div className='bg-white rounded-lg p-4 '>
              {/* Header - Môi giới chuyên nghiệp */}
              <div className='flex items-center gap-3 mb-4'>
                <img
                  src={posts.author.image}
                  alt='avatar'
                  className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#00A870]'
                />
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2 flex-wrap'>
                    <h3 className='font-medium text-sm sm:text-base'>Môi giới chuyên nghiệp</h3>
                    <FaCircleCheck className='text-[#00A870] w-4 h-4 shrink-0' />
                  </div>
                  <h2 className='font-bold text-base sm:text-lg truncate'>{posts.author.name}</h2>
                </div>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-3 gap-2 sm:gap-4 mb-4 text-center'>
                <div className=''>
                  <p className='text-xs sm:text-sm text-gray-500'>Tham gia BĐS</p>
                  <p className='font-medium mt-1 text-sm sm:text-base'>{posts.author.time} năm</p>
                </div>
                <div className=''>
                  <p className='text-xs sm:text-sm text-gray-500'>Tin đăng</p>
                  <p className='font-medium mt-1 text-sm sm:text-base'>{posts.author.numberPost}</p>
                </div>
                <div className=''>
                  <p className='text-xs sm:text-sm text-gray-500'>Chứng chỉ</p>
                  <div className='mt-1'>
                    <FaCircleCheck className='mx-auto text-[#00A870] w-4 h-4 sm:w-5 sm:h-5' />
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className='bg-[#F8F8F8] rounded-lg p-2 sm:p-3 mb-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shrink-0'>
                    <span className='text-base sm:text-xl'>💡</span>
                  </div>
                  <p className='text-xs sm:text-sm'>Có 6 tin căn hộ chung cư cùng dự án Vinhomes Grand Park</p>
                </div>
                <button className='w-full text-xs sm:text-sm text-gray-600 hover:text-[#00A870] transition-colors duration-200'>
                  Xem trang cá nhân →
                </button>
              </div>

              {/* Contact Buttons */}
              <div className='space-y-2 sm:space-y-3'>
                <button
                  className='w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg border border-gray-200 
                  bg-white hover:bg-gray-50 transition-colors duration-200 
                  flex items-center justify-center gap-2 text-sm sm:text-base'
                >
                  <img src='/zalo-icon.png' alt='Zalo' className='w-4 h-4 sm:w-5 sm:h-5' />
                  Chat qua Zalo
                </button>
                <button
                  className='w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg 
                  bg-[#E03C31] hover:bg-[#FF837A] text-white transition-colors duration-200 
                  flex items-center justify-center gap-2 text-sm sm:text-base'
                >
                  <FiPhoneCall className='w-4 h-4 sm:w-5 sm:h-5' />
                  <span className='font-medium'>{posts.author.phone}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin chi tiết */}
      </div>
    </div>
  );
}

export default PostDetail;
