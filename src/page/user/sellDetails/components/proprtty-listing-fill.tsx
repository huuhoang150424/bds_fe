import { Link } from 'react-router-dom';
import PropertyCard from './property-card';
import { useState, useEffect } from 'react';
import { useGetPostByFilter } from '../hooks/use-fill-post';

// Interface cho các property
interface Image {
  image_url: string;
}

interface User {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  avatar: string;
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

interface PropertyListingsFillProps {
    keyword: string[];
    bedrooms?: number;
    bathrooms?: number;
    floors?: number;
    direction?: string;
    priceRange?: [number, number];
    areaRange?: [number, number];
  }
  
  export default function PropertyListingsFill({
    keyword,
    bedrooms,
    bathrooms,
    floors,
    direction,
    priceRange,
    areaRange,
  }: PropertyListingsFillProps) {
    const [page, setPage] = useState(1);
  
    const filterParams = {
      keyword: keyword.length > 0 ? keyword : undefined, // Sử dụng keyword từ props
      bedrooms: bedrooms && bedrooms > 0 ? bedrooms : undefined,
      bathrooms: bathrooms && bathrooms > 0 ? bathrooms : undefined,
      floor: floors && floors > 0 ? floors : undefined,
      direction: direction && direction !== '' ? direction : undefined,
      minPrice: priceRange && priceRange[0] > 0 ? priceRange[0] * 1000000000 : undefined,
      maxPrice: priceRange && priceRange[1] <= 20 ? priceRange[1] * 1000000000 : undefined,
      minSquareMeters: areaRange && areaRange[0] ? areaRange[0] : undefined,
      maxSquareMeters: areaRange && areaRange[1]? areaRange[1] : undefined,
    };
  
    const { data, isLoading, isError } = useGetPostByFilter(filterParams);
  
    console.log('Data received:', data);
    console.log('Filter params:', filterParams);
    console.log('Keyword:', keyword);
  
    const totalListings = data?.posts?.length || 0;
  
    return (
      <div className='post w-full lg:w-[75%] p-[15px] overflow-y-auto'>
        <div className='post__title mb-[30px]'>
          <h2 className='text-[22px] font-[650] mb-[10px]'>Mua bán bất động sản trên toàn quốc</h2>
          <p className='font-[400] text-[14px] text-sm'>
            {isLoading ? 'Đang tìm kiếm...' : `Hiện có ${totalListings} bất động sản phù hợp với tiêu chí tìm kiếm`}
          </p>
        </div>
        <div className='post__detail flex flex-col gap-6'>
          {isLoading ? (
            <div className='flex justify-center items-center py-8'>
              <p className='text-gray-500'>Đang tải dữ liệu...</p>
            </div>
          ) : isError ? (
            <div className='flex justify-center items-center py-8'>
              <p className='text-red-500'>Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.</p>
            </div>
          ) : data?.posts?.length === 0 ? (
            <div className='flex justify-center items-center py-8'>
              <p className='text-gray-500'>Không tìm thấy bất động sản phù hợp với tiêu chí tìm kiếm.</p>
            </div>
          ) : (
            <>
              {data?.posts?.map((post: Post) => (
                <Link key={`${post?.id}-index`} to={`/post/${post?.slug}`}>
                  <PropertyCard {...post} />
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }

