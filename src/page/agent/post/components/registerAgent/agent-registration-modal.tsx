import { useState, useEffect } from 'react';
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
import { Check, Upload, User, MapPin, Phone, Mail, Briefcase, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateRole } from '@/redux/authReducer';
import { formSchemaRegisterAgent, type FormRegisterAgent } from '../../schema/register-agent';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { useRegisterBroker } from '../../hooks/use-register-broker';
import { AppDispatch } from '@/redux/store';


export default function AgentRegistrationModal() {
  const dispatch=useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const { toast } = useToast();
  const { mutate, isPending } = useRegisterBroker();

  const form = useForm<FormRegisterAgent>({
    resolver: zodResolver(formSchemaRegisterAgent),
    defaultValues: {
      fullName: user?.fullname || '',
      phone: user?.phone || '',
      address: '',
      selfIntroduction: '',
      expertise: [],
    },
  });

  useEffect(() => {
    form.setValue('expertise', selectedExpertise);
  }, [selectedExpertise, form]);

  const expertiseOptions = [
    { value: 'residential', label: 'Nhà ở' },
    { value: 'commercial', label: 'Thương mại' },
    { value: 'land', label: 'Đất' },
    { value: 'industrial', label: 'Công nghiệp' },
    { value: 'all', label: 'Tất cả các loại' },
  ];

  const addExpertise = (value: string) => {
    if (!selectedExpertise.includes(value)) {
      setSelectedExpertise([...selectedExpertise, value]);
    }
  };

  const removeExpertise = (value: string) => {
    setSelectedExpertise(selectedExpertise.filter(item => item !== value));
  };

  const clearAllExpertise = () => {
    setSelectedExpertise([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Lỗi",
          description: "Kích thước tệp tối đa là 5MB",
          variant: "destructive",
        });
        return;
      }
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Lỗi",
          description: "Chỉ chấp nhận tệp PDF, JPG hoặc PNG",
          variant: "destructive",
        });
        return;
      }

      setCertificateFile(file);
    }
  };

  function onSubmit(values: FormRegisterAgent) {
    const formData = new FormData();
    formData.append('fullName', values.fullName || '');
    formData.append('phone', values.phone || '');
    formData.append('address', values.address || '');
    formData.append('selfIntroduction', values.selfIntroduction || '');
    formData.append('experience', values.experience || '');
    if (values.expertise && values.expertise.length > 0) {
      values.expertise.forEach((item: string) => formData.append('expertise', item));
    }
    if (certificateFile) {
      formData.append('image', certificateFile);
    }
    
    mutate(formData, {
      onSuccess: () => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setIsOpen(false);
          setStep(1);
          form.reset();
          setSelectedExpertise([]);
          setCertificateFile(null);
        }, 2000); 
        dispatch(updateRole({roles: 'Agent'}))
      },
      onError: () => {
        setIsSubmitting(false); 
      },
    });
  }

  const nextStep = () => {
    const fieldsToValidate = step === 1 ? ['fullName', 'phone'] : ['address', 'experience', 'expertise'];

    form.trigger(fieldsToValidate as any).then((isValid) => {
      if (isValid) setStep(step + 1);
    });
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const getExpertiseLabel = (value: string) => {
    const option = expertiseOptions.find(opt => opt.value === value);
    return option ? option.label : value;
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

      <DialogContent className='sm:max-w-[550px] p-0 overflow-hidden max-h-[95vh]'>
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
                  <DialogTitle className='text-xl font-[600] text-gray-700 text-center'>Đăng ký trở thành Môi giới</DialogTitle>
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
                                      <User className='absolute left-2 top-[9px] text-gray-400' size={20}/>
                                      <Input placeholder='Nguyễn Văn A' className='pl-10 outline-none px-[34px] py-[8px]' {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="flex flex-col gap-[10px]">
                              <Label>Email</Label>
                              <div className='relative'>
                                <Mail className='absolute left-2 top-[9px] text-gray-400' size={20}/>
                                <Input value={user?.email} disabled={true} placeholder='example@gmail.com' className='pl-10 outline-none px-[34px] py-[8px]'/>
                              </div>
                            </div>
                            <FormField
                              control={form.control}
                              name='phone'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Số điện thoại</FormLabel>
                                  <FormControl>
                                    <div className='relative'>
                                      <Phone className='absolute left-2 top-[9px] text-gray-400' size={20}/>
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
                                      <MapPin className='absolute left-2 top-[9px] text-gray-400' size={20}/>
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
                              name='expertise'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Chuyên môn</FormLabel>
                                  <div className="space-y-2">
                                    <Select 
                                      onValueChange={(value) => addExpertise(value)}
                                    >
                                      <FormControl>
                                        <SelectTrigger className='w-full'>
                                          <SelectValue placeholder='Chọn lĩnh vực chuyên môn' />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent className='z-[999999999]'>
                                        {expertiseOptions.map(option => (
                                          <SelectItem 
                                            key={option.value} 
                                            value={option.value}
                                            disabled={selectedExpertise.includes(option.value)}
                                          >
                                            {option.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    
                                    {selectedExpertise.length > 0 && (
                                      <div className="mt-2">
                                        <div className="flex flex-wrap gap-2 mb-2">
                                          {selectedExpertise.map(item => (
                                            <div 
                                              key={item} 
                                              className="flex items-center bg-orange-100 text-orange-700 rounded-md px-2 py-1"
                                            >
                                              <span className="text-sm">{getExpertiseLabel(item)}</span>
                                              <button 
                                                type="button" 
                                                onClick={() => removeExpertise(item)}
                                                className="ml-1 text-orange-700 hover:text-orange-900"
                                              >
                                                <X size={14} />
                                              </button>
                                            </div>
                                          ))}
                                        </div>
                                        <button 
                                          type="button"
                                          onClick={clearAllExpertise}
                                          className="text-xs text-gray-500 hover:text-gray-700"
                                        >
                                          Xóa tất cả
                                        </button>
                                      </div>
                                    )}
                                  </div>
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
                              name='selfIntroduction'
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
                              <div className='flex flex-col items-center justify-center py-2'>
                                <Briefcase className='h-8 w-8 text-gray-400 mb-2' />
                                <p className='text-sm font-medium mb-1'>Tải lên chứng chỉ hành nghề (nếu có)</p>
                                <p className='text-xs text-gray-500 mb-2'>PDF, JPG, PNG (tối đa 5MB)</p>
                                <label htmlFor="certificate-upload" className="cursor-pointer">
                                  <div className="flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                    <Upload size={16} />
                                    {certificateFile ? 'Đổi tệp khác' : 'Chọn tệp'}
                                  </div>
                                  <input
                                    id="certificate-upload"
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    className="hidden"
                                    onChange={handleFileChange}
                                  />
                                </label>
                                {certificateFile && (
                                  <div className="mt-2 flex items-center text-sm text-green-600">
                                    <Check size={16} className="mr-1" />
                                    <span className="text-ellipsis overflow-hidden max-w-[200px]">
                                      {certificateFile.name}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => setCertificateFile(null)}
                                      className="ml-2 text-gray-500 hover:text-gray-700"
                                    >
                                      <X size={16} />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className='px-6 py-4 bg-gray-100 flex justify-between rounded-[6px]'>
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
                        <Button type='button' onClick={nextStep} className='bg-red-500 hover:bg-red-600'>
                          Tiếp tục
                        </Button>
                      ) : (
                        <Button
                          type='submit'
                          disabled={isSubmitting || isPending}
                          className='bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                        >
                          {(isSubmitting || isPending) ? (
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