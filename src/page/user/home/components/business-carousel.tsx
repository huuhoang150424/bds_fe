import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"

export default function BusinessCarousel() {
  return (
    <div className="max-w-6xl mx-auto px-[60px] pb-[60px]">
      <div className="title flex justify-between items-center pb-[20px]">
        <h2 className="text-[22px] font-bold">Doanh nghiệp tiêu biểu</h2>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/6">
            <div className="p-4 border rounded-lg hover:border-[#E03C31] transition-colors">
              <img
                src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg"
                alt="Green House"
                className="w-full h-auto"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/6">
            <div className="p-4 border rounded-lg hover:border-[#E03C31] transition-colors">
              <img
                src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg"
                alt="Thiên Minh Capital"
                className="w-full h-auto"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/6">
            <div className="p-4 border rounded-lg hover:border-[#E03C31] transition-colors">
              <img
                src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg"
                alt="HausLand"
                className="w-full h-auto"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/6">
            <div className="p-4 border rounded-lg hover:border-[#E03C31] transition-colors">
              <img
                src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg"
                alt="CityLand"
                className="w-full h-auto"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/6">
            <div className="p-4 border rounded-lg hover:border-[#E03C31] transition-colors">
              <img
                src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg"
                alt="Hoàng Thổ Group"
                className="w-full h-auto"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/6">
            <div className="p-4 border rounded-lg hover:border-[#E03C31] transition-colors">
              <img
                src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg"
                alt="Kim Tinh Group"
                className="w-full h-auto"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12 hover:bg-[#E03C31] hover:text-white shadow-md" />
        <CarouselNext className="hidden md:flex -right-12 hover:bg-[#E03C31] hover:text-white shadow-md" />
      </Carousel>
    </div>
  )
}

