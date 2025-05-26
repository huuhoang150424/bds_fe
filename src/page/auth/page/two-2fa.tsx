import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuthModal } from '@/context/auth-modal';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setAuth } from '@/redux/authReducer';
import { toast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { useTwoFactor } from '@/context/two-factor-context';
import { useVerify2FA } from '../hook/use-verify-2fa';
import { Lock } from 'lucide-react';

const formSchema = z.object({
  token: z
    .string()
    .min(6, 'Mã OTP phải có 6 chữ số')
    .max(6, 'Mã OTP phải có 6 chữ số')
    .regex(/^\d+$/, 'Mã OTP chỉ chứa số'),
});

interface TwoFactorDialogProps {
  open: boolean;
  userId: string;
}

export default function TwoFactorDialog({ open, userId }: TwoFactorDialogProps) {
  const { closeModal } = useAuthModal();
  const { setTwoFactorDialogOpen } = useTwoFactor();
  const dispatch = useDispatch<AppDispatch>();
  const { mutate: verify2FA, isPending } = useVerify2FA();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: '',
    },
  });

  useEffect(() => {
    setTwoFactorDialogOpen(open);
    return () => setTwoFactorDialogOpen(false);
  }, [open, setTwoFactorDialogOpen]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    verify2FA(
      { userId, token: values.token },
      {
        onSuccess: (data) => {
          dispatch(
            setAuth({
              token: data.data.accessToken,
              user: data.data.user,
            }),
          );
          toast({
            variant: 'success',
            title: 'Xác thực thành công',
            description: 'Đăng nhập hoàn tất.',
          });
          setTwoFactorDialogOpen(false);
          closeModal();
        },
        onError: () => {
          form.setError('token', {
            message: 'Mã OTP không hợp lệ',
          });
        },
      },
    );
  };

  return (
    <Dialog open={open} modal={true}>
      <DialogContent
        className="sm:max-w-md w-full bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl p-0 border border-gray-200 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-300"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="relative p-6 sm:p-8">
          <div className="flex justify-center mb-4">
            <div className="bg-[#E03C31]/10 p-3 rounded-full shadow-sm animate-pulse">
              <Lock className="h-6 w-6 text-[#E03C31]" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center tracking-tight">
            Xác Thực Hai Bước
          </h2>
          <p className="text-sm text-gray-500 mb-6 text-center leading-relaxed max-w-xs mx-auto">
            Nhập mã OTP từ ứng dụng Google Authenticator để tiếp tục
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-sm font-medium text-gray-700 transition-all duration-300 absolute -top-2 left-3 bg-white px-1 text-xs z-10">
                      Mã OTP
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=" "
                        {...field}
                        className="w-full text-sm px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#E03C31] focus:border-transparent transition-all duration-300 bg-white shadow-sm hover:shadow-md focus:shadow-lg"
                        maxLength={6}
                        autoFocus
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500 mt-1.5 animate-in fade-in-20" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#E03C31] to-[#FF837A] hover:from-[#FF837A] hover:to-[#E03C31] text-white text-sm font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.03] disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-[#E03C31]"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Đang xác thực...
                  </span>
                ) : (
                  'Xác Thực'
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}