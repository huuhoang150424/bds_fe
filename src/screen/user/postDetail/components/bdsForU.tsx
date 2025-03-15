import { CustomImage } from '@/components/common'
import { Card, CardContent } from '@/components/ui/card'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@radix-ui/react-hover-card'
import React from 'react'
import { AiOutlinePicture } from 'react-icons/ai'
import { CiHeart } from 'react-icons/ci'
import { IoLocationOutline } from 'react-icons/io5'
import { recommendedProperties } from '@/constant/constPostDetail'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight } from 'lucide-react'

function BdsForU() {
  return (
    <div className='bg-gray-100 w-full px-[60px] pt-[30px] pb-[60px]'>
      <div className='content mx-auto max-w-6xl px-[60px]'>
        <div className='title flex justify-between items-center pb-[20px]'>
          <h2 className='text-[22px] font-bold'>Bất động sản dành cho bạn</h2>
          <div className='flex'>
            <div className='block pr-[10px] border border-r-[1px border-r-gray-500 text-[12px]'>
              <span>
                <a href='#'>Tin nhà đất mới</a>
              </span>
            </div>
            <div className='block border border-r-[1px] text-[12px] ml-[10px]'>
              <span>
                <a href='#'>Tin nhà đất cho thuê mới</a>
              </span>
            </div>
          </div>
        </div>

        <div className='relative'>
          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              slidesToScroll: 4
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {recommendedProperties.map((property, index) => (
                <CarouselItem key={index} className="pl-4 basis-1/4">
                  <Card className='rounded-[5px] h-[350px]'>
                    <CardContent className='p-0 relative h-full'>
                      <div className='overflow-hidden w-full h-[200px]'>
                        <CustomImage
                          src={property.images[0]}
                          alt='Placeholder Image'
                          width='full'
                          height='full'
                          className='rounded-t-[5px] w-full h-full object-cover'
                        />
                      </div>
                      <div className='flex'>
                        <AiOutlinePicture className='text-[#fff] absolute top-[160px] right-[30px] text-[24px]' />
                        <p className='text-[#fff] absolute top-[160px] right-[15px] text-[16px]'>
                          {property.images.length}
                        </p>
                      </div>
                      <div className='px-[15px] pt-[15px]'>
                        <div className='h-[45px] overflow-hidden'>
                          <span className='font-[700] text-[#2C2C2C] text-sm line-clamp-2'>{property.title}</span>
                        </div>
                        <div className='text-red flex mt-[10px]'>
                          <div className='text-[#E03C31] mr-[30px] font-[500]'>
                            <span>{property.price}</span>
                          </div>
                          <div className='text-[#E03C31] font-[500]'>
                            <span>{property.area}</span>
                          </div>
                        </div>
                        <div className='flex justify-start items-center mt-[5px]'>
                          <IoLocationOutline />
                          <span className='text-sm ml-[5px] truncate'>{property.location}</span>
                        </div>
                        <div className='flex justify-between items-center mt-[10px]'>
                          <span className='text-[14px] text-gray-400'>Đăng hôm nay</span>
                          <HoverCard>
                            <HoverCardTrigger className='border p-[5px] rounded-[5px]'>
                              <CiHeart className='font-bold text-[18px]' />
                            </HoverCardTrigger>
                            <HoverCardContent>Bấm để lưu tin</HoverCardContent>
                          </HoverCard>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2">
              <ChevronLeft className="w-5 h-5" />
            </CarouselPrevious>
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2">
              <ChevronRight className="w-5 h-5" />
            </CarouselNext>
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default BdsForU