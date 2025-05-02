import { useState, useEffect } from 'react';
import { CreditCard, Wallet, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCreatePayment } from '../hooks/use-create-payment';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { paymentSchema, type FormPayment } from '../schema/create-payment';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { cancelTransaction, confirmTransaction } from '../services/confirm-transaction';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { updateBalance } from '@/redux/authReducer';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultAmount?: number;
  defaultDescription?: string;
}

export default function PaymentDialog({
  open,
  onOpenChange,
  defaultAmount = 2000,
  defaultDescription = 'Checkk',
}: PaymentDialogProps) {
  const dispatch=useDispatch<AppDispatch>();
  const [hasProcessed, setHasProcessed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState<{ orderCode: string; amount: number } | null>(null);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; color: string; speed: number }>
  >([]);
  const createPaymentMutation = useCreatePayment();
  const location = useLocation();
  const navigate = useNavigate();
  const form = useForm<FormPayment>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: defaultAmount,
      description: defaultDescription,
    },
  });
  useEffect(() => {
    if (isSuccess) {
      const newParticles = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -20 - Math.random() * 80,
        size: 5 + Math.random() * 10,
        color: [
          '#FF4136',
          '#FF851B',
          '#FFDC00',
          '#2ECC40',
          '#0074D9',
          '#B10DC9',
          '#F012BE',
          '#FF4136',
          '#FF851B',
          '#FFDC00',
        ][Math.floor(Math.random() * 10)],
        speed: 1 + Math.random() * 3,
      }));

      setParticles(newParticles);
      const interval = setInterval(() => {
        setParticles((prev) =>
          prev
            .map((p) => ({
              ...p,
              y: p.y + p.speed,
              x: p.x + (Math.random() - 0.5) * 2,
            }))
            .filter((p) => p.y < 120),
        );
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isSuccess]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const orderCode = searchParams.get('orderCode');
    const status = searchParams.get('status');
    const cancel = searchParams.get('cancel');

    const handleTransaction = async () => {
      setIsLoading(true);
      try {
        if (orderCode && status === 'PAID') {
          const response = await confirmTransaction(orderCode);
          console.log('Confirm transaction response:', response);
          
          setTransactionData({ orderCode, amount: response?.data?.amount || 1000 });
          setIsSuccess(true);

        } else if (orderCode && cancel === 'true' && status === 'CANCELLED') {
          await cancelTransaction(orderCode, status);
          toast({
            variant: 'default',
            title: 'Thanh toán bị hủy',
            description: 'Giao dịch đã bị hủy, vui lòng thử lại.',
            className: 'bg-green-500 text-white border-green-600',
          });
          navigate('/', { replace: true });
          onOpenChange(false);
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Không thể xử lý giao dịch.';
        if (orderCode && status === 'PAID' && errorMessage.includes('Giao dịch đã hoàn thành trước đó')) {
          const response = await confirmTransaction(orderCode);
          setTransactionData({ orderCode, amount: response?.data?.amount || 1000 });
          setIsSuccess(true);
        } else {
          toast({
            variant: 'destructive',
            title: status === 'PAID' ? 'Lỗi xác nhận giao dịch' : 'Lỗi hủy giao dịch',
            description: errorMessage,
          });
          onOpenChange(false);
        }
      } finally {
        setIsLoading(false);
        setHasProcessed(true); 
      }
    };
    if (orderCode && (status === 'PAID' || cancel === 'true')) {
      handleTransaction();
    }
  }, [location.search, navigate, onOpenChange]);


  

  const onSubmit = async (values: FormPayment) => {
    setIsProcessing(true);
    try {
      localStorage.setItem('pendingPayment', JSON.stringify({ amount: values.amount }));
      await createPaymentMutation.mutateAsync(values, {
        onSuccess: ({ data }) => {
          console.log('Create payment response:', data);
          window.location.href = data.checkoutUrl;
          form.reset();
        },
        onError: () => {
          setIsProcessing(false);
          localStorage.removeItem('pendingPayment');
        },
      });
    } catch (error) {
      setIsProcessing(false);
      localStorage.removeItem('pendingPayment');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md p-0 overflow-hidden'>
        {isSuccess && transactionData ? (
          <div className='relative w-full overflow-hidden'>
            {particles.map((particle) => (
              <div
                key={particle.id}
                className='absolute rounded-full'
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: particle.color,
                }}
              />
            ))}

            <Card className='w-full bg-gradient-to-br from-red-500 to-red-600 text-white shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden'>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSI2MCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>

              <div className='relative p-8 flex flex-col items-center'>
                <div className='relative w-32 h-32 mb-6'>
                  <div className='absolute inset-0 rounded-full bg-white/10 animate-ping opacity-75'></div>
                  <div className='absolute inset-0 rounded-full bg-white/20 animate-pulse'></div>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='w-24 h-24 rounded-full bg-white flex items-center justify-center animate-in zoom-in duration-700'>
                      <CheckCircle
                        className='h-16 w-16 text-red-500 animate-in zoom-in duration-1000 delay-300'
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>
                </div>

                <h2 className='text-2xl font-bold text-center mb-2 animate-in slide-in-from-bottom duration-500 delay-200'>
                  Thanh Toán Thành Công!
                </h2>

                <div className='w-16 h-1 bg-white/50 rounded-full my-3 animate-in slide-in-from-bottom duration-500 delay-300'></div>

                <p className='text-white/90 text-center text-base animate-in slide-in-from-bottom duration-500 delay-400'>
                  Số tiền <span className='font-bold'>{transactionData.amount.toLocaleString()} VNĐ</span> đã được
                  chuyển thành công
                </p>

                <div className='mt-8 w-full animate-in slide-in-from-bottom duration-500 delay-500'>
                  <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20'>
                    <div className='flex justify-between items-center mb-2'>
                      <span className='text-white/70 text-sm'>Mã giao dịch</span>
                      <span className='font-mono font-medium text-sm'>TX{transactionData.orderCode}</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-white/70 text-sm'>Thời gian</span>
                      <span className='text-sm'>{new Date().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      navigate('/', { replace: true });
                      onOpenChange(false);
                      setIsSuccess(false);
                      dispatch(updateBalance({balance: transactionData.amount}));
                      setTransactionData(null);
                      localStorage.removeItem('pendingPayment');
                    }}
                    className='mt-6 bg-white text-red-600 hover:bg-white/90 w-full text-sm animate-in slide-in-from-bottom duration-500 delay-600'
                  >
                    Đóng
                  </Button>
                </DialogClose>
              </div>
            </Card>
          </div>
        ) : (
          <>
            <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-400'></div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader className='bg-gradient-to-r from-red-500 to-red-400 text-white rounded-t-lg p-6 pb-5 relative'>
                  <div className='absolute top-[10px] left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-red-600 to-red-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg'>
                    <Wallet className='h-6 w-6 text-white' />
                  </div>
                  <div className='mt-8'>
                    <DialogTitle className='text-base mt-8 text-center'>Nạp Tiền Vào Tài Khoản</DialogTitle>
                    <DialogDescription className='text-white/90 text-center text-sm'>
                      Nạp tiền an toàn qua cổng thanh toán PayOS
                    </DialogDescription>
                  </div>
                </DialogHeader>

                <div className='p-6'>
                  <div className='space-y-4'>
                    <FormField
                      control={form.control}
                      name='amount'
                      render={({ field }) => (
                        <FormItem className='space-y-2'>
                          <FormLabel className='text-sm'>Số tiền (VNĐ)</FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder='Nhập số tiền'
                              className='focus:ring-red-500 focus:border-red-500 outline-none px-[12px] py-[8px] text-sm'
                              min={1}
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage className='text-xs' />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='description'
                      render={({ field }) => (
                        <FormItem className='space-y-2'>
                          <FormLabel className='text-sm'>Mô tả</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Nhập mô tả (tùy chọn)'
                              className='focus:ring-red-500 focus:border-red-500 outline-none text-sm'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='text-xs' />
                        </FormItem>
                      )}
                    />

                    <div className='bg-gray-50 p-4 rounded-lg border border-gray-100'>
                      <h4 className='font-medium text-gray-700 mb-3 text-sm'>Phương thức thanh toán</h4>
                      <div className='flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-md hover:border-red-300 transition-colors cursor-pointer'>
                        <div className='h-12 w-12 bg-gradient-to-r from-red-500 to-red-400 rounded-md flex items-center justify-center text-white shadow-sm'>
                          <CreditCard className='h-6 w-6' />
                        </div>
                        <div>
                          <p className='font-medium text-sm'>PayOS</p>
                          <p className='text-xs text-gray-500'>Thanh toán an toàn qua cổng thanh toán PayOS</p>
                        </div>
                        <div className='ml-auto'>
                          <div className='w-5 h-5 rounded-full border-2 border-red-500 flex items-center justify-center'>
                            <div className='w-3 h-3 rounded-full bg-red-500'></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col gap-4 p-6 pt-0'>
                  <div className='w-full flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-100'>
                    <span className='text-gray-700 text-sm'>Tổng thanh toán:</span>
                    <span className='text-lg font-bold text-red-600'>
                      {form.getValues().amount?.toLocaleString() || '0'} VNĐ
                    </span>
                  </div>

                  <Button
                    type='submit'
                    className={cn(
                      'w-full bg-gradient-to-r from-red-600 to-red-400 hover:from-red-700 hover:to-red-500 transition-all duration-300',
                      'transform hover:scale-105 active:scale-95 shadow-md',
                      'group overflow-hidden relative text-sm',
                    )}
                    disabled={isProcessing || createPaymentMutation.isPending || !form.formState.isValid || isLoading}
                  >
                    {isProcessing || createPaymentMutation.isPending || isLoading ? (
                      <div className='flex items-center gap-2'>
                        <div className='h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                        <span>Đang xử lý...</span>
                      </div>
                    ) : (
                      <>
                        <span className='relative z-10 flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300'>
                          Xác nhận thanh toán
                          <ArrowRight className='h-4 w-4 group-hover:translate-x-2 transition-transform duration-300' />
                        </span>
                        <span className='absolute inset-0 bg-gradient-to-r from-red-700 to-red-500 translate-x-full group-hover:translate-x-0 transition-transform duration-300'></span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}
        {isLoading && (
          <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
            <div className='h-8 w-8 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
