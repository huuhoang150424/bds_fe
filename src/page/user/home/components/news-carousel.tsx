import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Link } from "react-router-dom";
import { useGetAllNews } from "../hook/use-getall-news";

export default function NewsCarousel() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetAllNews(5);
  const newsList = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="max-w-6xl mx-auto py-8 md:py-12">
      <div className="flex justify-between items-center pb-6">
        <h2 className="text-xl font-bold text-gray-900">Tin tức bất động sản</h2>
        <Button
          variant="link"
          className="text-[#E03C31] hover:text-[#FF837A] text-sm font-semibold transition-colors duration-200"
          asChild
        >
          <Link to="/news">Xem thêm →</Link>
        </Button>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="flex gap-4">
          {isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <CarouselItem
                key={`skeleton-${index}`}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <Card className="border border-gray-200 rounded-lg h-full">
                  <CardContent className="p-0">
                    <div className="relative h-48 bg-gray-200 animate-pulse rounded-t-lg"></div>
                    <div className="p-4 space-y-2">
                      <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3"></div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))
          ) : (
            newsList.map((news, index) => (
              <CarouselItem
                key={news?.id}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <Card className="border border-gray-200 rounded-lg h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Link to={`/news/${news?.slug}`}>
                    <CardContent className="p-0 flex-grow">
                      <div className="relative h-48">
                        <img
                          src={news?.imageUrl || "https://file4.batdongsan.com.vn/crop/393x222/2024/03/23/20240323141334-a1f4_wm.jpg"}
                          alt={news?.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-t-lg"></div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg line-clamp-2 hover:text-[#E03C31] transition-colors duration-200">
                          {news?.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-2 flex items-center">
                          ⏳ {news?.createdAt}
                        </p>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12 bg-white border border-gray-200 hover:bg-[#E03C31] hover:text-white hover:border-[#E03C31] shadow-md transition-all duration-200" />
        <CarouselNext className="hidden md:flex -right-12 bg-white border border-gray-200 hover:bg-[#E03C31] hover:text-white hover:border-[#E03C31] shadow-md transition-all duration-200" />
      </Carousel>
    </div>
  );
}