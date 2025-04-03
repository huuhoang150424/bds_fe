import { Link } from "react-router-dom";
import { useGetAllNews } from "../hook/use-getall-news";

export default function NewsPopular ()
{
  const { data, isLoading, error } = useGetAllNews(10); // Fetch 10 bài viết mỗi lần
  
    if (isLoading) return <p>Đang tải...</p>;
    if (error) return <p>Lỗi: {error.message}</p>;
  
    // Gộp tất cả các trang dữ liệu từ `useInfiniteQuery`
    const allNews = data?.pages?.flatMap((page) => page.data) || [];
  
    console.log("allNews", allNews);
    const topViewedPosts = allNews.sort((a, b) => b.view - a.view).slice(0, 5); 
    // Lấy 5 bài viết được xem nhiều nhất

    console.log("topViewedPosts", topViewedPosts);
  return (
    <div className='border rounded-[8px]'>
      <div className='font-[500] text-lg text-center p-[15px]'>
        <span>Bài viết được xem nhiều nhất</span>
      </div>
      <div className='border border-gray-100 col-span-12 mb-[20px] '></div>
      <div>
        { topViewedPosts.map( ( post, index ) => (
          <div key={ index } className="px-[20px]">
            <Link to={`/new/${post?.slug}`}>
            <div className="flex items-center justify-start gap-4">
              <div className="rounded-[50%] w-[32px] h-[32px] text-[#E03C31] bg-[#FFECEB] p-[8px] flex items-center justify-center">
                <span>{ index + 1 }</span>
              </div>
              <span>{post?.title}</span>
            </div>
            <div className="border border-gray-100 my-[20px]"></div></Link>
          </div>
        ) ) }
      </div>

    </div>
  )
}
