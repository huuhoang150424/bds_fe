import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetPostOutstanding } from '../hook/use-get-post-outstanding';
import CardItem from '@/components/user/card';
function PostOutStanding() {
  const { data } = useGetPostOutstanding();
  return (
    <div className='flex flex-col gap-[10px] items-center justify-center py-[30px] px-4 mt-[20px] '>
      <div className='w-full max-w-[1200px]'>
        <div className='title flex justify-between items-center mb-[30px]'>
          <h2 className='text-xl font-[500] ml-[30px] text-gray-600 '>Bất động sản nổi bật</h2>
        </div>
        <div className='relative'>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              skipSnaps: false,
              slidesToScroll: 1,
            }}
          >
            <CarouselContent className='ml-4 '>
              {data?.data?.map((post: any) => (
                <CarouselItem key={post?.id} className='pl-4 basis-1/5'>
                  <CardItem post={post} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='absolute left-[-35px] top-1/2 -translate-y-1/2'>
              <ChevronLeft className='w-5 h-5' />
            </CarouselPrevious>
            <CarouselNext className='absolute right-[-35px] top-1/2 -translate-y-1/2'>
              <ChevronRight className='w-5 h-5' />
            </CarouselNext>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default PostOutStanding;
