import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Check, Upload, User, MapPin, Phone, Mail, Briefcase } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/authReducer';
import { formSchemaRegisterAgent, type FormRegisterAgent } from '../../schema/register-agent';

export default function AgentRegistrationModal() {
  const user=useSelector(selectUser);
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormRegisterAgent>({
    resolver: zodResolver(formSchemaRegisterAgent),
    defaultValues: {
      fullName: user?.fullname,
      email:  user?.email,
      phone:  user?.phone,
      address: '',
      bio: '',
    },
  });

  function onSubmit(values: FormRegisterAgent) {
    setIsSubmitting(true);



    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
        setStep(1);
        form.reset();
      }, 2000);
    }, 1500);
  }

  const nextStep = () => {
    const fieldsToValidate = step === 1 ? ['fullName', 'email', 'phone'] : ['address', 'experience', 'specialization'];

    form.trigger(fieldsToValidate as any).then((isValid) => {
      if (isValid) setStep(step + 1);
    });
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant='default'
          className='bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
        >
          Đăng ký làm Môi giới
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[550px] p-0 overflow-hidden max-h-[95vh] '>
        <div className="px-4 py-2 overflow-y-auto max-h-[calc(95vh-30px)]">
          <AnimatePresence mode='wait'>
            {isSuccess ? (
              <motion.div
                key='success'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className='flex flex-col items-center justify-center p-8 text-center h-[500px]'
              >
                <div className='w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4'>
                  <Check className='w-8 h-8 text-green-600' />
                </div>
                <h2 className='text-2xl font-bold text-green-600 mb-2'>Đăng ký thành công!</h2>
                <p className='text-gray-600 mb-6'>
                  Chúng tôi sẽ xem xét thông tin của bạn và liên hệ trong thời gian sớm nhất.
                </p>
              </motion.div>
            ) : (
              <motion.div key='form' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <DialogHeader className='px-6 pt-6 pb-0'>
                  <div className='w-full flex justify-center mb-4'>
                    <div className='flex items-center'>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                      >
                        1
                      </div>
                      <div className={`w-16 h-1 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                      >
                        2
                      </div>
                      <div className={`w-16 h-1 ${step >= 3 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                      >
                        3
                      </div>
                    </div>
                  </div>
                  <DialogTitle className='text-xl font-[600] text-gray-700  text-center'>Đăng ký trở thành Môi giới</DialogTitle>
                  <DialogDescription className='text-center pt-1'>
                    {step === 1 && 'Nhập thông tin cá nhân của bạn'}
                    {step === 2 && 'Thông tin địa chỉ và chuyên môn'}
                    {step === 3 && 'Hoàn tất hồ sơ của bạn'}
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <div className='px-6 py-4'>
                      <AnimatePresence mode='wait'>
                        {step === 1 && (
                          <motion.div
                            key='step1'
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className='space-y-4'
                          >
                            <FormField
                              control={form.control}
                              name='fullName'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Họ và tên</FormLabel>
                                  <FormControl>
                                    <div className='relative'>
                                      <User className='absolute left-2 top-[9px] text-gray-400  ' size={20}/>
                                      <Input placeholder='Nguyễn Văn A' className='pl-10 outline-none px-[34px] py-[8px] ' {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name='email'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <div className='relative'>
                                      <Mail className='absolute left-2 top-[9px] text-gray-400  ' size={20}/>
                                      <Input placeholder='example@gmail.com' className='pl-10 outline-none px-[34px] py-[8px]' {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name='phone'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Số điện thoại</FormLabel>
                                  <FormControl>
                                    <div className='relative'>
                                      <Phone className='absolute left-2 top-[9px] text-gray-400  ' size={20}/>
                                      <Input placeholder='0912345678' className='pl-10 outline-none px-[34px] py-[8px]' {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}
                        {step === 2 && (
                          <motion.div
                            key='step2'
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className='space-y-4'
                          >
                            <FormField
                              control={form.control}
                              name='address'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Địa chỉ</FormLabel>
                                  <FormControl>
                                    <div className='relative'>
                                      <MapPin className='absolute left-2 top-[9px] text-gray-400  ' size={20}/>
                                      <Input placeholder='123 Đường ABC, Quận XYZ, TP.HCM' className='pl-10 outline-none px-[34px] py-[8px]' {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name='experience'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Kinh nghiệm</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className='w-full'>
                                        <SelectValue placeholder='Chọn số năm kinh nghiệm' />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className='z-[999999999]'>
                                      <SelectItem value='0-1'>Dưới 1 năm</SelectItem>
                                      <SelectItem value='1-3'>1-3 năm</SelectItem>
                                      <SelectItem value='3-5'>3-5 năm</SelectItem>
                                      <SelectItem value='5+'>Trên 5 năm</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name='specialization'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Chuyên môn</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className='w-full'>
                                        <SelectValue placeholder='Chọn lĩnh vực chuyên môn' />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className='z-[999999999]'>
                                      <SelectItem value='residential'>Nhà ở</SelectItem>
                                      <SelectItem value='commercial'>Thương mại</SelectItem>
                                      <SelectItem value='land'>Đất</SelectItem>
                                      <SelectItem value='industrial'>Công nghiệp</SelectItem>
                                      <SelectItem value='all'>Tất cả các loại</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}
                        {step === 3 && (
                          <motion.div
                            key='step3'
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className='space-y-4'
                          >
                            <FormField
                              control={form.control}
                              name='bio'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Giới thiệu bản thân</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder='Hãy mô tả về kinh nghiệm, thành tích và lý do bạn muốn trở thành môi giới...'
                                      className='min-h-[120px]'
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className='border border-dashed border-gray-300 rounded-lg p-4'>
                              <div className='flex flex-col items-center justify-center py-4'>
                                <Upload className='h-10 w-10 text-gray-400 mb-2' />
                                <p className='text-sm font-medium mb-1'>Tải lên ảnh đại diện</p>
                                <p className='text-xs text-gray-500 mb-2'>SVG, PNG, JPG hoặc GIF (tối đa 2MB)</p>
                                <Button variant='outline' size='sm' type='button'>
                                  Chọn ảnh
                                </Button>
                              </div>
                            </div>
                            <div className='border border-dashed border-gray-300 rounded-lg p-4'>
                              <div className='flex flex-col items-center justify-center py-2'>
                                <Briefcase className='h-8 w-8 text-gray-400 mb-2' />
                                <p className='text-sm font-medium mb-1'>Tải lên chứng chỉ hành nghề (nếu có)</p>
                                <p className='text-xs text-gray-500 mb-2'>PDF, JPG (tối đa 5MB)</p>
                                <Button variant='outline' size='sm' type='button'>
                                  Chọn tệp
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className='px-6 py-4 bg-gray-100 flex justify-between rounded-[6px] '>
                      {step > 1 ? (
                        <Button type='button' variant='outline' onClick={prevStep}>
                          Quay lại
                        </Button>
                      ) : (
                        <Button type='button' variant='outline' onClick={() => setIsOpen(false)}>
                          Hủy
                        </Button>
                      )}
                      {step < 3 ? (
                        <Button type='button' onClick={nextStep} className='bg-red-500 hover:bg-red-600 '>
                          Tiếp tục
                        </Button>
                      ) : (
                        <Button
                          type='submit'
                          disabled={isSubmitting}
                          className='bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                              >
                                <circle
                                  className='opacity-25'
                                  cx='12'
                                  cy='12'
                                  r='10'
                                  stroke='currentColor'
                                  strokeWidth='4'
                                ></circle>
                                <path
                                  className='opacity-75'
                                  fill='currentColor'
                                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                ></path>
                              </svg>
                              Đang xử lý...
                            </>
                          ) : (
                            'Hoàn tất đăng ký'
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
