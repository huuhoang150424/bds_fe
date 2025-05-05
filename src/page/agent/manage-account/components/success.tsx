import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ChevronRight, CheckCircle2, Shield, Activity, CreditCard, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ConfettiPiece({ delay, duration, x, y, rotate, color, shape }: any) {
  const getShapeClass = () => {
    switch (shape) {
      case 'circle':
        return 'rounded-full';
      case 'square':
        return 'rounded-sm';
      case 'triangle':
        return 'clip-path-triangle';
      case 'rect':
        return 'rounded-sm w-3 h-1.5';
      default:
        return 'rounded-sm';
    }
  };

  const size = shape === 'rect' ? null : Math.random() * 8 + 4;

  return (
    <motion.div
      className={`absolute ${getShapeClass()} ${color}`}
      style={{
        width: shape === 'rect' ? undefined : size,
        height: shape === 'rect' ? undefined : size,
        left: '50%',
        top: '50%',
      }}
      initial={{
        x: 0,
        y: 0,
        opacity: 1,
        scale: 0,
      }}
      animate={{
        x: x,
        y: y,
        opacity: [1, 1, 0.8, 0.5, 0],
        rotate: rotate,
        scale: [0, 1, 1, 0.8, 0.5],
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.1, 0.4, 0.8, 0.9],
      }}
    />
  );
}

export function SuccessModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [confetti, setConfetti] = useState([]);

  // Generate confetti pieces when modal opens
  useEffect(() => {
    if (open) {
      const newConfetti = [];
      const colors = [
        'bg-red-300',
        'bg-red-400',
        'bg-rose-300',
        'bg-rose-400',
        'bg-pink-300',
        'bg-pink-400',
        'bg-white',
      ];
      const shapes = ['circle', 'square', 'triangle', 'rect'];

      // Generate 100 confetti pieces
      for (let i = 0; i < 100; i++) {
        newConfetti.push({
          id: i,
          x: (Math.random() - 0.5) * 500, // Spread horizontally
          y: Math.random() * -600, // Shoot upward and fall down
          rotate: Math.random() * 720 - 360, // Rotate randomly
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          delay: Math.random() * 0.2,
          duration: Math.random() * 1.5 + 1.5,
        });
      }
      setConfetti(newConfetti);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-sm p-0 overflow-hidden bg-white rounded-xl shadow-2xl border-0'>
        <div className='bg-gradient-to-r from-red-300 to-rose-300 p-8 flex flex-col items-center justify-center relative'>
          <div className='absolute top-5 right-5 w-16 h-16 rounded-full bg-white/10 blur-xl'></div>
          <div className='absolute bottom-2 left-5 w-12 h-12 rounded-full bg-white/10 blur-xl'></div>

          {/* Confetti container */}
          <div className='absolute inset-0 overflow-hidden'>
            {confetti.map((piece: any) => (
              <ConfettiPiece
                key={piece.id}
                delay={piece.delay}
                duration={piece.duration}
                x={piece.x}
                y={piece.y}
                rotate={piece.rotate}
                color={piece.color}
                shape={piece.shape}
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className='relative h-20 w-20 rounded-full bg-white flex items-center justify-center mb-4 shadow-lg z-10'
          >
            <div className='absolute inset-0 rounded-full border-4 border-red-200 opacity-50 animate-ping'></div>
            <CheckCircle2 className='h-12 w-12 text-red-400' />
          </motion.div>
          <h3 className='text-xl font-medium text-white z-10'>✨ Đăng Ký Thành Công! ✨</h3>
        </div>

        <div className='p-5 text-center'>
          <p className='text-xs text-gray-600'>
            Chúc mừng bạn đã đăng ký thành công. Hệ thống sẽ xử lý thông tin của bạn trong thời gian sớm nhất.
          </p>

          <div className='w-full pt-4'>
            <div className='h-1.5 w-full bg-gray-100 rounded-full overflow-hidden'>
              <div className='h-full bg-gradient-to-r from-red-300 to-rose-300 animate-progress-bar'></div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
