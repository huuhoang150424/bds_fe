import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBuyPricing } from '../hooks/use-buy-pricing';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/authReducer';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: any;
}

export default function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
  const { mutate, isPending, isSuccess, error, data } = useBuyPricing();
  const [userBalance, setUserBalance] = useState<number>(0);

  const user = useSelector(selectUser);

  useEffect(() => {
    setUserBalance(user?.balance || 0);
  }, [user?.balance]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  }, [isSuccess, onClose]);

  if (!plan) return null;

  const price = Number.parseInt(plan.price.replace(/\./g, '')); 
  const totalPrice = price * 1.1; 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(plan.id);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {}, 300);
        }
        onClose();
      }}
    >
      <DialogContent className='sm:max-w-md overflow-hidden'>
        <AnimatePresence mode='wait'>
          {isSuccess ? (
            <motion.div
              key='success'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className='flex flex-col items-center justify-center py-6'
            >
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4'>
                <CheckCircle2 className='h-10 w-10 text-green-500' />
              </div>
              <h2 className='text-xl font-bold text-center mb-2'>Mua gói thành công!</h2>
              <p className='text-sm text-gray-500 text-center'>
                {data?.refundAmount
                  ? `Bạn đã nâng cấp lên Gói Hội viên ${plan.name}! Số tiền hoàn lại: ${data.refundAmount.toLocaleString()}đ`
                  : `Cảm ơn bạn đã đăng ký Gói Hội viên ${plan.name}`}
              </p>
            </motion.div>
          ) : (
            <motion.div key='form' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogHeader>
                <DialogTitle>Mua Gói Hội viên {plan.name}</DialogTitle>
                <DialogDescription>
                  Xác nhận mua gói bằng số dư tài khoản của bạn.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit}>
                <div className='grid gap-4 py-4'>
                  <div className='border rounded-md p-4 bg-gradient-to-r from-gray-50 to-white'>
                    <h3 className='font-medium text-sm mb-2'>Thông tin tài khoản</h3>
                    <p className='text-xs mb-1'>
                      Số dư hiện tại: <span className='font-medium'>{userBalance.toLocaleString()}đ</span>
                    </p>
                  </div>

                  <div className='border-t pt-4 mt-2'>
                    <div className='flex justify-between text-sm mb-2'>
                      <span>Gói Hội viên {plan.name}</span>
                      <span>{plan.price}đ</span>
                    </div>
                    <div className='flex justify-between text-sm mb-2'>
                      <span>VAT (10%)</span>
                      <span>{(price * 0.1).toLocaleString()}đ</span>
                    </div>
                    <div className='flex justify-between font-bold'>
                      <span>Tổng cộng</span>
                      <span>{totalPrice.toLocaleString()}đ</span>
                    </div>
                    {error && <p className='text-xs text-red-500 mt-2'>{error.message}</p>}
                  </div>
                </div>

                <DialogFooter>
                  <Button type='button' variant='outline' onClick={onClose} className='text-xs'>
                    Hủy
                  </Button>
                  <Button
                    type='submit'
                    className='bg-red-500 hover:bg-red-600 text-xs relative overflow-hidden'
                    disabled={isPending}
                  >
                    {isPending ? (
                      <span className='flex items-center'>
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
                      </span>
                    ) : (
                      'Xác nhận mua'
                    )}
                    {!isPending && (
                      <span className='absolute inset-0 overflow-hidden'>
                        <span className='absolute inset-0 rounded-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left'></span>
                      </span>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}