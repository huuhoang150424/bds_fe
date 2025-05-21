import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Maximize, Phone, Heart, Flame } from 'lucide-react';

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
  user: User;
}

export default function PropertyCard(post: Post) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow border border-gray-200 rounded-lg">
      <div className="relative">
        {post.priority > -1 && (
          <Badge className="absolute top-3 left-3 z-[10] bg-red-600 text-white font-bold px-2 py-1 flex items-center gap-1">
            <Flame className="h-4 w-4" />
            <span>VIP</span>
          </Badge>
        )}
        <div className="grid grid-cols-5 grid-rows-2 gap-0.5 h-[250px] px-[8px] pt-[8px]">
          <div className="col-span-3 row-span-2 relative rounded-l-lg overflow-hidden">
            <img
              src={post.images[0]?.image_url || '/placeholder.svg?height=250&width=300'}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="col-span-2 col-start-4 relative overflow-hidden rounded-tr-lg">
            <img
              src={post.images[1]?.image_url || post.images[0]?.image_url || '/placeholder.svg?height=125&width=150'}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="col-start-4 row-start-2 relative overflow-hidden">
            <img
              src={post.images[2]?.image_url || post.images[0]?.image_url || '/placeholder.svg?height=125&width=150'}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="col-start-5 row-start-2 relative overflow-hidden rounded-br-lg">
            <img
              src={post.images[3]?.image_url || post.images[0]?.image_url || '/placeholder.svg?height=125&width=150'}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            {post.images.length > 4 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-base font-medium">+{post.images.length - 4}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="text-[17px] font-semibold hover:text-[#E03C31] cursor-pointer transition-colors line-clamp-2">
            {post.title}
          </h3>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-5 w-5 text-gray-500" />
            <span className="text-[13px]">{post.address}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[#E03C31] font-bold text-[15px]">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(post.price)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Maximize className="h-5 w-5" />
              <span className="font-medium text-[13px]">{post.squareMeters} m²</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-gray-700">
                <Bed className="h-5 w-5" />
                <span className="text-[13px]">{post.bedroom}</span>
              </span>
              <span className="flex items-center gap-1 text-gray-700">
                <Bath className="h-5 w-5" />
                <span className="text-[13px]">{post.bathroom}</span>
              </span>
            </div>
          </div>
          <div className="text-gray-700 line-clamp-2 text-[13px] pt-1">
            {post.description ||
              `The Origami. Giải pháp tích sản thông minh, ai cũng có thể sở hữu. Liên hệ: ${
                post.user?.phone || '0703 888 ***'
              } (${post.user?.fullname || 'Ms Hanh'}). Căn ${post.bedroom}PN loại căn diện tích lớn ${
                post.squareMeters
              }m² giá chỉ ${(post.price / 1000000000).toFixed(2)} tỷ.`}
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border">
              <AvatarImage
                src={post.user?.avatar || '/placeholder.svg?height=40&width=40'}
                alt={post.user?.fullname || 'Agent'}
              />
              <AvatarFallback>{post.user?.fullname?.charAt(0) || 'A'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-[13px] font-semibold">{post.user?.fullname || 'Hanh Pham'}</p>
              <p className="text-[11px] text-gray-500">Đăng hôm nay</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              className="flex items-center gap-2 bg-[#E03C31] hover:bg-[#d02e23] text-white text-[13px]"
              size="sm"
            >
              <Phone className="h-4 w-4" />
              <span>{post.user?.phone || '0703 888 ***'}</span>
            </Button>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-200 hover:border-[#E03C31] hover:text-[#E03C31]"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-fit p-3 bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="text-[13px] text-gray-600">Bấm để lưu tin</div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

