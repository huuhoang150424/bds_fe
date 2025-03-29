import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"

export default function NewsCarousel() {
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
        <CarouselContent>
          <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">
            <Card className="border-none">
              <CardContent className="p-0">
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                  <img
                    src="https://file4.batdongsan.com.vn/crop/393x222/2024/03/23/20240323141334-a1f4_wm.jpg"
                    alt="Chu kì mới của thị trường BĐS"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="pt-4">
                  <h3 className="font-semibold text-base line-clamp-2 hover:text-[#E03C31] cursor-pointer">
                    Chu Kì Mới Của Thị Trường Bất Động Sản Sẽ Diễn Biến Ra Sao?
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">⏳ 6 giờ trước</p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>

          <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">
            <Card className="border-none">
              <CardContent className="p-0">
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                  <img
                    src="https://file4.batdongsan.com.vn/crop/393x222/2024/03/23/20240323094614-8e58_wm.jpg"
                    alt="Bảng lãi suất Agribank"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="pt-4">
                  <h3 className="font-semibold text-base line-clamp-2 hover:text-[#E03C31] cursor-pointer">
                    Bảng Lãi Suất Ngân Hàng Agribank Tháng 03/2024 Mới Nhất
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">⏳ 1 ngày trước</p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>

          <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">
            <Card className="border-none">
              <CardContent className="p-0">
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                  <img
                    src="https://file4.batdongsan.com.vn/crop/393x222/2024/03/22/20240322143242-fcd7_wm.jpg"
                    alt="Thách thức thị trường Lê Hà Nội"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="pt-4">
                  <h3 className="font-semibold text-base line-clamp-2 hover:text-[#E03C31] cursor-pointer">
                    Thách Thức Của Thị Trường Bán Lẻ Hà Nội
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">⏳ 2 ngày trước</p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>

          <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">
            <Card className="border-none">
              <CardContent className="p-0">
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                  <img
                    src="https://file4.batdongsan.com.vn/crop/393x222/2024/03/22/20240322111449-5cd4_wm.jpg"
                    alt="Thị trường BĐS phía Nam"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="pt-4">
                  <h3 className="font-semibold text-base line-clamp-2 hover:text-[#E03C31] cursor-pointer">
                    Thị Trường Bất Động Sản Phía Nam: Dấu Hiệu Khởi Sắc
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">⏳ 3 ngày trước</p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12 hover:bg-[#E03C31] hover:text-white shadow-md" />
        <CarouselNext className="hidden md:flex -right-12 hover:bg-[#E03C31] hover:text-white shadow-md" />
      </Carousel>
    </div>
  )
}

