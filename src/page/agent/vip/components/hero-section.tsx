import { motion } from 'framer-motion';
import { Clock,ThumbsUp  ,Users  } from 'lucide-react';



export default function HeroSection() {
  return (
    <div className="px-2 pt-2 rounded-[8px] ">
      <div className='relative bg-gradient-to-r from-red-800 via-red-700 to-red-600 text-white py-10 px-4 overflow-hidden pb-24 rounded-[8px]'>
        <div className='max-w-6xl mx-auto relative z-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className='text-3xl md:text-4xl font-bold mb-3 flex items-center'>
                <span className='mr-2'>Gói Hội viên</span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  className='inline-block'
                >
                  <span className='inline-flex items-center justify-center bg-yellow-500 text-red-800 text-xs font-bold rounded-full h-6 px-2'>
                    VIP
                  </span>
                </motion.div>
              </h1>
              <motion.p
                className='text-xl font-medium mb-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Tiết kiệm đến <span className='text-yellow-300 font-bold'>39%</span> chi phí so với đăng tin/đẩy tin lẻ
              </motion.p>
              <div className='space-y-3 mt-6'>
                {[
                  {
                    icon: (
                      <Clock className="w-4 h-4 " />
                    ),
                    text: 'Thảnh thơi đăng tin/đẩy tin không lo biến động giá',
                  },
                  {
                    icon: (
                      <ThumbsUp  className="w-4 h-4 " />
                    ),
                    text: 'Quản lý ngân sách dễ dàng và hiệu quả',
                  },
                  {
                    icon: (
                      <Users className="w-4 h-4 " />
                    ),
                    text: 'Sử dụng các tính năng tiện ích nâng cao dành cho Hội viên',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className='flex items-center'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    <div className='w-8 h-8 flex items-center justify-center rounded-full bg-red-500 mr-3 shadow-md'>
                      {item.icon}
                    </div>
                    <p className='text-sm'>{item.text}</p>
                  </motion.div>
                ))}
              </div>
              <motion.p
                className='text-xs mt-6 opacity-80'
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Giá của các gói bên dưới chưa bao gồm 10% VAT.
              </motion.p>
            </motion.div>
            <motion.div
              className='hidden md:block'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className='relative'>
                <motion.div
                  className='absolute -right-10 top-0'
                  initial={{ rotate: -10, y: -20 }}
                  animate={{ rotate: 12, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
                >
                  <div className='bg-black text-white text-sm font-bold py-1 px-3 rounded-lg shadow-lg'>
                    <div className='flex items-center'>
                      <span className='text-yellow-300 text-xl mr-1'>39%</span>
                      <span className='text-xs'>Chi phí đăng tin</span>
                    </div>
                  </div>
                </motion.div>
                <img
                  src='https://img.iproperty.com.my/angel-legacy-bds/750x1000-fit/2021/03/12/b9sp0zUm/20210312170235-93d2.jpg'
                  alt='Tiết kiệm chi phí đăng tin'
                  className='rounded-lg shadow-xl max-w-full'
                />
                <motion.div
                  className='absolute -bottom-4 -left-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold py-1 px-3 rounded-lg shadow-lg'
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  Tiết kiệm tối đa
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className='absolute top-0 right-0 w-1/3 h-full opacity-20'>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 150, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
          >
            <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
              <path
                fill='#FFFFFF'
                d='M47.1,-57.8C59.5,-47.8,67.6,-31.5,71.5,-14.1C75.4,3.3,75.2,21.7,67.1,35.8C59,49.9,43,59.6,25.8,65.8C8.6,72,-9.8,74.6,-25.8,69.5C-41.8,64.4,-55.5,51.6,-65.2,35.8C-74.9,20,-80.5,1.2,-76.8,-15.4C-73.1,-32,-60,-46.4,-45.3,-55.9C-30.6,-65.4,-15.3,-70.1,0.9,-71.2C17.1,-72.3,34.7,-67.8,47.1,-57.8Z'
                transform='translate(100 100)'
              />
            </svg>
          </motion.div>
        </div>
        <motion.div
          className='absolute bottom-0 left-0 w-1/4 h-full opacity-20'
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
            <path
              fill='#FFFFFF'
              d='M38.5,-47.1C52.9,-36.8,69.3,-27.5,73.2,-14.4C77.1,-1.3,68.5,15.6,58.3,29.3C48.1,43,36.3,53.5,22.1,60.4C7.9,67.3,-8.7,70.5,-22.9,65.8C-37.1,61.1,-48.9,48.4,-57.6,33.8C-66.3,19.2,-71.9,2.6,-69.2,-12.7C-66.5,-28,-55.5,-42,-42.2,-52.3C-28.9,-62.6,-14.4,-69.3,-0.5,-68.7C13.5,-68.1,27,-57.3,38.5,-47.1Z'
              transform='translate(100 100)'
            />
          </svg>
        </motion.div>
      
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute rounded-full bg-white opacity-30'
            style={{
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            initial={{ y: Math.random() * 20, opacity: 0.1 }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
