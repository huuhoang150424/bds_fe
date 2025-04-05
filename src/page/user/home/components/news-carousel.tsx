import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { useState } from "react"
import { getAllNews } from "../service/get-allnews";
import { Loading } from "@/components/common";
import { useGetAllNews } from "../hook/use-getall-news";
import { Link } from "react-router-dom";

export default function NewsCarousel() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetAllNews( 5 );
    const newsList = data?.pages.flatMap( (page: { data: any; }) => page.data ) || [];
    return (
    <div className="max-w-6xl mx-auto py-[60px]">
      <div className="title flex justify-between items-center pb-[20px]">
        <h2 className="text-[22px] font-bold">Tin tức bất động sản</h2>
        <Button variant="link" className="text-[#E03C31] hover:text-[#FF837A]">
          Xem thêm →
        </Button>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        
        <CarouselContent className="flex gap-4 ">
        { isLoading ? (
          <Loading className="my-[150px]" />
        ) : (
          
            newsList.map( (news: any, index: number) => (
              <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3" key={news?.id}>
              <Card className="border border-gray-200 rounded-[10px] h-full  ">
                <Link key={`${news?.id}-index`} to={`/news/${news?.slug}`}>
                <CardContent className="p-0 flex-grow">
                  <div className="relative h-[200px] rounded-lg overflow-hidden">
                    <img
                      src={news?.imageUrl || "https://file4.batdongsan.com.vn/crop/393x222/2024/03/23/20240323141334-a1f4_wm.jpg"}
                      alt="Chu kì mới của thị trường BĐS"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-xl line-clamp-2 hover:text-[#E03C31] cursor-pointer">
                      {news?.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">⏳ {news?.createdAt}</p>
                  </div>
                </CardContent>
                </Link>
              </Card>
            </CarouselItem>
            ))
          
        )}
          
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12 hover:bg-[#E03C31] hover:text-white shadow-md" />
        <CarouselNext className="hidden md:flex -right-12 hover:bg-[#E03C31] hover:text-white shadow-md" />
      </Carousel>
    </div>
  )
}

