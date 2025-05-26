import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import QRCode from 'react-qr-code';
import { toast } from '@/hooks/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { selectUser, updateAuth } from '@/redux/authReducer';
import { Loader2, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDisable2FA, useEnable2FA, useGet2FASecret } from '../hooks/use-2fa';

const formSchema = z.object({
  token: z
    .string()
    .min(6, 'Mã OTP phải có 6 chữ số')
    .max(6, 'Mã OTP phải có 6 chữ số')
    .regex(/^\d+$/, 'Mã OTP chỉ chứa số'),
});

interface TwoFactorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  is2FAEnabled: boolean;
}

export default function TwoFactorModal({ open, onOpenChange, is2FAEnabled }: TwoFactorModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const { data, refetch, isLoading: isLoadingSecret, error: secretError } = useGet2FASecret();
  const enable2FAMutation = useEnable2FA();
  const disable2FAMutation = useDisable2FA();
  const [otpCountdown, setOtpCountdown] = useState(30); // 30-second OTP validity
  console.log('user ', user?.is2FAEnabled);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: '',
    },
  });

  useEffect(() => {
    if (open && !is2FAEnabled) {
      refetch();
      setOtpCountdown(30);
    }
    if (open) {
      form.reset();
    }
  }, [open, is2FAEnabled, refetch, form]);

  useEffect(() => {
    if (secretError) {
      toast({
        variant: 'destructive',
        title: 'Lỗi',
        description: 'Không thể tải mã QR. Vui lòng thử lại sau.',
      });
      onOpenChange(false);
    }
  }, [secretError, onOpenChange]);

  useEffect(() => {
    if (!open || is2FAEnabled) return;
    const timer = setInterval(() => {
      setOtpCountdown((prev) => {
        if (prev <= 1) {
          refetch();
          toast({
            variant: 'default',
            title: 'Mã OTP đã hết hạn',
            description: 'Mã QR đã được làm mới. Vui lòng quét lại.',
          });
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [open, is2FAEnabled, refetch]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (is2FAEnabled) {
        await disable2FAMutation.mutateAsync({ token: values.token });
        if (user) {
          dispatch(updateAuth({ data: { ...user, is2FAEnabled: false, twoFactorSecret: null } }));
        }
        toast({
          variant: 'success',
          title: 'Thành công',
          description: 'Đã tắt xác thực hai bước.',
        });
      } else {
        await enable2FAMutation.mutateAsync({ token: values.token });
        if (user) {
          dispatch(updateAuth({ data: { ...user, is2FAEnabled: true } }));
        }
        toast({
          variant: 'success',
          title: 'Thành công',
          description: 'Đã bật xác thực hai bước.',
        });
      }
      form.reset();
      onOpenChange(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        (is2FAEnabled ? 'Mã OTP không hợp lệ để tắt 2FA.' : 'Mã OTP không hợp lệ để bật 2FA.');
      form.setError('token', { message: errorMessage });
      toast({
        variant: 'destructive',
        title: 'Lỗi',
        description: errorMessage,
      });
    }
  };

  const handleRetry = () => {
    form.reset();
    if (!is2FAEnabled) {
      refetch();
      setOtpCountdown(30);
    }
  };
  console.log(is2FAEnabled)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Shield className='h-5 w-5 text-[#E03C31]' />
            {is2FAEnabled ? 'Tắt xác thực hai bước' : 'Bật xác thực hai bước'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            {!is2FAEnabled && (
              <div className='text-center'>
                <p className='text-sm text-gray-600 mb-3'>
                  Quét mã QR bằng Google Authenticator, sau đó nhập mã OTP để bật xác thực.
                </p>
                {isLoadingSecret ? (
                  <div className='flex justify-center'>
                    <Loader2 className='h-8 w-8 animate-spin' />
                  </div>
                ) : data?.data?.qrCodeUrl ? (
                  <>
                    <div className='flex justify-center'>
                      <QRCode value={data.data.qrcodeUrl || data.data.qrCodeUrl} size={160} />
                    </div>
                    <p className='text-sm text-gray-500 mt-2'>
                      Mã OTP còn lại: <strong>{otpCountdown} giây</strong>
                    </p>
                  </>
                ) : (
                  <p className='text-sm text-red-500'>Không thể tải mã QR. Vui lòng thử lại.</p>
                )}
                {data?.data?.secret && (
                  <p className='text-xs text-gray-600 mt-2 break-all'>
                    Mã bí mật: <span className='font-mono'>{data.data.secret}</span>
                  </p>
                )}
              </div>
            )}
            {is2FAEnabled && (
              <p className='text-sm text-gray-600'>Nhập mã OTP từ Google Authenticator để xác minh và tắt xác thực.</p>
            )}
            <FormField
              control={form.control}
              name='token'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã OTP</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Nhập mã OTP 6 chữ số'
                      {...field}
                      maxLength={6}
                      autoFocus
                      disabled={isLoadingSecret || enable2FAMutation.isPending || disable2FAMutation.isPending}
                      className='outline-none px-[12px] py-[8px] rounded-[8px] '
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!is2FAEnabled && (
              <div className='text-center'>
                <Button
                  type='button'
                  variant='link'
                  onClick={handleRetry}
                  disabled={isLoadingSecret || enable2FAMutation.isPending || disable2FAMutation.isPending}
                  className='text-[#E03C31] text-sm'
                >
                  Thử lại mã OTP
                </Button>
              </div>
            )}

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  form.reset();
                  onOpenChange(false);
                }}
                disabled={enable2FAMutation.isPending || disable2FAMutation.isPending}
              >
                Hủy
              </Button>
              <Button
                type='submit'
                disabled={
                  isLoadingSecret ||
                  enable2FAMutation.isPending ||
                  disable2FAMutation.isPending ||
                  !form.formState.isValid
                }
              >
                {(enable2FAMutation.isPending || disable2FAMutation.isPending) && (
                  <Loader2 className='h-4 w-4 animate-spin mr-2' />
                )}
                {is2FAEnabled ? 'Tắt 2FA' : 'Bật 2FA'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
