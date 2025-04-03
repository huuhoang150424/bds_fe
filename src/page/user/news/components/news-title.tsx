import { CustomImage } from '@/components/common';
import { useGetAllNews } from '../hook/use-getall-news';
import { Link } from 'react-router-dom';

export default function NewsTitle() {
  const { data, isLoading, error } = useGetAllNews(10); // Fetch 10 bài viết mỗi lần

  if (isLoading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error.message}</p>;

  // Gộp tất cả các trang dữ liệu từ `useInfiniteQuery`
  const allNews = data?.pages?.flatMap((page) => page.data) || [];

  // Lấy bài viết mới nhất (bài đầu tiên sau khi sắp xếp theo `createdAt`)
  const latestPost = allNews[0];

  // Lấy 5 bài viết tiếp theo (bắt đầu từ index 1)
  const nextPosts = allNews.slice(1, 6);
  return (
    <div className='col-span-12 grid grid-cols-12 gap-7'>
      <div className='relative col-span-8 self-start rounded-[8px]'>
        <Link key={`${latestPost?.id}-index`} to={`/new/${latestPost?.slug}`}>
          <CustomImage src={latestPost.imageUrl} alt='ảnh nền' className='w-full object-cover self-start h-[400px] ' />
          <div className='absolute inset-0 bg-black/40'></div>
          <div className='absolute inset-0 flex flex-col justify-center p-6 gap-2 top-[50%] '>
            <div className='text-gray-100 text-[14px] flex gap-2 font-medium leading-[22px]'>
              <span>{new Date(latestPost.createdAt).toLocaleDateString()}</span>
              <span>Tin tức</span>
            </div>
            <h2 className='text-white text-[24px] font-semibold leading-[32px]'>
              {latestPost?.title || 'Tin tức bất động sản mới nhất'}
            </h2>
            <p className='text-white text-[16px] font-normal leading-[26px]'>{latestPost?.content}</p>
          </div>
        </Link>
      </div>
      <div className='col-span-4 '>
        {nextPosts.map((post, index) => (
          <div key={index} className=' w-full '>
            <Link key={`${post?.id}-index`} to={`/new/${post?.slug}`}>
              <div className=' pr-[15px] py-[15px] space-y-1 '>
                <div className='flex  text-sm gap-2 font-[400]'>
                  <span className=''>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <strong className='text-gray-600'>{post?.author?.fullname}</strong>
                </div>
                <div>
                  <span className='font-[400] text-[16px] line-clamp-2 '>{post?.title}</span>
                </div>
              </div>
            </Link>
            <div className='border border-gray-100 flex justify-center'></div>
          </div>
        ))}
      </div>
    </div>
  );
}
