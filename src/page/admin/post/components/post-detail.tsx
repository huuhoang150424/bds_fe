import { useState } from 'react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import {
  Check,
  MapPin,
  DollarSign,
  Maximize2,
  Bed,
  Bath,
  User,
  ExternalLink,
  Share2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

enum ListingTypes {
  RENT = 'RENT',
  SELL = 'SELL',
}

enum Directions {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST',
  NORTHEAST = 'NORTHEAST',
  NORTHWEST = 'NORTHWEST',
  SOUTHEAST = 'SOUTHEAST',
  SOUTHWEST = 'SOUTHWEST',
}

enum PriceUnit {
  VND = 'VND',
  USD = 'USD',
}

enum StatusPost {
  AVAILABLE = 'Còn trống',
  NEGOTIATING = 'Đang đám phán',
  DELIVERED = 'Đã bàn giao',
}


const formatPrice = (price: number, unit: string) => {
  if (unit === PriceUnit.VND) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price * 1000000);
  } else {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  }
};
const formatDirection = (direction: string) => {
  switch (direction) {
    case Directions.NORTH:
      return 'Hướng Bắc';
    case Directions.SOUTH:
      return 'Hướng Nam';
    case Directions.EAST:
      return 'Hướng Đông';
    case Directions.WEST:
      return 'Hướng Tây';
    case Directions.NORTHEAST:
      return 'Hướng Đông Bắc';
    case Directions.NORTHWEST:
      return 'Hướng Tây Bắc';
    case Directions.SOUTHEAST:
      return 'Hướng Đông Nam';
    case Directions.SOUTHWEST:
      return 'Hướng Tây Nam';
    default:
      return direction;
  }
};

interface PostDetailModalProps {
  post:  any;
  isOpen: boolean;
  onClose: any;
  onVerify?: (postId: string) => void;
}

