import { useState } from 'react';
import { PhoneIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updatePhoneStore } from '@/redux/authReducer';
import { useUpdatePhone } from '../hooks/use-update-phone';
import { FormUpdatePhone, updatePhoneSchema } from '../schema/update-phone';
import { AppDispatch } from '@/redux/store';

interface ChangePhoneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChangePhoneModal({ open, onOpenChange }: ChangePhoneModalProps) {
  const dispatch=useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const [isProcessing, setIsProcessing] = useState(false);
  const updatePhoneMutation = useUpdatePhone();
  const form = useForm<FormUpdatePhone>({
    resolver: zodResolver(updatePhoneSchema),
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = async (values: FormUpdatePhone) => {
    if (!user?.id) {
      toast({
        variant: 'destructive',
        title: 'Lỗi',
        description: 'Không tìm thấy thông tin người dùng.',
      });
      return;
    }

    setIsProcessing(true);
    try {
      await updatePhoneMutation.mutateAsync(
        { userId: user.id, phone: values.phone },
        {
          onSuccess: (data) => {
            toast({
              variant: 'default',
              title: 'Thành công',
              description: 'Cập nhật số điện thoại thành công.',
              className: 'bg-green-500 text-white border-green-600',
            });
            dispatch(updatePhoneStore({phone: data?.data?.newPhone}))
            form.reset();
            onOpenChange(false);
          },
          onError: (error: any) => {
            toast({
              variant: 'destructive',
              title: 'Lỗi cập nhật số điện thoại',
              description: error.response?.data?.message || 'Không thể cập nhật số điện thoại.',
            });
          },
        },
      );
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Lỗi',
        description: 'Đã có lỗi xảy ra khi cập nhật số điện thoại.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md p-0 overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 via-green-500 to-green-400'></div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className='bg-gradient-to-r from-green-500 to-green-400 text-white rounded-t-lg p-6 pb-5 relative'>
              <div className='absolute top-[10px] left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-green-600 to-green-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg'>
                <PhoneIcon className='h-6 w-6 text-white' />
              </div>
              <div className='mt-8'>
                <DialogTitle className='text-base mt-8 text-center'>Thay Đổi Số Điện Thoại</DialogTitle>
                <DialogDescription className='text-white/90 text-center text-sm'>
                  Nhập số điện thoại mới để cập nhật.
                </DialogDescription>
              </div>
            </DialogHeader>

            <div className='p-6'>
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel className='text-sm'>Số điện thoại</FormLabel>
                      <FormControl>
                        <Input
                          type='text'
                          placeholder='Nhập số điện thoại (10 số)'
                          className='focus:ring-green-500 focus:border-green-500 outline-none px-[12px] py-[8px] text-sm'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className='flex flex-col gap-4 p-6 pt-0'>
              <Button
                type='submit'
                className={cn(
                  'w-full bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 transition-all duration-300',
                  'transform hover:scale-105 active:scale-95 shadow-md',
                  'group overflow-hidden relative text-sm',
                )}
                disabled={isProcessing || updatePhoneMutation.isPending || !form.formState.isValid}
              >
                {isProcessing || updatePhoneMutation.isPending ? (
                  <div className='flex items-center gap-2'>
                    <div className='h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    <span>Đang xử lý...</span>
                  </div>
                ) : (
                  <>
                    <span className='relative z-10 flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300'>
                      Xác nhận cập nhật
                    </span>
                    <span className='absolute inset-0 bg-gradient-to-r from-green-700 to-green-500 translate-x-full group-hover:translate-x-0 transition-transform duration-300'></span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}