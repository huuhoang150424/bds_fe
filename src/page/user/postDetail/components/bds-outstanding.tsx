import { CustomImage, Loading } from '@/components/common'
import { Card, CardContent } from '@/components/ui/card'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@radix-ui/react-hover-card'

import { AiOutlinePicture } from 'react-icons/ai'
import { CiHeart } from 'react-icons/ci'
import { IoLocationOutline } from 'react-icons/io5'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {useGetPostHabbit} from '../hooks/use-get-post-habbit'
function BdsForU() {
  const {data, isLoading, isError} = useGetPostHabbit();

  if (isLoading) return <div><Loading /></div>
  if (isError) return <div>Something went wrong</div>
  return (
    <div className=' w-full  py-[30px]'>
      <div className='content max-w-6xl '>
        <div className='title flex justify-between items-center'>
          <h2 className='text-2xl font-[500] mb-[30px]'>Bất động sản dành cho bạn</h2>
          <div className='flex'>            
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
            <CarouselContent className="ml-4">
              {data?.data?.map((post : {id: string , images: { image_url: string }[], title : string,   price: number, squareMeters: number , createdAt : string, address : string }, index : number) => (
                <CarouselItem key={post?.id} className="pl-4 basis-1/3">
                  <Card className='rounded-[10px] border border-gray-200 h-full '>
                    <CardContent className='p-0 pb-[10px] relative'>
                      <div className='overflow-hidden w-full '>
                        <CustomImage
                          src={post?.images[0]?.image_url}
                          alt='Placeholder Image'
                          width='full'
                          height='full'
                          className='rounded-t-[5px] object-cover h-[150px] w-full'
                        />
                      </div>
                      <div className='flex'>
                        <AiOutlinePicture className='text-[#fff] absolute top-[100px] right-[30px] text-[24px]' />
                        <p className='text-[#fff] absolute top-[100px] right-[15px] text-[16px]'>
                          {post?.images?.length}
                        </p>
                      </div>
                      <div className='px-[15px]'>
                        <div>
                          <span className='font-[700] text-[#2C2C2C] text-lg my-[10px]'>{post?.title}</span>
                        </div>
                        <div className='text-red flex'>
                          <div className='text-[#E03C31] mr-[30px] font-[500]'>
                            <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(post?.price)}</span>
                          </div>
                          <div className='text-[#E03C31] font-[500]'>
                            <span>{post?.squareMeters} m²</span>
                          </div>
                        </div>
                        <div className='flex justify-start items-center mt-[5px]'>
                          <IoLocationOutline className='text-[30px]'/>
                          <span className='text-sm ml-[5px] font-[0]'>{post?.address}</span>
                        </div>
                        <div className='flex justify-between items-center mt-[10px]'>
                          <span className='text-[14px] text-gray-400'>Đăng vào {new Date(post?.createdAt).toLocaleDateString()}</span>
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
            <CarouselPrevious className="absolute left-[-35px] top-1/2 -translate-y-1/2">
              <ChevronLeft className="w-5 h-5" />
            </CarouselPrevious>
            <CarouselNext className="absolute right-[-35px] top-1/2 -translate-y-1/2">
              <ChevronRight className="w-5 h-5" />
            </CarouselNext>
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default BdsForU






