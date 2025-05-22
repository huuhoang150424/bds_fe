import { useState } from 'react';
import { LockIcon } from 'lucide-react';
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
import { changePasswordSchema, FormChangePassword } from '../schema/change-password';
import { useChangePassword } from '../hooks/use-change-password';

interface ChangePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChangePasswordModal({ open, onOpenChange }: ChangePasswordModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const changePasswordMutation = useChangePassword();
  const form = useForm<FormChangePassword>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: FormChangePassword) => {
    setIsProcessing(true);
    try {
      await changePasswordMutation.mutateAsync(
        values,
        {
          onSuccess: (data) => {
            toast({
              variant: 'default',
              title: 'Thành công',
              description: data.message,
              className: 'bg-green-500 text-white border-green-600',
            });
            form.reset();
            onOpenChange(false);
          },
          onError: (error: any) => {
            toast({
              variant: 'destructive',
              title: 'Lỗi đổi mật khẩu',
              description: error.response?.data?.message || 'Không thể đổi mật khẩu.',
            });
          },
        },
      );
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Lỗi',
        description: 'Đã có lỗi xảy ra khi đổi mật khẩu.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md p-0 overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400'></div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className='bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-t-lg p-6 pb-5 relative'>
              <div className='absolute top-[10px] left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg'>
                <LockIcon className='h-6 w-6 text-white' />
              </div>
              <div className='mt-8'>
                <DialogTitle className='text-base mt-8 text-center'>Đổi Mật Khẩu</DialogTitle>
                <DialogDescription className='text-white/90 text-center text-sm'>
                  Nhập mật khẩu cũ và mật khẩu mới để thay đổi.
                </DialogDescription>
              </div>
            </DialogHeader>

            <div className='p-6'>
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='oldPassword'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel className='text-sm'>Mật khẩu cũ</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Nhập mật khẩu cũ'
                          className='focus:ring-blue-500 focus:border-blue-500 outline-none px-[12px] py-[8px] text-sm'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='newPassword'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel className='text-sm'>Mật khẩu mới</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Nhập mật khẩu mới'
                          className='focus:ring-blue-500 focus:border-blue-500 outline-none px-[12px] py-[8px] text-sm'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel className='text-sm'>Xác nhận mật khẩu mới</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Xác nhận mật khẩu mới'
                          className='focus:ring-blue-500 focus:border-blue-500 outline-none px-[12px] py-[8px] text-sm'
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
                  'w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all duration-300',
                  'transform hover:scale-105 active:scale-95 shadow-md',
                  'group overflow-hidden relative text-sm',
                )}
                disabled={isProcessing || changePasswordMutation.isPending || !form.formState.isValid}
              >
                {isProcessing || changePasswordMutation.isPending ? (
                  <div className='flex items-center gap-2'>
                    <div className='h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    <span>Đang xử lý...</span>
                  </div>
                ) : (
                  <>
                    <span className='relative z-10 flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300'>
                      Xác nhận đổi mật khẩu
                    </span>
                    <span className='absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 translate-x-full group-hover:translate-x-0 transition-transform duration-300'></span>
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