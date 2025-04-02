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
import SliderItem from './components/slide-item';
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
import Chart from './components/line-chart';
import BdsForU from './components/bdsForU';

import { useSelector } from 'react-redux';
import { selectToken, selectUser } from '@/redux/authReducer';
import { Textarea } from '@/components/ui/textarea';
import { BsSendFill } from 'react-icons/bs';
import { color } from 'framer-motion';
import { cn } from '@/lib/utils';

import CommentItem from './components/comment-item';
import InforBrokerPpost from './components/infor-broker-post';
import { useGetPostDetail } from './hooks/use-get-post-detail';
import { useParams } from 'react-router-dom';
import { Loading } from '@/components/common';
import MapComponent from './components/Map/map';
import { selectIsAuthenticated } from '@/redux/authReducer';


function PostDetail() {
  const token = useSelector(selectToken)
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
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
          : comment,
      ),
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
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useGetPostDetail(slug || '');
  console.log('data:', data);

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
    

    const formattedData = data.priceHistory.map((item: { price: number; changed_at: string | number | Date; }) => ({
      price: item.price,
      changed_at: new Date(item.changed_at).toLocaleDateString('vi-VN'),
    }));
  
  return (
    <div className='max-w-6xl h-full mx-auto pt-[80px] px-4 md:px-6 lg:px-8'>
      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-12 lg:col-span-9'>
          <div className='image relative mt-[30px]'>
            <div className='w-full'>
              <Carousel options={OPTIONS} className='relative' isAutoPlay={false}>
                <SliderContainer className='gap-2'>
                  {data.images.map((src: { image_url: string }, index: number) => (
                    <SliderItem
                      key={index}
                      src={src.image_url}
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

              {isOpen && data.images.length > 0 && (
                <Lightbox
                  mainSrc={data.images[currentIndex].image_url}
                  nextSrc={data.images[(currentIndex + 1) % data.images.length].image_url}
                  prevSrc={data.images[(currentIndex + data.images.length - 1) % data.images.length].image_url}
                  onCloseRequest={() => setIsOpen(false)}
                  onMovePrevRequest={() =>
                    setCurrentIndex((currentIndex + data.images.length - 1) % data.images.length)
                  }
                  onMoveNextRequest={() => setCurrentIndex((currentIndex + 1) % data.images.length)}
                />
              )}
            </div>
          </div>
          <div className='title mt-[8px]'>
            <span className='text-2xl font-[500]'>{data.title}</span>
          </div>
          <div className='location mt-[8px]'>
            <span className='text-sm font-normal'>{data.address}</span>
          </div>
          <div className='border border-gray-100 my-[10px]'></div>
          <div className='flex item-center justify-between'>
            <div className='price flex flex-col'>
              <span className='text-sm text-gray-500'>Mức giá</span>
              <span className='text-lg font-[500] mt-[4px]'>
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)}
              </span>
              <span className='text-[12px] text-gray-500'>
                {' '}
                ~
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                  data.price / data.squareMeters,
                )}{' '}
                /m²
              </span>
            </div>
            <div className='S flex flex-col'>
              <span className='text-sm text-gray-500'>Diện tích</span>
              <span className='text-lg font-[500] mt-[4px]'>{data.squareMeters} m²</span>
            </div>
            <div className='bedroom flex flex-col'>
              <span className='text-sm text-gray-500'>Phòng ngủ</span>
              <span className='text-lg font-[500] mt-[4px]'>{data.bedroom} PN</span>
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
              <p className='text-sm'>{data.description}</p>
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
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)}
                    </span>
                  </div>
                </div>

                <div className=''>
                  <div className='flex items-center gap-[64px] text-[16px]  justify-between'>
                    <div className='flex items-center gap-4 text-[16px] font-[500]'>
                      <GrMapLocation className='text-[24px]  font-[500]' />
                      <span>Diện tích</span>
                    </div>
                    <span>{data.squareMeters} m²</span>
                  </div>
                </div>

                <div className=''>
                  <div className='flex items-center gap-[64px] text-[16px]  justify-between'>
                    <div className='flex items-center gap-4 text-[16px] font-[500]'>
                      <LuBed className='text-[24px]  font-[500]' />
                      <span>Số phòng ngủ </span>
                    </div>
                    <span>{data.bedroom} phòng</span>
                  </div>
                </div>

                <div className=''>
                  <div className='flex items-center gap-[64px] text-[16px]  justify-between'>
                    <div className='flex items-center gap-4 text-[16px] font-[500]'>
                      <MdOutlineBathroom className='text-[24px]  font-[500]' />
                      <span>Số phòng tắm, vệ sinh </span>
                    </div>
                    <span>{data.bathroom} phòng</span>
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
                    <span>{data.direction}</span>
                  </div>
                </div>

                <div className=''>
                  <div className='flex items-center gap-[64px] text-[16px]   justify-between'>
                    <div className='flex items-center gap-4 text-[16px] font-[500]'>
                      <AiOutlineHome className='text-[24px]  font-[500]' />
                      <span>Hợp đồng</span>
                    </div>
                    <span></span>
                  </div>
                </div>

                <div className=''>
                  <div className='flex items-center gap-[100px] text-[16px]  justify-between'>
                    <div className='flex items-center justify-between gap-4 text-[16px] font-[500]'>
                      <GoLaw className='text-[24px]  font-[500]' />
                      <span>Pháp Lý </span>
                    </div>
                    <div>
                      {data.verified === true ? (
                        <span className='text-green-500 '>Đã xác thực</span>
                      ) : (
                        <span className='text-red-500 '>
                          {/* <FaCircleCheck className='text-red-500' /> */}
                          Chưa xác thực
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className=''>
                  <div className='flex items-center gap-[64px] text-[16px]  justify-between'>
                    <div className='flex items-center gap-4 text-[16px] font-[500]'>
                      <RiArmchairLine className='text-[24px]  font-[500]' />
                      <span>Nội thất </span>
                    </div>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>

            <div className='border border-gray-100 my-[10px]'></div>
            <div className='my-[20px]'>
              <span className='text-2xl font-[500]'>Lịch sử bán {data.title} </span>
            </div>
            <div className='w-full h-[400px]'>
            <Chart chartData={formattedData} />
            </div>
            <div className='border border-gray-100 my-[10px]'></div>
            <div className='my-[20px]'>
              <span className='text-2xl font-[500] '>Xem trên bản đồ</span>
            </div>
            <div className='w-[800px] h-[300px] z-0'>
              {/* <iframe src={posts.map} width='100%' height='100%' style={{ border: 'none' }}></iframe> */}
              <MapComponent address={data.address} />
            </div>
          </div>
          <div className='border border-gray-100 my-[10px]'></div>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-2 items-start'>
              <span className='text-sm text-gray-500'>Ngày đăng</span>
              <span className='font-[500]'> {new Date(data.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
            <div className='flex flex-col gap-2 items-start'>
              <span className='text-sm text-gray-500'>Ngày hết hạn</span>
              <span className='font-[500]'>{new Date(data.expiredDate).toLocaleDateString('vi-VN')}</span>
            </div>
            <div className='flex flex-col gap-2 items-start'>
              <span className='text-sm text-gray-500'>Loại tin</span>
              {data.priority === 1 ? (
                <span className='font-[500]'>Kim cương</span>
              ) : data.priority === 2 ? (
                <span className='font-[500]'>Vàng</span>
              ) : (
                <span className='font-[500]'>đồng</span>
              )}
            </div>
            <div className='flex flex-col gap-2 items-start'>
              <span className='text-sm text-gray-500'>mã tin</span>
              <span className='font-[500]'>{posts.id}</span>
            </div>
          </div>
          <div className='border border-gray-100 my-[10px]'></div>
          <div className='tag-search '>
            <div className='my-[20px]'>
              <span className='text-2xl font-[500] '>Tìm kiếm theo từ khóa</span>
            </div>
            {data.tagPosts.map( (tagItem: { id: string; tag: { tagName: string } }, index: number) => (
              <div key={tagItem.id} className='flex-wrap gap-2'>
                <span className='text-gray font-[500] mr-[10px] rounded-[15px] px-[15px] py-[5px] bg-gray-200 hover:bg-gray-300 '>
                  {tagItem.tag.tagName}
                </span>
              </div>
            ))}
          </div>
          <div className='border border-gray-100 my-[20px]'></div>
          {isAuthenticated === true && (
            <BdsForU />
          )}
          
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
                    send ? 'text-blue-500 cursor-pointer' : 'text-gray-400 opacity-70',
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
        <div className='col-span-12 lg:col-span-3 ml-[15px]'>
          <div className='rounded-lg mt-[30px] p-2 lg:sticky lg:top-[100px] border-gray-200 border'>
            <InforBrokerPpost user={{
              name: data.user.fullname,
              email: data.user.email, 
              phone: data.user.phone,
              avatar: data.user.avatar,
            }}             />
          </div>
        </div>

        {/* Thông tin chi tiết */}
      </div>
    </div>
  );
}

export default PostDetail;
