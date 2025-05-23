import { useState, Suspense, lazy } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import Carousel, { SliderContainer, SliderNextButton, SliderPrevButton, ThumsSlider } from '@/components/core/carousel';
import { useSelector } from 'react-redux';
import { useGetPostDetail } from './hooks/use-get-post-detail';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { CiMoneyCheck1 } from 'react-icons/ci';
import { GrMapLocation } from 'react-icons/gr';
import { LuBed } from 'react-icons/lu';
import { MdOutlineBathroom } from 'react-icons/md';
import { GrDirections } from 'react-icons/gr';
import { AiOutlineHome } from 'react-icons/ai';
import { GoLaw } from 'react-icons/go';
import { RiArmchairLine } from 'react-icons/ri';
import { selectIsAuthenticated } from '@/redux/authReducer';
import { Loading } from '@/components/common';
import AuthGuard from '@/page/auth/page/auth-guard-enhanced';
import SliderItem from './components/slide-item';
import Share from './components/share';
import Warning from './components/warning';
import WishlistButton from './components/like';
import InforBrokerPpost from './components/infor-broker-post';

const Lightbox = lazy(() => import('react-image-lightbox'));
const Chart = lazy(() => import('./components/line-chart'));
const MapComponent = lazy(() => import('./components/Map/map'));
const BdsForU = lazy(() => import('./components/bds-outstanding'));
const PostCommentSection = lazy(() => import('./components/comment/post-comment-section'));

import 'react-image-lightbox/style.css';
import { StarRating } from './components/star-rating';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';

