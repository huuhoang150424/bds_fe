import type React from 'react';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Wallet, BanknoteIcon, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: any;
}

export default function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!plan) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            setIsSuccess(false);
            setIsProcessing(false);
          }, 300);
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
              <h2 className='text-xl font-bold text-center mb-2'>Thanh toán thành công!</h2>
              <p className='text-sm text-gray-500 text-center'>Cảm ơn bạn đã đăng ký Gói Hội viên {plan.name}</p>
            </motion.div>
          ) : (
            <motion.div key='form' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogHeader>
                <DialogTitle>Thanh toán Gói Hội viên {plan.name}</DialogTitle>
                <DialogDescription>
                  Vui lòng chọn phương thức thanh toán và điền thông tin để hoàn tất giao dịch.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit}>
                <div className='grid gap-4 py-4'>
                  <div className='grid gap-2'>
                    <Label htmlFor='payment-method'>Phương thức thanh toán</Label>
                    <RadioGroup
                      defaultValue='card'
                      className='grid grid-cols-3 gap-4'
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                    >
                      <div>
                        <RadioGroupItem value='card' id='card' className='peer sr-only' />
                        <Label
                          htmlFor='card'
                          className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                        >
                          <CreditCard className='mb-3 h-6 w-6' />
                          <span className='text-xs'>Thẻ tín dụng</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value='banking' id='banking' className='peer sr-only' />
                        <Label
                          htmlFor='banking'
                          className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                        >
                          <BanknoteIcon className='mb-3 h-6 w-6' />
                          <span className='text-xs'>Chuyển khoản</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value='wallet' id='wallet' className='peer sr-only' />
                        <Label
                          htmlFor='wallet'
                          className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                        >
                          <Wallet className='mb-3 h-6 w-6' />
                          <span className='text-xs'>Ví điện tử</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <AnimatePresence mode='wait'>
                    {paymentMethod === 'card' && (
                      <motion.div
                        key='card-form'
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className='grid gap-2'>
                          <Label htmlFor='name'>Tên chủ thẻ</Label>
                          <Input id='name' placeholder='Nguyễn Văn A' />
                        </div>
                        <div className='grid gap-2 mt-2'>
                          <Label htmlFor='card-number'>Số thẻ</Label>
                          <Input id='card-number' placeholder='1234 5678 9012 3456' />
                        </div>
                        <div className='grid grid-cols-2 gap-4 mt-2'>
                          <div className='grid gap-2'>
                            <Label htmlFor='expiry'>Ngày hết hạn</Label>
                            <Input id='expiry' placeholder='MM/YY' />
                          </div>
                          <div className='grid gap-2'>
                            <Label htmlFor='cvc'>CVC</Label>
                            <Input id='cvc' placeholder='123' />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {paymentMethod === 'banking' && (
                      <motion.div
                        key='banking-form'
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className='border rounded-md p-4 bg-gradient-to-r from-gray-50 to-white'
                      >
                        <h3 className='font-medium text-sm mb-2'>Thông tin chuyển khoản</h3>
                        <p className='text-xs mb-1'>
                          Ngân hàng: <span className='font-medium'>Vietcombank</span>
                        </p>
                        <p className='text-xs mb-1'>
                          Số tài khoản: <span className='font-medium'>1234567890</span>
                        </p>
                        <p className='text-xs mb-1'>
                          Chủ tài khoản: <span className='font-medium'>CÔNG TY ABC</span>
                        </p>
                        <p className='text-xs mb-1'>
                          Nội dung: <span className='font-medium'>HV {plan.name} - [Số điện thoại]</span>
                        </p>
                        <p className='text-xs mt-3 text-red-500'>
                          Vui lòng chuyển khoản và chụp ảnh biên lai gửi qua Zalo: 0123456789
                        </p>
                      </motion.div>
                    )}

                    {paymentMethod === 'wallet' && (
                      <motion.div
                        key='wallet-form'
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className='grid gap-2'>
                          <Label htmlFor='phone'>Số điện thoại ví điện tử</Label>
                          <Input id='phone' placeholder='0912345678' />
                          <p className='text-xs text-gray-500 mt-1'>Hỗ trợ Momo, ZaloPay, VNPay, ShopeePay</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className='border-t pt-4 mt-2'>
                    <div className='flex justify-between text-sm mb-2'>
                      <span>Gói Hội viên {plan.name}</span>
                      <span>{plan.price}đ</span>
                    </div>
                    <div className='flex justify-between text-sm mb-2'>
                      <span>VAT (10%)</span>
                      <span>{(Number.parseInt(plan.price.replace(/\./g, '')) * 0.1).toLocaleString()}đ</span>
                    </div>
                    <div className='flex justify-between font-bold'>
                      <span>Tổng cộng</span>
                      <span>{(Number.parseInt(plan.price.replace(/\./g, '')) * 1.1).toLocaleString()}đ</span>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button type='button' variant='outline' onClick={onClose} className='text-xs'>
                    Hủy
                  </Button>
                  <Button
                    type='submit'
                    className='bg-red-500 hover:bg-red-600 text-xs relative overflow-hidden'
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
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
                      'Thanh toán ngay'
                    )}
                    {!isProcessing && (
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
