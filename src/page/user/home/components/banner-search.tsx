import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import BannerFilter from './banner-filter';
import { Skeleton } from '@/components/ui/skeleton';
import { useTopPosts } from '../hook/use-get-top-post';

interface BannerSearchProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const imageVariants = {
  initial: {
    scale: 1.1,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const titleVariants = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: (custom: any) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: custom * 0.07,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export default function BannerSearch({ activeTab, setActiveTab }: BannerSearchProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const autoPlayRef = useRef<any>(null);
  const imageRefs = useRef<HTMLImageElement[]>([]);

  const { data: properties, isLoading, error } = useTopPosts();

  useEffect(() => {
    if (properties && properties.length > 0) {
      const preloadImages = async () => {
        const promises = properties.map(
          (property) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = property.images[0]?.image_url || '';
              img.onload = () => resolve(true);
              img.onerror = () => resolve(false);
              imageRefs.current.push(img);
            }),
        );
        await Promise.all(promises);
      };
      preloadImages();
    }
  }, [properties]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (properties?.length || 1));
  }, [properties]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (properties?.length || 1)) % (properties?.length || 1));
  }, [properties]);

  useEffect(() => {
    if (isAutoPlaying && !isLoading && properties?.length) {
      autoPlayRef.current = setTimeout(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, nextSlide, currentIndex, isLoading, properties]);

  const handleMouseEnter = useCallback(() => setIsAutoPlaying(false), []);
  const handleMouseLeave = useCallback(() => setIsAutoPlaying(true), []);

  const toggleFavorite = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const formatPrice = (price: number) => {
    if (price >= 1_000_000_000) {
      return `${(price / 1_000_000_000).toFixed(1)} tỷ`;
    }
    return `${(price / 1_000_000).toFixed(0)} triệu`;
  };

  const SkeletonLoader = () => (
    <div className='relative w-full rounded-xl h-[400px] mb-[30px]'>
      <div className='absolute inset-0 flex flex-col gap-4 p-6'>
        <Skeleton className='h-8 w-1/3' />
        <Skeleton className='h-10 w-2/3' />
        <Skeleton className='h-6 w-1/2' />
        <div className='flex gap-3'>
          <Skeleton className='h-8 w-24' />
          <Skeleton className='h-8 w-24' />
          <Skeleton className='h-8 w-24' />
        </div>
        <div className='flex justify-between items-center'>
          <Skeleton className='h-8 w-1/4' />
          <Skeleton className='h-10 w-32' />
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className='relative w-full rounded-xl h-[400px] mb-[30px] flex items-center justify-center'>
        <p className='text-red-500'>Error loading posts: {error.message}</p>
      </div>
    );
  }

  if (isLoading || !properties || properties.length === 0) {
    return <SkeletonLoader />;
  }

  const property = properties[currentIndex];

  return (
    <div
      className='relative w-full rounded-xl h-[400px] mb-[30px]'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <BannerFilter activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className='relative aspect-[16/9] w-full overflow-hidden h-[400px]'>
        <div className='absolute inset-0'>
          <div className='relative h-full w-full shadow-2xl'>
            <div className='absolute inset-0 p-3'>
              <div className='relative h-full w-full rounded-[16px] overflow-hidden'>
                <motion.div
                  key={currentIndex}
                  className='absolute inset-0 bg-cover bg-center'
                  style={{
                    backgroundImage: `url(${property.images[0]?.image_url || ''})`,
                    transform: 'translateZ(0)',
                  }}
                  initial='initial'
                  animate='animate'
                  variants={imageVariants}
                />
                <div className='absolute inset-0 bg-black/30' />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
              onClick={(e) => toggleFavorite(property.id, e)}
              className={cn(
                'absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-colors',
                isFavorite(property.id) ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30',
              )}
            >
              <Heart className={cn('h-5 w-5 transition-all', isFavorite(property.id) && 'fill-current')} />
            </motion.button>

            <div className='absolute bottom-0 top-[80px] left-0 right-0 py-6 px-6 md:px-[80px] text-white'>
              <motion.div
                key={`verified-${currentIndex}`}
                variants={titleVariants}
                custom={0}
                initial='initial'
                animate='animate'
                className='mb-4'
              >
                {property.verified && (
                  <span className='rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white'>
                    Đã xác thực
                  </span>
                )}
              </motion.div>

              <motion.h2
                key={`title-${currentIndex}`}
                variants={titleVariants}
                custom={1}
                initial='initial'
                animate='animate'
                className='mb-2 text-2xl font-bold tracking-tight md:text-4xl'
              >
                {property.title.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: index * 0.02,
                        duration: 0.3,
                      },
                    }}
                    className='inline-block'
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h2>

              <motion.div
                key={`location-${currentIndex}`}
                variants={titleVariants}
                custom={2}
                initial='initial'
                animate='animate'
                className='mb-3 flex items-center'
              >
                <MapPin className='mr-1 h-4 w-4' />
                <p className='text-sm font-medium md:text-base'>{property.address}</p>
              </motion.div>

              <motion.div
                key={`amenities-${currentIndex}`}
                variants={titleVariants}
                custom={3}
                initial='initial'
                animate='animate'
                className='mb-4 flex flex-wrap gap-3'
              >
                {property.bedroom && (
                  <div className='flex items-center rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm'>
                    <Bed className='mr-1 h-4 w-4' />
                    <span className='text-sm'>{property.bedroom} Giường</span>
                  </div>
                )}
                {property.bathroom && (
                  <div className='flex items-center rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm'>
                    <Bath className='mr-1 h-4 w-4' />
                    <span className='text-sm'>{property.bathroom} Nhà tắm</span>
                  </div>
                )}
                <div className='flex items-center rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm'>
                  <Square className='mr-1 h-4 w-4' />
                  <span className='text-sm'>{property.squareMeters} m²</span>
                </div>
              </motion.div>

              <motion.div
                key={`price-button-${currentIndex}`}
                variants={titleVariants}
                custom={4}
                initial='initial'
                animate='animate'
                className='flex items-center justify-between'
              >
                <p className='text-2xl font-bold md:text-3xl'>{formatPrice(property.price)}</p>
                <Button className='relative overflow-hidden bg-white text-black hover:bg-white/90 mt-4 md:mt-0'>
                  <span className='relative z-10'>Xem chi tiết</span>
                  <motion.span
                    className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20'
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        <div className='absolute left-6 right-6 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between'>
          <Button
            variant='ghost'
            size='icon'
            onClick={prevSlide}
            className='h-10 w-10 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white'
            disabled={isLoading}
          >
            <ChevronLeft className='h-5 w-5' />
          </Button>

          <Button
            variant='ghost'
            size='icon'
            onClick={nextSlide}
            className='h-10 w-10 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white'
            disabled={isLoading}
          >
            <ChevronRight className='h-5 w-5' />
          </Button>
        </div>
      </div>
    </div>
  );
}