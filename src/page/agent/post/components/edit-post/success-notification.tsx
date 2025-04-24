import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SuccessNotificationProps {
  show: boolean;
  onClose?: () => void;
  title?: string;
  message?: string;
  autoClose?: boolean;
  autoCloseTime?: number;
  className?: string;
}

export function SuccessNotification({
  show,
  onClose,
  title = 'Cập nhật thành công',
  message = 'Vui lòng lưu biên lai để xuất trình khi nhận kết quả hồ sơ tại cơ quan chức năng',
  autoClose = true,
  autoCloseTime = 5000,
  className,
}: SuccessNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setAnimationComplete(false);

      if (autoClose) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          if (onClose) onClose();
        }, autoCloseTime);
        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [show, autoClose, autoCloseTime, onClose]);
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    size: Math.random() * 8 + 2,
    duration: Math.random() * 1 + 1,
    delay: Math.random() * 0.5,
  }));
  const ripples = Array.from({ length: 4 }, (_, i) => ({
    delay: i * 0.2,
    duration: 1.8 - i * 0.1,
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn('fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4', className)}
          onClick={() => {
            if (animationComplete) {
              setIsVisible(false);
              if (onClose) onClose();
            }
          }}
        >
          <motion.div
            initial={{ y: 50, scale: 0.9 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 50, scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className='bg-white rounded-lg p-8 max-w-md w-full text-center shadow-xl relative overflow-hidden'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background gradient effect */}
            <motion.div
              className='absolute inset-0 bg-gradient-to-br from-teal-50 to-green-100 opacity-50'
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 1 }}
            />

            <div className='relative mx-auto mb-8 h-32 w-32'>
              {/* Ripple effect */}
              {ripples.map((ripple, index) => (
                <motion.div
                  key={`ripple-${index}`}
                  className='absolute left-1/2 top-1/2 rounded-full border-4 border-teal-300'
                  initial={{
                    x: '-50%',
                    y: '-50%',
                    width: 0,
                    height: 0,
                    opacity: 0.8,
                  }}
                  animate={{
                    width: 160,
                    height: 160,
                    opacity: 0,
                  }}
                  transition={{
                    delay: ripple.delay,
                    duration: ripple.duration,
                    ease: 'easeOut',
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1,
                  }}
                />
              ))}

              {/* Main success circle with glow */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: 0.3,
                  times: [0, 0.7, 1],
                  onComplete: () => setAnimationComplete(true),
                }}
                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-green-300 shadow-lg flex items-center justify-center'
                style={{ boxShadow: '0 0 30px rgba(52, 211, 153, 0.6)' }}
              >
                {/* Checkmark with drawing animation */}
                <svg
                  className='w-14 h-14 text-white'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <motion.path
                    d='M5 13L9 17L19 7'
                    stroke='currentColor'
                    strokeWidth='3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                  />
                </svg>
              </motion.div>

              {/* Particles flying out */}
              {particles.map((particle) => (
                <motion.div
                  key={`particle-${particle.id}`}
                  className='absolute left-1/2 top-1/2 rounded-full bg-teal-200'
                  initial={{
                    x: '-50%',
                    y: '-50%',
                    opacity: 0,
                    width: particle.size,
                    height: particle.size,
                  }}
                  animate={{
                    x: `calc(-50% + ${particle.x}px)`,
                    y: `calc(-50% + ${particle.y}px)`,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: particle.duration,
                    delay: 0.5 + particle.delay,
                    ease: 'easeOut',
                  }}
                />
              ))}

              {/* Rotating ring */}
              <motion.div
                className='absolute left-1/2 top-1/2 w-28 h-28 border-4 border-dashed border-teal-200 rounded-full'
                initial={{
                  x: '-50%',
                  y: '-50%',
                  rotate: 0,
                  opacity: 0,
                }}
                animate={{
                  rotate: 360,
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  duration: 3,
                  delay: 0.3,
                  ease: 'easeInOut',
                  times: [0, 0.2, 1],
                }}
              />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, type: 'spring', stiffness: 300 }}
              className='text-2xl font-bold text-teal-700 mb-2 relative z-10'
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 300 }}
              className='text-gray-600 relative z-10'
            >
              {message}
            </motion.p>

            {/* Decorative elements */}
            <motion.div
              className='absolute top-4 left-4 w-16 h-16 rounded-full bg-teal-100 opacity-30'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            />
            <motion.div
              className='absolute bottom-4 right-4 w-20 h-20 rounded-full bg-green-100 opacity-40'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
