import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay: number;
}

export default function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div
      className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className='flex items-center mb-4'>
        <div className='mr-4 text-orange-500 bg-orange-100 p-3 rounded-full'>{icon}</div>
        <h3 className='font-bold text-lg'>{title}</h3>
      </div>
      <p className='text-gray-600 text-sm'>{description}</p>
    </motion.div>
  );
}
