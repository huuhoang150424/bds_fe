//@ts-nocheck

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export function AboutHero() {
  const [confettiTriggered, setConfettiTriggered] = useState(false);

  useEffect(() => {
    if (!confettiTriggered) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const randomColor = () => {
        const colors = ['#ff0000', '#ff3333', '#ff6666', '#ff9999', '#ffcccc'];
        return colors[Math.floor(Math.random() * colors.length)];
      };
      const burstFromCenter = () => {
        confetti({
          particleCount: 150,
          spread: 180,
          origin: { x: 0.5, y: 0.5 },
          colors: [randomColor(), randomColor(), randomColor()],
          ticks: 150,
          gravity: 1,
          scalar: 1.2,
          shapes: ['circle', 'square'],
        });
      };
      const quickConfettiRain = () => {
        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: [randomColor()],
          });

          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: [randomColor()],
          });
        }, 100);

        // Dừng hiệu ứng sau 2 giây
        setTimeout(() => {
          clearInterval(interval);
        }, 2000);
      };

      // Chạy các hiệu ứng
      burstFromCenter();
      setTimeout(quickConfettiRain, 300);

      setConfettiTriggered(true);
    }
  }, [confettiTriggered]);

  return (
    <section className='relative py-16 md:py-20 overflow-hidden bg-gradient-to-b from-red-900 to-red-800 text-white px-[100px]'>
      <div className='absolute top-0 left-0 w-32 h-32 bg-red-600 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2'></div>
      <div className='absolute bottom-0 right-0 w-64 h-64 bg-red-600 rounded-full opacity-10 translate-x-1/3 translate-y-1/3'></div>
      <div className='absolute top-1/4 right-10 w-16 h-16 bg-red-500 rounded-full opacity-20'></div>

      <div className='absolute inset-0 z-0'>
        <img
          src='https://image.viettimes.vn/w800/Uploaded/2025/aohuooh/2021_09_18/710bde90cc9546f5a888235c89bb43df-5860.jpeg'
          alt='Luxury real estate office'
          className='object-cover opacity-70 w-full '
        />
        <div className='absolute inset-0 bg-gradient-to-r from-red-900/80 via-red-800/70 to-red-900/80'></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='container relative z-10 mx-auto px-4 text-center'
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='inline-block mb-6 px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20'
        >
          <span className='text-xs font-medium text-red-100'>Chào mừng đến với LuxEstate</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gradient'
        >
          Về LuxEstate
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='text-sm md:text-base max-w-2xl mx-auto mb-8 text-red-100'
        >
          Chúng tôi là đơn vị tiên phong trong lĩnh vực bất động sản cao cấp tại Việt Nam với hơn 15 năm kinh nghiệm,
          mang đến những giải pháp bất động sản tối ưu cho khách hàng.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='flex flex-wrap justify-center gap-4 mt-8'
        >
          <motion.div
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            className='bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 w-full max-w-xs'
          >
            <h3 className='text-base font-semibold mb-1'>15+</h3>
            <p className='text-xs text-red-100'>Năm kinh nghiệm</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            className='bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 w-full max-w-xs'
          >
            <h3 className='text-base font-semibold mb-1'>500+</h3>
            <p className='text-xs text-red-100'>Dự án thành công</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            className='bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 w-full max-w-xs'
          >
            <h3 className='text-base font-semibold mb-1'>10,000+</h3>
            <p className='text-xs text-red-100'>Khách hàng hài lòng</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