const PostDetailSkeleton = () => {
  return (
    <div className="max-w-6xl h-full mx-auto px-4 md:px-6 lg:px-8 animate-pulse">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-9">
          {/* Title */}
          <div className="mt-[40px]">
            <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
          </div>
          {/* Address and Star Rating */}
          <div className="mt-[8px] flex items-center gap-[5px]">
            <MapPin className="text-gray-400" size={15} />
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 rounded ml-2"></div>
          </div>
          {/* Carousel */}
          <div className="mt-[30px]">
            <div className="w-full h-[400px] bg-gray-200 rounded-lg"></div>
          </div>
          <div className="border border-gray-100 my-[10px]"></div>
          {/* Price, Square Meters, Bedroom */}
          <div className="flex item-center justify-between">
            <div className="flex flex-col">
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
              <div className="h-6 w-24 bg-gray-200 rounded mt-[4px]"></div>
              <div className="h-3 w-20 bg-gray-200 rounded mt-[4px]"></div>
            </div>
            <div className="flex flex-col">
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
              <div className="h-6 w-16 bg-gray-200 rounded mt-[4px]"></div>
            </div>
            <div className="flex flex-col">
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
              <div className="h-6 w-12 bg-gray-200 rounded mt-[4px]"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <div className="border border-gray-100 my-[10px]"></div>
          {/* Description */}
          <div className="my-[20px]">
            <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-1">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
          {/* Characteristics */}
          <div className="my-[20px]">
            <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
          </div>
          <div className="border border-gray-100 my-[10px]"></div>
          <div className="flex item-center justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-[64px] justify-between">
                <div className="flex items-center gap-4">
                  <CiMoneyCheck1 className="text-[24px] text-gray-400" />
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center gap-[64px] justify-between">
                <div className="flex items-center gap-4">
                  <GrMapLocation className="text-[24px] text-gray-400" />
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center gap-[64px] justify-between">
                <div className="flex items-center gap-4">
                  <LuBed className="text-[24px] text-gray-400" />
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center gap-[64px] justify-between">
                <div className="flex items-center gap-4">
                  <MdOutlineBathroom className="text-[24px] text-gray-400" />
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-[64px] justify-between">
                <div className="flex items-center gap-4">
                  <GrDirections className="text-[24px] text-gray-400" />
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center gap-[64px] justify-between">
                <div className="flex items-center gap-4">
                  <AiOutlineHome className="text-[24px] text-gray-400" />
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center gap-[100px] justify-between">
                <div className="flex items-center gap-4">
                  <GoLaw className="text-[24px] text-gray-400" />
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center gap-[64px] justify-between">
                <div className="flex items-center gap-4">
                  <RiArmchairLine className="text-[24px] text-gray-400" />
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
          <div className="border border-gray-100 my-[10px]"></div>
          {/* Price History */}
          <div className="my-[20px]">
            <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
          </div>
          <div className="w-full h-[400px] bg-gray-200 rounded-lg"></div>
          <div className="border border-gray-100 my-[10px]"></div>
          {/* Map */}
          <div className="my-[20px]">
            <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
          </div>
          <div className="w-full h-[300px] bg-gray-200 rounded-lg mb-[30px]"></div>
          <div className="border border-gray-100 my-[10px]"></div>
          {/* Metadata */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="border border-gray-100 my-[10px]"></div>
          {/* Tags */}
          <div className="my-[20px]">
            <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          </div>
          <div className="border border-gray-100 my-[20px]"></div>
          {/* Comments */}
          <div className="my-[30px]">
            <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
            <div className="h-48 w-full bg-gray-200 rounded-lg mt-4"></div>
          </div>
        </div>
        {/* Broker Info */}
        <div className="col-span-12 lg:col-span-3 ml-[15px]">
          <div className="rounded-lg mt-[30px] p-2 border-gray-200 border">
            <div className="h-48 w-full bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

function PostDetail() {
  useScrollToTopOnMount();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const OPTIONS: EmblaOptionsType = {
    loop: true,
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
    skipSnaps: false,
  };
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useGetPostDetail(slug || '');
  const postId = data?.id;

  const formattedData = data?.priceHistory?.map((item: { price: number; changed_at: string | number | Date }) => ({
    price: item?.price,
    changed_at: new Date(item?.changed_at).toLocaleDateString('vi-VN'),
  }));

  return (
    <div className="max-w-6xl h-full mx-auto px-4 md:px-6 lg:px-8">
      {isLoading ? (
        <PostDetailSkeleton />
      ) : (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-9">
            <div className="title mt-[40px]">
              <span className="text-[22px] font-[500]">{data?.title}</span>
            </div>
            <div className="mt-[8px] flex items-center gap-[5px]">
              <MapPin className="text-gray-500" size={15} />
              <span className="text-[13px] font-normal text-gray-500">{data?.address}</span>
              <StarRating commentsSectionId="comments" postId={data?.id} />
            </div>
            <div className="image relative mt-[30px]">
              <div className="w-full relative">
                <Carousel options={OPTIONS} className="relative" isAutoPlay={false}>
                  <SliderContainer className="gap-2">
                    {data?.images.map((src: { image_url: string }, index: number) => (
                      <SliderItem
                        key={index}
                        src={src.image_url}
                        alt={`Hình ảnh ${index + 1}`}
                        onClick={() => {
                          setCurrentIndex(index);
                          setIsOpen(true);
                        }}
                        countImg={data?.images?.length}
                      />
                    ))}
                  </SliderContainer>
                  <SliderPrevButton
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 
                      bg-white/80 hover:bg-white p-2 rounded-full shadow-md 
                      transition-all duration-300 hover:scale-110
                      dark:bg-black/80 dark:hover:bg-black dark:text-white"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </SliderPrevButton>
                  <SliderNextButton
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 
                      bg-white/80 hover:bg-white p-2 rounded-full shadow-md 
                      transition-all duration-300 hover:scale-110
                      dark:bg-black/80 dark:hover:bg-black dark:text-white"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </SliderNextButton>
                  <div className="mt-4">
                    <ThumsSlider />
                  </div>
                </Carousel>
                {isOpen && data?.images?.length > 0 && (
                  <Suspense fallback={<Loading className="mx-auto my-[100px]" />}>
                    <Lightbox
                      mainSrc={data?.images[currentIndex]?.image_url}
                      nextSrc={data?.images[(currentIndex + 1) % data.images.length]?.image_url}
                      prevSrc={
                        data?.images[(currentIndex + data?.images?.length - 1) % data?.images?.length]?.image_url
                      }
                      onCloseRequest={() => setIsOpen(false)}
                      onMovePrevRequest={() =>
                        setCurrentIndex((currentIndex + data?.images?.length - 1) % data?.images?.length)
                      }
                      onMoveNextRequest={() => setCurrentIndex((currentIndex + 1) % data?.images?.length)}
                    />
                  </Suspense>
                )}
                <div className="absolute top-[70%] right-2 bg-black/60 text-white text-[13px] px-2 py-1 rounded-md">
                  {data?.images?.length}
                </div>
              </div>
            </div>

            <div className="border border-gray-100 my-[10px]"></div>
            <div className="flex item-center justify-between">
              <div className="price flex flex-col">
                <span className="text-[13px] text-gray-500">Mức giá</span>
                <span className="text-[17px] font-[500] mt-[4px]">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data?.price)}
                </span>
                <span className="text-[11px] text-gray-500">
                  ~
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                    data?.price / data?.squareMeters,
                  )}
                  /m²
                </span>
              </div>
              <div className="S flex flex-col">
                <span className="text-[13px] text-gray-500">Diện tích</span>
                <span className="text-[17px] font-[500] mt-[4px]">{data?.squareMeters} m²</span>
              </div>
              <div className="bedroom flex flex-col">
                <span className="text-[13px] text-gray-500">Phòng ngủ</span>
                <span className="text-[17px] font-[500] mt-[4px]">{data?.bedroom} PN</span>
              </div>
              <div className="icon flex items-center justify-center gap-4">
                <Share />
                <AuthGuard actionType="warning">
                  <Warning postId={postId} />
                </AuthGuard>
                <AuthGuard actionType="like">
                  <WishlistButton postId={postId} />
                </AuthGuard>
              </div>
            </div>
            <div className="border border-gray-100 my-[10px]"></div>
            <div className="des">
              <div className="my-[20px]">
                <span className="text-[22px] font-[500]">Thông tin mô tả</span>
              </div>
              <div className="">
                <p className="text-[13px]" dangerouslySetInnerHTML={{ __html: data?.description }}></p>
              </div>
            </div>
            <div className="characteristic">
              <div className="my-[20px]">
                <span className="text-[22px] font-[500]">Đặc điểm bất động sản</span>
              </div>
              <div className="border border-gray-100 my-[10px]"></div>
              <div className="flex item-center justify-between">
                <div className="space-y-6">
                  <div className="">
                    <div className="flex items-center gap-[64px] text-[15px] justify-between">
                      <div className="flex items-center gap-4 text-[15px] font-[500]">
                        <CiMoneyCheck1 className="text-[24px] font-[500]" />
                        <span>Mức giá</span>
                      </div>
                      <span>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data?.price)}
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex items-center gap-[64px] text-[15px] justify-between">
                      <div className="flex items-center gap-4 text-[15px] font-[500]">
                        <GrMapLocation className="text-[24px] font-[500]" />
                        <span>Diện tích</span>
                      </div>
                      <span>{data?.squareMeters} m²</span>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex items-center gap-[64px] text-[15px] justify-between">
                      <div className="flex items-center gap-4 text-[15px] font-[500]">
                        <LuBed className="text-[24px] font-[500]" />
                        <span>Số phòng ngủ</span>
                      </div>
                      <span>{data?.bedroom} phòng</span>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex items-center gap-[64px] text-[15px] justify-between">
                      <div className="flex items-center gap-4 text-[15px] font-[500]">
                        <MdOutlineBathroom className="text-[24px] font-[500]" />
                        <span>Số phòng tắm, vệ sinh</span>
                      </div>
                      <span>{data?.bathroom} phòng</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="">
                    <div className="flex items-center gap-[64px] text-[15px] justify-between">
                      <div className="flex items-center gap-4 text-[15px] font-[500]">
                        <GrDirections className="text-[24px] font-[500]" />
                        <span>Hướng nhà</span>
                      </div>
                      <span>{data?.direction}</span>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex items-center gap-[64px] text-[15px] justify-between">
                      <div className="flex items-center gap-4 text-[15px] font-[500]">
                        <AiOutlineHome className="text-[24px] font-[500]" />
                        <span>Hợp đồng</span>
                      </div>
                      <span></span>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex items-center gap-[100px] text-[15px] justify-between">
                      <div className="flex items-center justify-between gap-4 text-[15px] font-[500]">
                        <GoLaw className="text-[24px] font-[500]" />
                        <span>Pháp Lý</span>
                      </div>
                      <div>
                        {data?.verified === true ? (
                          <span className="text-green-500">Đã xác thực</span>
                        ) : (
                          <span className="text-red-500">Chưa xác thực</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex items-center gap-[64px] text-[15px] justify-between">
                      <div className="flex items-center gap-4 text-[15px] font-[500]">
                        <RiArmchairLine className="text-[24px] font-[500]" />
                        <span>Nội thất</span>
                      </div>
                      <div>
                        {data?.isFurniture === true ? <span>Có</span> : <span>Không</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-gray-100 my-[10px]"></div>
              <div className="my-[20px]">
                <span className="text-[22px] font-[500]">Lịch sử bán {data?.title}</span>
              </div>
              <div className="w-full h-[400px]">
                <Suspense fallback={<Loading className="mx-auto my-[100px]" />}>
                  <Chart chartData={formattedData} />
                </Suspense>
              </div>
              <div className="border border-gray-100 my-[10px]"></div>
              <div className="my-[20px]">
                <span className="text-[22px] font-[500]">Xem trên bản đồ</span>
              </div>
              <div className="w-[800px] h-[300px] z-0 mb-[30px]">
                <Suspense fallback={<Loading className="mx-auto my-[100px]" />}>
                  <MapComponent address={data?.address} />
                </Suspense>
              </div>
            </div>
            <div className="border border-gray-100 my-[10px]"></div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2 items-start">
                <span className="text-[13px] text-gray-500">Ngày đăng</span>
                <span className="font-[500] text-[13px]">
                  {new Date(data?.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </div>
              <div className="flex flex-col gap-2 items-start">
                <span className="text-[13px] text-gray-500">Ngày hết hạn</span>
                <span className="font-[500] text-[13px]">{new Date(data?.expiredDate).toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="flex flex-col gap-2 items-start">
                <span className="text-[13px] text-gray-500">Loại tin</span>
                {data?.priority === 1 ? (
                  <span className="font-[500] text-[13px]">Kim cương</span>
                ) : data?.priority === 2 ? (
                  <span className="font-[500] text-[13px]">Vàng</span>
                ) : (
                  <span className="font-[500] text-[13px]">Đồng</span>
                )}
              </div>
              <div className="flex flex-col gap-2 items-start">
                <span className="text-[13px] text-gray-500">Mã tin</span>
                <span className="font-[500] text-[13px]"></span>
              </div>
            </div>
            <div className="border border-gray-100 my-[10px]"></div>
            <div className="tag-search">
              <div className="my-[20px]">
                <span className="text-[22px] font-[500]">Tìm kiếm theo từ khóa</span>
              </div>
              
              <div className="flex gap-1">
                {data?.tagPosts.map((tagItem: { id: string; tag: { tagName: string } }, index: number) => (
                  <div  key={tagItem.id} className="cursor-pointer ">
                    <span onClick={() => navigate(`/filter?page=1&limit=10&tags=${tagItem.id}`)} className="text-gray font-[500] mr-[10px] rounded-[15px] px-[15px] py-[5px] bg-gray-200 hover:bg-gray-300 text-[13px]">
                      {tagItem.tag.tagName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-gray-100 my-[20px]"></div>
            {isAuthenticated === true && (
              <Suspense fallback={<Loading className="mx-auto my-[100px]" />}>
                <BdsForU />
              </Suspense>
            )}
            <div className="space-y-6 my-[30px]">
              <div className="border border-gray-100 my-[10px]"></div>
              <div className="space-y-4">
                <h3 className="font-semibold text-[17px]">Bình luận</h3>
                <AuthGuard actionType="comment">
                  <PostCommentSection postId={postId} />
                </AuthGuard>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-3 ml-[15px]">
            <div className="rounded-lg mt-[30px] p-2 lg:sticky lg:top-[100px] border-gray-200 border">
              <InforBrokerPpost user={data?.user} postId={postId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetail;