import { Loading } from "@/components/common";
import { useGetAllNews } from "../hook/use-getall-news";
import { convertDate } from "@/lib/convert-date";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ListNew ()
{
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetAllNews( 5 );
  const newsList = data?.pages.flatMap( page => page.data ) || [];


  console.log( hasNextPage )

  return (
    <div className="mb-[30px] mt-[-40px]">
      { isLoading ? (
        <Loading className="my-[150px]" />
      ) : (
        <div>
          { newsList.slice(5).map( ( news: any,index:number ) => (
            <div key={`${news?.id}-${index}`} className="grid grid-cols-12 mb-[20px] w-full space-x-5">
              <Link to={`/new/${news?.slug}`} className="col-span-12 grid grid-cols-12 gap-4">
              <div className="col-span-4 relative">
                <img src={ news?.imageUrl } alt="ảnh new" className="rounded-[8px] w-[260px] h-[150px] object-cover" />
                <div className="absolute top-[10px] bg-[#505050] rounded-br-[5px] rounded-tr-[5px] px-[10px] py-[2px] text-[#fff] text-sm">
                  { news?.category }
                </div>
              </div>
              <div className="col-span-8 pr-[15px] py-[15px] space-y-1">
                <div className="flex items-center text-gray-400 text-sm gap-2 font-[400]">
                  <span>{ convertDate( news?.createdAt ) } • </span>
                  <span>{ news?.author?.fullname || "Ẩn danh" }</span>
                </div>
                <div>
                  <span className="font-[400] text-[18px] line-clamp-2">{ news?.title }</span>
                </div>
                <div className="">
                  <span className="text-sm font-[400] w-full line-clamp-3 "dangerouslySetInnerHTML={{ __html: news?.content || '' }} ></span>
                </div>
              </div>
              </Link>
              <div className="border border-gray-100 col-span-12 mt-[20px]"></div>
            </div>
          ) ) }
          { hasNextPage && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={ () => fetchNextPage() }
                disabled={ isFetchingNextPage }
              >
                { isFetchingNextPage ? "Đang tải..." : "Xem thêm" }
              </Button>
            </div>
          ) }
        </div>
      ) }
    </div>
  );
}
