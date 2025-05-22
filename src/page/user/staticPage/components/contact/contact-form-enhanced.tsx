//@ts-nocheck
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự' }),
  email: z.string().email({ message: 'Email không hợp lệ' }),
  phone: z.string().min(10, { message: 'Số điện thoại không hợp lệ' }),
  subject: z.string().min(5, { message: 'Tiêu đề phải có ít nhất 5 ký tự' }),
  message: z.string().min(10, { message: 'Tin nhắn phải có ít nhất 10 ký tự' }),
});

export function ContactFormEnhanced() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const controls = useAnimation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  // Hiệu ứng nổi bật cho form khi trang tải
  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    });
  }, [controls]);

  // Hiệu ứng pháo giấy khi gửi form thành công - ngắn gọn
  const triggerSuccessConfetti = () => {
    // Hiệu ứng pháo hoa từ nút gửi
    const btn = document.querySelector("button[type='submit']");
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      // Hiệu ứng nổ từ nút gửi - ngắn gọn nhưng mạnh mẽ
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
        colors: ['#ff0000', '#ff3333', '#ff6666', '#ff9999', '#ffcccc'],
        ticks: 150,
      });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Hiệu ứng thành công
    setIsSuccess(true);
    triggerSuccessConfetti();

    toast({
      title: 'Gửi thành công!',
      description: 'Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.',
    });

    // Reset form sau 3 giây
    setTimeout(() => {
      form.reset();
      setIsSubmitting(false);
      setIsSuccess(false);
    }, 3000);
  }

  // Hiệu ứng cho các phần tử thông tin liên hệ
  const contactItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section className='py-16 bg-gradient-to-b from-red-50 to-white relative overflow-hidden px-[100px] '>
      {/* Thêm các hình trang trí */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-red-100 rounded-full opacity-50 translate-x-1/3 -translate-y-1/3'></div>
      <div className='absolute bottom-0 left-0 w-48 h-48 bg-red-100 rounded-full opacity-40 -translate-x-1/4 translate-y-1/4'></div>
      <div className='absolute top-1/3 left-10 w-16 h-16 bg-red-200 rounded-full opacity-30'></div>

      <div className='container mx-auto px-4 relative z-10'>
        <div className='text-center mb-12'>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='inline-block px-3 py-1 bg-red-100 rounded-full text-red-700 text-xs font-medium mb-3'
          >
            Liên hệ
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='text-3xl md:text-4xl font-bold mb-4 text-red-700'
          >
            Liên hệ với chúng tôi
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className='text-gray-600 max-w-2xl mx-auto text-xs md:text-sm'
          >
            Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất
          </motion.p>
        </div>

        <div className='grid md:grid-cols-2 gap-10'>
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className='text-2xl font-semibold mb-6 text-red-700'
            >
              Thông tin liên hệ
            </motion.h3>

            <div className='space-y-6'>
              <motion.div
                custom={0}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                variants={contactItemVariants}
                whileHover={{ scale: 1.03, x: 5 }}
                className='flex items-start gap-4 p-4 rounded-lg hover:bg-red-50 transition-colors border border-transparent hover:border-red-100'
              >
                <div className='bg-red-100 p-3 rounded-full'>
                  <Phone className='h-6 w-6 text-red-600' />
                </div>
                <div>
                  <h4 className='font-medium text-sm md:text-base'>Điện thoại</h4>
                  <p className='text-gray-600 text-xs md:text-sm'>+84 123 456 789</p>
                  <p className='text-gray-600 text-xs md:text-sm'>+84 987 654 321</p>
                </div>
              </motion.div>

              <motion.div
                custom={1}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                variants={contactItemVariants}
                whileHover={{ scale: 1.03, x: 5 }}
                className='flex items-start gap-4 p-4 rounded-lg hover:bg-red-50 transition-colors border border-transparent hover:border-red-100'
              >
                <div className='bg-red-100 p-3 rounded-full'>
                  <Mail className='h-6 w-6 text-red-600' />
                </div>
                <div>
                  <h4 className='font-medium text-sm md:text-base'>Email</h4>
                  <p className='text-gray-600 text-xs md:text-sm'>info@luxestate.com</p>
                  <p className='text-gray-600 text-xs md:text-sm'>support@luxestate.com</p>
                </div>
              </motion.div>

              <motion.div
                custom={2}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                variants={contactItemVariants}
                whileHover={{ scale: 1.03, x: 5 }}
                className='flex items-start gap-4 p-4 rounded-lg hover:bg-red-50 transition-colors border border-transparent hover:border-red-100'
              >
                <div className='bg-red-100 p-3 rounded-full'>
                  <MapPin className='h-6 w-6 text-red-600' />
                </div>
                <div>
                  <h4 className='font-medium text-sm md:text-base'>Địa chỉ</h4>
                  <p className='text-gray-600 text-xs md:text-sm'>123 Đường Nguyễn Huệ</p>
                  <p className='text-gray-600 text-xs md:text-sm'>Quận 1, TP. Hồ Chí Minh</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className='mt-10 p-5 border border-red-100 rounded-lg bg-red-50/50'
            >
              <h3 className='text-lg font-semibold mb-3 text-red-700'>Giờ làm việc</h3>
              <p className='text-gray-600 text-xs md:text-sm'>Thứ Hai - Thứ Sáu: 8:00 - 18:00</p>
              <p className='text-gray-600 text-xs md:text-sm'>Thứ Bảy: 9:00 - 16:00</p>
              <p className='text-gray-600 text-xs md:text-sm'>Chủ Nhật: Đóng cửa</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            className='bg-white p-6 rounded-lg shadow-lg border border-red-100'
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='flex flex-col items-center justify-center h-full py-10 text-center'
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5, times: [0, 0.7, 1] }}
                  className='bg-red-100 p-4 rounded-full mb-4'
                >
                  <CheckCircle2 className='h-12 w-12 text-red-600' />
                </motion.div>
                <h3 className='text-xl font-bold text-red-700 mb-2'>Gửi thành công!</h3>
                <p className='text-gray-600 text-xs md:text-sm max-w-md'>
                  Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                </p>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs md:text-sm'>Họ và tên</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Nhập họ và tên của bạn'
                            {...field}
                            className='focus:border-red-300 focus:ring-red-200'
                          />
                        </FormControl>
                        <FormMessage className='text-xs' />
                      </FormItem>
                    )}
                  />

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-xs md:text-sm'>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='example@email.com'
                              type='email'
                              {...field}
                              className='focus:border-red-300 focus:ring-red-200'
                            />
                          </FormControl>
                          <FormMessage className='text-xs' />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='phone'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-xs md:text-sm'>Số điện thoại</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Nhập số điện thoại'
                              {...field}
                              className='focus:border-red-300 focus:ring-red-200'
                            />
                          </FormControl>
                          <FormMessage className='text-xs' />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name='subject'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs md:text-sm'>Tiêu đề</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Nhập tiêu đề'
                            {...field}
                            className='focus:border-red-300 focus:ring-red-200'
                          />
                        </FormControl>
                        <FormMessage className='text-xs' />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='message'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs md:text-sm'>Tin nhắn</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Nhập nội dung tin nhắn'
                            className='min-h-[120px] focus:border-red-300 focus:ring-red-200'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className='text-xs' />
                      </FormItem>
                    )}
                  />

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type='submit'
                      className='w-full bg-red-600 hover:bg-red-700 text-white'
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className='flex items-center gap-2'>
                          <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
                          Đang gửi...
                        </span>
                      ) : (
                        <span className='flex items-center gap-2'>
                          <Send className='h-4 w-4' />
                          Gửi tin nhắn
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
