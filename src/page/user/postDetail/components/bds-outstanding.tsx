import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { useGetPostHabbit } from '../hooks/use-get-post-habbit';
import { useNavigate } from 'react-router-dom';
import CardItem from '@/components/user/card';

const CardItemSkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-lg animate-pulse">
      <div className="relative">
        <div className="absolute top-3 left-3 z-[10] bg-gray-200 h-6 w-12 rounded"></div>
        <div className="grid grid-cols-5 grid-rows-2 gap-0.5 h-[250px] px-[8px] pt-[8px]">
          <div className="col-span-3 row-span-2 bg-gray-200 rounded-l-lg"></div>
          <div className="col-span-2 col-start-4 bg-gray-200 rounded-tr-lg"></div>
          <div className="col-start-4 row-start-2 bg-gray-200"></div>
          <div className="col-start-5 row-start-2 bg-gray-200 rounded-br-lg"></div>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-2">
          <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="h-5 w-24 bg-gray-200 rounded"></div>
            <div className="flex items-center gap-2">
              <Maximize className="h-5 w-5 text-gray-400" />
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Bed className="h-5 w-5 text-gray-400" />
                <div className="h-4 w-6 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-5 w-5 text-gray-400" />
                <div className="h-4 w-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            <div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-3 w-16 bg-gray-200 rounded mt-1"></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-28 bg-gray-200 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton Component for BdsForU
const BdsForUSkeleton = () => {
  return (
    <div className="w-full py-[30px] animate-pulse">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="h-8 w-1/3 bg-gray-200 rounded mb-[30px]"></div>
          <div className="h-6 w-20 bg-gray-200 rounded"></div>
        </div>
        <div className="relative">
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="basis-1/3">
                <CardItemSkeleton />
              </div>
            ))}
          </div>
          <div className="absolute left-[-35px] top-1/2 -translate-y-1/2 bg-gray-200 h-10 w-10 rounded-full"></div>
          <div className="absolute right-[-35px] top-1/2 -translate-y-1/2 bg-gray-200 h-10 w-10 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

function BdsForU() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetPostHabbit();

  if (isLoading) return <BdsForUSkeleton />;
  if (isError) return <div>Something went wrong</div>;
  return (
    <div className="w-full py-[30px]">
      <div className="content max-w-6xl mx-auto">
        <div className="title flex justify-between items-center">
          <h2 className="text-[22px] font-[500] mb-[30px]">Bất động sản dành cho bạn</h2>
          <div className="flex"></div>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              skipSnaps: false,
              slidesToScroll: 4,
            }}
            className="w-full"
          >
            <CarouselContent className="ml-4">
              {data?.data?.map((post: any, index: number) => (
                <CarouselItem key={post?.id} className="pl-4 basis-1/3">
                  <CardItem post={post} />
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
  );
}

export default BdsForU;