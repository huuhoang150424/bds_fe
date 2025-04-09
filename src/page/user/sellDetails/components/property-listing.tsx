import { Link } from 'react-router-dom';
import PropertyCard from './property-card';
import { useGetListPosts } from '../hooks/use-get-list-post';
import { useState } from 'react';
import { PaginationPost } from './pagination';

interface PropertyListingsProps {
  realEstateListings: any[];
  totalListings: number;
}

// Interface cho Tag trong tagPosts
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
export default function PropertyListings() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetListPosts(5, page);
  console.log('data', data);
  console.log('total Page:', data?.totalPages);
  console.log('total post', data?.posts.length);

  return (
    <div className='post w-full lg:w-[75%] p-[15px] overflow-y-auto'>
      <div className='post__title mb-[30px]'>
        <h2 className='text-[22px] font-[650] mb-[10px]'>Mua bán bất động sản trên toàn quốc</h2>
        <p className='font-[400] text-[14px] text-sm'>Hiện có bất động sản trên toàn quốc</p>
      </div>
      <div className='post__detail flex flex-col gap-6'>
        {isLoading ? (
          <p>Đang tải...</p>
        ) : isError ? (
          <p>Có lỗi xảy ra</p>
        ) : (
          <>
            {data?.posts?.map((post: Post) => (
              <Link key={`${post?.id}-index`} to={`/post/${post?.slug}`}>
                <PropertyCard {...post} />
              </Link>
            ))}
            <PaginationPost page={page} totalPages={data?.totalPages} setPage={setPage} />
          </>
        )}
      </div>
    </div>
  );
}
