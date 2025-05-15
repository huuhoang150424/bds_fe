import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, Star } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import './index.scss';

interface BannerProps {
  banner: {
    id: string;
    title: string;
    imageUrls: string[];
    targetUrl: string;
    displayOrder: number;
    isActive: boolean;
    startDate: string;
    endDate: string;
  };
}

type AnimationType = 'fade' | 'slide' | 'zoom' | 'flip' | 'blur' | 'reveal' | '3d-flip';

export function PremiumSliderDialog({ banner }: BannerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState<AnimationType>('fade');
  const [showConfetti, setShowConfetti] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const isWithinActiveDate = () => {
    const now = new Date();
    const startDate = new Date(banner.startDate);
    const endDate = new Date(banner.endDate);
    return now >= startDate && now <= endDate && banner.isActive;
  };

  const getRandomAnimation = (): AnimationType => {
    const animations: AnimationType[] = ['fade', 'slide', 'zoom', 'flip', 'blur', 'reveal', '3d-flip'];
    return animations[Math.floor(Math.random() * animations.length)];
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setPrevIndex(currentIndex);
    setCurrentIndex(index);
    setAnimationType(getRandomAnimation());
    setTimeout(() => setIsAnimating(false), 800);
  };

  const nextSlide = () => {
    if (!banner.imageUrls || banner.imageUrls.length <= 1) return;
    const newIndex = (currentIndex + 1) % banner.imageUrls.length;
    goToSlide(newIndex);
  };

  const prevSlide = () => {
    if (!banner.imageUrls || banner.imageUrls.length <= 1) return;
    const newIndex = (currentIndex - 1 + banner.imageUrls.length) % banner.imageUrls.length;
    goToSlide(newIndex);
  };

  useEffect(() => {
    if (!isOpen || !banner.imageUrls || banner.imageUrls.length <= 1) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isOpen, banner.imageUrls]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isWithinActiveDate()) {
        setIsOpen(true);
        setTimeout(() => setShowConfetti(true), 300);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [banner]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  if (!isWithinActiveDate() || !banner.imageUrls || banner.imageUrls.length === 0) return null;

  const images = banner.imageUrls.length > 0 ? banner.imageUrls : ['/placeholder.svg?height=400&width=600'];

  const getAnimationClasses = (index: number) => {
    if (index !== currentIndex && index !== prevIndex) return 'opacity-0';

    const isCurrent = index === currentIndex;
    const baseClasses = 'absolute inset-0 w-full h-full transition-all duration-800';

    switch (animationType) {
      case 'fade':
        return cn(baseClasses, isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0');
      case 'slide':
        return cn(
          baseClasses,
          'transition-transform',
          isCurrent ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 -translate-x-full z-0',
        );
      case 'zoom':
        return cn(baseClasses, isCurrent ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-125 z-0');
      case 'flip':
        return cn(baseClasses, 'transition-all', isCurrent ? 'opacity-100 rotate-0 z-10' : 'opacity-0 -rotate-6 z-0');
      case 'blur':
        return cn(baseClasses, isCurrent ? 'opacity-100 blur-0 z-10' : 'opacity-0 blur-xl z-0');
      case 'reveal':
        return cn(baseClasses, isCurrent ? 'opacity-100 clip-path-full z-10' : 'opacity-0 clip-path-none z-0');
      case '3d-flip':
        return cn(
          baseClasses,
          'transition-all transform-style-3d perspective-1000',
          isCurrent ? 'opacity-100 rotateY-0 z-10' : 'opacity-0 rotateY-90 z-0',
        );
      default:
        return cn(baseClasses, isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        ref={dialogRef}
        className='sm:max-w-md md:max-w-lg lg:max-w-xl p-0 overflow-hidden border-none bg-transparent shadow-2xl animate-dialogIn'
      >
        <div className='relative rounded-xl overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 shadow-[0_0_25px_rgba(220,38,38,0.5)]'>

          <div className='absolute inset-0 backdrop-blur-[2px] bg-white/5' />
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=1000')] opacity-10 bg-repeat" />
          <div className='absolute inset-0 rounded-xl p-[2px] overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-r from-red-400/0 via-white/50 to-red-400/0 animate-borderGlow' />
          </div>
          <div className='relative p-4 bg-gradient-to-b from-black/70 via-black/40 to-transparent'>
            <div className='flex items-center justify-center space-x-2'>
              <div className='w-8 h-[1px] bg-gradient-to-r from-transparent to-red-300' />
              <Star className='w-4 h-4 text-yellow-300 animate-pulse' />
              <h2 className='text-white text-center text-sm sm:text-[15px] font-bold drop-shadow-md'>{banner.title}</h2>
              <Star className='w-4 h-4 text-yellow-300 animate-pulse' />
              <div className='w-8 h-[1px] bg-gradient-to-l from-transparent to-red-300' />
            </div>
          </div>

          <div className='relative w-full h-[220px] sm:h-[280px] md:h-[320px] overflow-hidden '>
            {images.map((image, index) => (
              <div key={index} className={getAnimationClasses(index)}>
                <img
                  src={image || '/placeholder.svg'}
                  alt={`Slide ${index + 1}`}
                  className='object-cover w-full h-full'
                />

                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent' />
              </div>
            ))}

            <div className='absolute inset-0 pointer-events-none'>
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className='absolute w-1 h-1 rounded-full bg-white/40 animate-float'
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                    animationDuration: `${3 + Math.random() * 7}s`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
            {showConfetti && (
              <div className='absolute inset-0 pointer-events-none'>
                {[...Array(50)].map((_, i) => (
                  <div
                    key={i}
                    className='absolute w-2 h-2 animate-confetti'
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `-5%`,
                      backgroundColor: [
                        '#ef4444',
                        '#f97316',
                        '#f59e0b',
                        '#eab308',
                        '#84cc16',
                        '#22c55e',
                        '#06b6d4',
                        '#0ea5e9',
                        '#6366f1',
                        '#8b5cf6',
                        '#a855f7',
                        '#ec4899',
                      ][Math.floor(Math.random() * 12)],
                      width: `${Math.random() * 8 + 3}px`,
                      height: `${Math.random() * 8 + 3}px`,
                      animationDuration: `${1 + Math.random() * 3}s`,
                      animationDelay: `${Math.random() * 0.5}s`,
                    }}
                  />
                ))}
              </div>
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className='absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10 group'
                  aria-label='Previous slide'
                >
                  <ChevronLeft className='w-4 h-4 group-hover:animate-bounceLeft' />
                </button>

                <button
                  onClick={nextSlide}
                  className='absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10 group'
                  aria-label='Next slide'
                >
                  <ChevronRight className='w-4 h-4 group-hover:animate-bounceRight' />
                </button>
              </>
            )}

            {images.length > 1 && (
              <div className='absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex space-x-2'>
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={cn(
                      'transition-all duration-300 relative',
                      index === currentIndex
                        ? 'w-6 h-2 bg-white rounded-full'
                        : 'w-2 h-2 bg-white/40 hover:bg-white/70 rounded-full',
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {index === currentIndex && (
                      <span className='absolute inset-0 rounded-full animate-ping bg-white/50' />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Call to action with enhanced styling */}
          <div className='relative p-5 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center'>
            <Link
              to={banner.targetUrl}
              className='inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-xs sm:text-sm font-medium transition-all duration-300 group hover:shadow-lg hover:shadow-red-600/30 hover:scale-105 relative overflow-hidden'
            >
              <span className='absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-30 animate-buttonShine' />

              <span className='relative z-10'>Xem ngay</span>
              <ExternalLink className='relative z-10 ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform' />
            </Link>
            <p className='text-white/60 text-[10px] mt-2 text-center'>Ưu đãi có hạn, nhanh tay đặt hàng ngay!</p>
          </div>


          <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500/0 via-white/70 to-red-500/0 animate-shimmer'></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