export function PostDetailModal({ post, isOpen, onClose, onVerify }: PostDetailModalProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const mockAmenities = [
    'Bảo vệ 24/7',
    'Hồ bơi',
    'Phòng gym',
    'Sân vườn',
    'Bãi đỗ xe',
    'Thang máy',
    'Wifi',
    'Điều hòa',
  ];

  if (!post) return null;

  const postWithDefaults: any = {
    ...post,
    views: post.views || Math.floor(Math.random() * 500) + 100,
    favorites: post.favorites || Math.floor(Math.random() * 50),
    contacts: post.contacts || Math.floor(Math.random() * 20),
    listingType: post.listingType || (Math.random() > 0.5 ? ListingTypes.RENT : ListingTypes.SELL),
    amenities: post.amenities || mockAmenities,
    images: post.images
  };
  console.log(postWithDefaults)
  const daysUntilExpiry = Math.ceil(
    (new Date(postWithDefaults.expiredDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  );
  

  const getStatusColor = (status: string) => {
    switch (status) {
      case StatusPost.AVAILABLE:
        return 'bg-green-100 text-green-800';
      case StatusPost.NEGOTIATING:
        return 'bg-yellow-100 text-yellow-800';
      case StatusPost.DELIVERED:
        return 'bg-blue-100 text-blue-800';
      default:
        return '';
    }
  };

  const getListingTypeLabel = (type: string) => {
    return type === ListingTypes.RENT ? 'Cho thuê' : 'Bán';
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='max-w-4xl p-0 overflow-hidden'>
        <div className='overflow-y-auto max-h-[calc(90vh-30px)] px-6 py-6'>
          <div className='flex flex-col '>
            <DialogHeader className=''>
              <div className='flex items-start justify-between'>
                <div>
                  <DialogTitle className='text-[16px] font-[600] text-gray-600 '>{postWithDefaults.title}</DialogTitle>
                  <DialogDescription className='mt-1 flex items-center text-sm'>
                    <MapPin className='mr-1 h-3 w-3' />
                    {postWithDefaults.address}
                  </DialogDescription>
                </div>
                <div className='flex items-center space-x-2'>
                  <Badge variant='outline' className={getStatusColor(postWithDefaults.status)}>
                    {postWithDefaults.status}
                  </Badge>
                  <Badge variant='outline' className='bg-purple-100 text-purple-800'>
                    {getListingTypeLabel(postWithDefaults.listingType as string)}
                  </Badge>
                </div>
              </div>
            </DialogHeader>
            <Tabs
              defaultValue='overview'
              value={activeTab}
              onValueChange={setActiveTab}
              className='flex-1 overflow-hidden'
            >
              <div className=' my-4'>
                <TabsList className='h-10 border border-gray-200 bg-transparent '>
                  <TabsTrigger
                    value='overview'
                    className='data-[state=active]:font-medium data-[state=active]:bg-red-500 data-[state=active]:text-white px-[18px] '
                  >
                    Tổng quan
                  </TabsTrigger>
                  <TabsTrigger
                    value='details'
                    className='data-[state=active]:font-medium data-[state=active]:bg-red-500 data-[state=active]:text-white px-[18px] '
                  >
                    Chi tiết
                  </TabsTrigger>
                  <TabsTrigger
                    value='images'
                    className='data-[state=active]:font-medium data-[state=active]:bg-red-500 data-[state=active]:text-white px-[18px] '
                  >
                    Hình ảnh
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value='overview' className='m-0'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <div className='md:col-span-2 space-y-6'>
                    <div className='space-y-4'>
                      <div className='aspect-video relative rounded-lg overflow-hidden border'>
                        <img
                          src={postWithDefaults.images[0].imageUrl || '/placeholder.svg'}
                          alt={postWithDefaults.title}
                          className='object-cover'
                        />
                        <div className='absolute bottom-2 right-2'>
                          <Badge className='bg-black/70 text-white hover:bg-black/60'>
                            {postWithDefaults.images.length} hình ảnh
                          </Badge>
                        </div>
                      </div>
                      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        <div className='flex flex-col items-center justify-center p-3 rounded-lg border border-r-gray-200'>
                          <DollarSign className='h-5 w-5 text-slate-600 mb-1' />
                          <span className='text-sm text-slate-500'>Giá</span>
                          <span className='font-[500] text-gray-600 '>
                            {formatPrice(postWithDefaults.price, postWithDefaults.priceUnit)}
                          </span>
                        </div>
                        <div className='flex flex-col items-center justify-center p-3 rounded-lg border border-r-gray-200'>
                          <Maximize2 className='h-5 w-5 text-slate-600 mb-1' />
                          <span className='text-sm text-slate-500'>Diện tích</span>
                          <span className='font-[500] text-gray-600 '>{postWithDefaults.squareMeters} m²</span>
                        </div>
                        <div className='flex flex-col items-center justify-center p-3 rounded-lg border border-r-gray-200'>
                          <Bed className='h-5 w-5 text-slate-600 mb-1' />
                          <span className='text-sm text-slate-500'>Phòng ngủ</span>
                          <span className='font-[500] text-gray-600 '>{postWithDefaults.bedroom}</span>
                        </div>
                        <div className='flex flex-col items-center justify-center p-3 rounded-lg border border-r-gray-200'>
                          <Bath className='h-5 w-5 text-slate-600 mb-1' />
                          <span className='text-sm text-slate-500'>Phòng tắm</span>
                          <span className='font-[500] text-gray-600 '>{postWithDefaults.bathroom}</span>
                        </div>
                      </div>
                      <div>
  <h3 className='text-[16px] text-gray-700 font-semibold mb-2'>Mô tả</h3>
  <div className='text-slate-600' dangerouslySetInnerHTML={{ __html: postWithDefaults.description }} />
</div>

                    </div>
                  </div>
                  <div className='space-y-6'>
                    <div className='border rounded-lg p-4'>
                      <h3 className='font-semibold mb-3'>Thông tin người đăng</h3>
                      <div className='flex items-center space-x-3 mb-4'>
                        <Avatar>
                          <AvatarImage
                            src={postWithDefaults.user.avatar}
                          />
                          <AvatarFallback>{postWithDefaults.user.fullname.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className='font-medium'>{postWithDefaults.user.fullName}</div>
                          <div className='text-sm text-slate-500'>{postWithDefaults.user.email}</div>
                        </div>
                      </div>
                      <Button variant='outline' className='w-full' size='sm'>
                        <User className='mr-2 h-4 w-4' />
                        Xem hồ sơ người dùng
                      </Button>
                    </div>
                    <div className='border rounded-lg p-4 space-y-3'>
                      <h3 className='font-semibold'>Trạng thái bài đăng</h3>
                      <div className='flex justify-between items-center text-sm'>
                        <span className='text-slate-500'>Ngày đăng</span>
                        <span className='font-medium'>
                          {format(postWithDefaults.createdAt, 'dd/MM/yyyy', { locale: vi })}
                        </span>
                      </div>
                      <div className='flex justify-between items-center text-sm'>
                        <span className='text-slate-500'>Ngày hết hạn</span>
                        <span className='font-medium'>
                          {format(postWithDefaults.expiredDate, 'dd/MM/yyyy', { locale: vi })}
                        </span>
                      </div>
                      <div className='flex justify-between items-center text-sm'>
                        <span className='text-slate-500'>Thời gian còn lại</span>
                        {/* <Badge
                          variant='outline'
                          className={
                            daysUntilExpiry > 30 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {daysUntilExpiry} ngày
                        </Badge> */}
                      </div>
                      <div className='flex justify-between items-center text-sm'>
                        <span className='text-slate-500'>Xác minh</span>
                        {postWithDefaults.verified ? (
                          <Badge variant='outline' className='bg-green-100 text-green-800'>
                            <Check className='mr-1 h-3 w-3' /> Đã xác minh
                          </Badge>
                        ) : (
                          <Badge variant='outline' className='bg-red-100 text-red-800'>
                            Chưa xác minh
                          </Badge>
                        )}
                      </div>
                      <div className='flex justify-between items-center text-sm'>
                        <span className='text-slate-500'>Mức ưu tiên</span>
                        <div className='flex items-center'>
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < postWithDefaults.priority ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='currentColor'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='details' className='m-0 space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-4'>
                    <h3 className='text-[16px] text-gray-700 font-semibold'>Thông tin chi tiết</h3>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='space-y-1'>
                        <p className='text-sm text-slate-500'>ID bài đăng</p>
                        <p className='font-medium text-[14px] text-gray-600'>{postWithDefaults.id}</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm text-slate-500'>Loại tin đăng</p>
                        <p className='font-medium text-[14px] text-gray-600'>{getListingTypeLabel(postWithDefaults.listingType as string)}</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm text-slate-500'>Giá</p>
                        <p className='font-medium text-[14px] text-gray-600'>{formatPrice(postWithDefaults.price, postWithDefaults.priceUnit)}</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm text-slate-500'>Diện tích</p>
                        <p className='font-medium text-[14px] text-gray-600'>{postWithDefaults.squareMeters} m²</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm text-slate-500'>Số phòng ngủ</p>
                        <p className='font-medium text-[14px] text-gray-600'>{postWithDefaults.bedroom}</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm text-slate-500'>Số phòng tắm</p>
                        <p className='font-medium text-[14px] text-gray-600'>{postWithDefaults.bathroom}</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm text-slate-500'>Tầng</p>
                        <p className='font-medium text-[14px] text-gray-600'>{postWithDefaults.floor}</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm text-slate-500'>Hướng</p>
                        <p className='font-medium text-[14px] text-gray-600'>{formatDirection(postWithDefaults.direction)}</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm text-slate-500'>Nội thất</p>
                        <p className='font-medium text-[14px] text-gray-600'>{postWithDefaults.isFurniture ? 'Đầy đủ' : 'Không có'}</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm text-slate-500'>Trạng thái</p>
                        <Badge variant='outline' className={getStatusColor(postWithDefaults.status)}>
                          {postWithDefaults.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className='space-y-4'>
                    <h3 className='text-[16px] text-gray-700 font-semibold'>Thông tin thêm</h3>
                    <div className='space-y-1'>
                      <p className='text-sm text-slate-500'>Địa chỉ đầy đủ</p>
                      <p className='font-medium text-[14px] text-gray-600'>{postWithDefaults.address}</p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm text-slate-500'>Slug URL</p>
                      <p className='font-medium text-[14px] text-gray-600 text-blue-600'>/posts/{postWithDefaults.slug}</p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm text-slate-500'>Ngày tạo</p>
                      <p className='font-medium text-[14px] text-gray-600'>
                        {format(postWithDefaults.createdAt, 'HH:mm - dd/MM/yyyy', { locale: vi })}
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm text-slate-500'>Cập nhật lần cuối</p>
                      <p className='font-medium text-[14px] text-gray-600'>
                        {format(postWithDefaults.updatedAt, 'HH:mm - dd/MM/yyyy', { locale: vi })}
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm text-slate-500'>Ngày hết hạn</p>
                      <p className='font-medium text-[14px] text-gray-600'>
                        {format(postWithDefaults.expiredDate, 'dd/MM/yyyy', { locale: vi })}
                        <Badge variant='outline' className='ml-2'>
                          Còn {daysUntilExpiry} ngày
                        </Badge>
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='images' className='m-0'>
                <div className='space-y-6'>
                  <div className='aspect-video relative rounded-lg overflow-hidden border'>
                    <img
                      src={postWithDefaults.images[selectedImageIndex].imageUrl  || '/placeholder.svg'}
                      alt={`Hình ảnh ${selectedImageIndex + 1}`}
                      className='object-cover w-full h-full '
                    />
                  </div>
                  <div className='grid grid-cols-5 gap-2'>
                    {postWithDefaults.images.map((image:any, index:number) => (
                      <div
                        key={index}
                        className={`aspect-video relative rounded-md overflow-hidden cursor-pointer border-2 ${
                          selectedImageIndex === index ? 'border-red-300' : 'border-transparent'
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <img
                          src={image.imageUrl || '/placeholder.svg'}
                          alt={`Thumbnail ${index + 1}`}
                          className='object-cover w-full h-full '
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter className='mt-6'>
              <div className='flex items-center justify-between w-full'>
                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => window.open(`/posts/${postWithDefaults.slug}`, '_blank')}
                  >
                    <ExternalLink className='mr-2 h-4 w-4' />
                    Xem trang công khai
                  </Button>
                  <Button variant='outline' size='sm'>
                    <Share2 className='mr-2 h-4 w-4' />
                    Chia sẻ
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
