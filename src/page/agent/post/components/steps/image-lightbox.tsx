import type React from 'react';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageLightboxProps {
  images: Array<{ id: string; preview: string; isPrimary?: boolean }>;
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onReplace?: (id: string) => void;
}

export default function ImageLightbox({ images, initialIndex, isOpen, onClose, onReplace }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state when modal opens or image changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
    resetImageTransform();
  }, [initialIndex, isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          navigatePrev();
          break;
        case 'ArrowRight':
          navigateNext();
          break;
        case 'Escape':
          onClose();
          break;
        case '+':
          zoomIn();
          break;
        case '-':
          zoomOut();
          break;
        case 'r':
          rotate();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const resetImageTransform = () => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const navigateNext = () => {
    resetImageTransform();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const navigatePrev = () => {
    resetImageTransform();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 5)); // Allow zooming up to 5x
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 0.5));
  };

  const rotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleDragStart = () => {
    if (scale > 1) {
      setIsDragging(true);
    }
  };

  const handleDrag = (e: any, info: any) => {
    if (scale > 1) {
      setPosition({
        x: position.x + info.delta.x,
        y: position.y + info.delta.y,
      });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleReplaceClick = () => {
    if (fileInputRef.current && onReplace) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && onReplace) {
      onReplace(images[currentIndex].id);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm'
          onClick={handleBackdropClick}
        >
          {onReplace && (
            <input type='file' ref={fileInputRef} onChange={handleFileChange} accept='image/*' className='hidden' />
          )}
          <button
            onClick={onClose}
            className='absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70'
          >
            <X className='h-6 w-6' />
          </button>
          <div className='absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white'>
            {currentIndex + 1} / {images.length}
          </div>
          <div className='absolute inset-0 flex items-center justify-center overflow-hidden'>
            <motion.div
              className='relative h-full w-full overflow-hidden'
              initial={false}
              animate={{
                opacity: isDragging ? 0.8 : 1,
              }}
            >
              <motion.img
                key={`lightbox-${currentIndex}`}
                src={images[currentIndex]?.preview}
                alt={`Image ${currentIndex + 1}`}
                className={`mx-auto mt-[50px] h-[70vh] w-[70vw] object-cover ${
                  scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
                }`}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  rotate: rotation,
                  scale,
                  x: position.x,
                  y: position.y,
                }}
                transition={{ opacity: { duration: 0.2 } }}
                onClick={() => (scale > 1 ? resetImageTransform() : zoomIn())}
                drag={scale > 1}
                dragConstraints={{ left: -2000, right: 2000, top: -2000, bottom: 2000 }} // Increased drag area
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                dragElastic={0.05}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              />
            </motion.div>
          </div>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePrev();
                }}
                className='group absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70'
              >
                <ChevronLeft className='h-6 w-6 transition-transform group-hover:-translate-x-0.5' />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateNext();
                }}
                className='group absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70'
              >
                <ChevronRight className='h-6 w-6 transition-transform group-hover:translate-x-0.5' />
              </button>
            </>
          )}
          <div className='absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-full bg-black/70 p-1.5'>
            <Button
              size='icon'
              variant='ghost'
              className='h-9 w-9 rounded-full text-white hover:bg-white/20'
              onClick={zoomIn}
              title='Phóng to'
            >
              <ZoomIn className='h-5 w-5' />
            </Button>
            <Button
              size='icon'
              variant='ghost'
              className='h-9 w-9 rounded-full text-white hover:bg-white/20'
              onClick={zoomOut}
              title='Thu nhỏ'
            >
              <ZoomOut className='h-5 w-5' />
            </Button>
            <Button
              size='icon'
              variant='ghost'
              className='h-9 w-9 rounded-full text-white hover:bg-white/20'
              onClick={rotate}
              title='Xoay ảnh'
            >
              <RotateCw className='h-5 w-5' />
            </Button>
            {onReplace && (
              <Button
                size='icon'
                variant='ghost'
                className='h-9 w-9 rounded-full text-white hover:bg-white/20'
                onClick={handleReplaceClick}
                title='Thay thế ảnh'
              >
                <Edit className='h-5 w-5' />
              </Button>
            )}
            <Button
              size='icon'
              variant='ghost'
              className='h-9 w-9 rounded-full text-white hover:bg-white/20'
              onClick={resetImageTransform}
              title='Đặt lại'
            >
              <span className='text-xs font-medium'>Reset</span>
            </Button>
          </div>
          <div className='absolute bottom-20 left-4 rounded-md bg-black/50 px-2 py-1 text-xs text-white'>
            {Math.round(scale * 100)}%
          </div>
          {images.length > 1 && (
            <div className='absolute bottom-20 left-1/2 flex max-w-[90vw] -translate-x-1/2 gap-2 overflow-x-auto rounded-lg bg-black/70 p-2'>
              {images.map((image, index) => (
                <motion.button
                  key={`thumb-${image.id}`}
                  className={`relative flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                    currentIndex === index ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                    resetImageTransform();
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={image.preview || '/placeholder.svg'}
                    alt={`Thumbnail ${index + 1}`}
                    className='h-14 w-14 object-cover'
                  />
                  {image.isPrimary && (
                    <div className='absolute bottom-0 left-0 right-0 bg-primary/80 py-0.5 text-center text-[8px] font-medium text-white'>
                      Chính
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          )}
          {scale > 1 && (
            <div className='absolute left-1/2 top-20 -translate-x-1/2 rounded-md bg-black/50 px-3 py-1 text-sm text-white opacity-70'>
              Kéo để di chuyển ảnh
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
