import { useState, useRef, useEffect } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';

type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const faqItems: FaqItem[] = [
    {
      question: 'Hội Hội viên cung cấp các quyền lợi hàng tháng như thế nào?',
      answer:
        'Hội viên sẽ được cung cấp các quyền lợi khác nhau tùy theo gói đăng ký, bao gồm số lượng tin đăng, thời gian hiển thị, ưu tiên đề xuất, báo cáo tương tác và các ưu đãi giảm giá cho lần đăng ký tiếp theo.',
    },
    {
      question: 'Sau khi đăng ký Gói Hội viên thành công, các voucher đăng tin/đẩy tin sẽ được lưu ở đâu?',
      answer:
        "Sau khi đăng ký thành công, các voucher đăng tin/đẩy tin sẽ được lưu trữ trong tài khoản của bạn, phần 'Voucher của tôi'. Bạn có thể dễ dàng truy cập và sử dụng chúng khi đăng tin mới hoặc đẩy tin đã có.",
    },
    {
      question: 'Tôi có thể quản lý các quyền lợi trong Gói Hội viên đã mua như thế nào?',
      answer:
        "Bạn có thể quản lý các quyền lợi đã mua bằng cách truy cập vào phần 'Quản lý tài khoản' > 'Gói Hội viên của tôi'. Tại đây, bạn có thể xem số lượng tin còn lại, thời hạn sử dụng và các quyền lợi khác.",
    },
    {
      question: 'Hội Hội viên của tôi sẽ gia hạn như thế nào?',
      answer:
        "Gói Hội viên sẽ tự động gia hạn khi hết hạn nếu bạn đã bật tính năng 'Tự động gia hạn'. Nếu không, bạn sẽ nhận được thông báo trước khi gói hết hạn và có thể chọn gia hạn thủ công.",
    },
    {
      question: 'Tôi có thể hủy Gói Hội viên nếu không cần nữa không?',
      answer:
        'Có, bạn có thể hủy Gói Hội viên bất cứ lúc nào. Tuy nhiên, phí đã thanh toán sẽ không được hoàn lại và bạn vẫn có thể sử dụng các quyền lợi cho đến khi gói hết hạn.',
    },
    {
      question: 'Nếu tài tin đang đã sử dụng voucher Gói Hội viên, tôi có được hoàn lại voucher không?',
      answer:
        'Không, các voucher đã sử dụng sẽ không được hoàn lại. Voucher chỉ được hoàn lại trong một số trường hợp đặc biệt theo chính sách của chúng tôi.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className='bg-white rounded-xl shadow-lg p-8 relative overflow-hidden'
      ref={ref}
      variants={containerVariants}
      initial='hidden'
      animate={controls}
    >
      <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-transparent opacity-50 rounded-bl-full'></div>
      <div className='absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-100 to-transparent opacity-50 rounded-tr-full'></div>

      <div className='flex items-center mb-6'>
        <HelpCircle className='h-6 w-6 text-red-500 mr-2' />
        <h2 className='text-xl font-bold text-gray-900'>Câu hỏi thường gặp</h2>
      </div>

      <div className='space-y-4'>
        {faqItems.map((item, index) => (
          <motion.div key={index} className='border border-gray-200 rounded-lg overflow-hidden' variants={itemVariants}>
            <button
              onClick={() => toggleFaq(index)}
              className={`w-full p-4 text-left flex justify-between items-center transition-colors ${
                openIndex === index ? 'bg-gradient-to-r from-red-50 to-white' : 'hover:bg-gray-50'
              }`}
            >
              <h3 className='font-medium text-gray-900 text-sm'>{item.question}</h3>
              <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className='h-4 w-4 text-gray-500' />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='overflow-hidden'
                >
                  <div className=' p-4 pt-4 border-t border-gray-200 text-gray-600 text-xs bg-gradient-to-b from-gray-50 to-white'>
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
