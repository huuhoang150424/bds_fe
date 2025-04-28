import { useState, useEffect } from 'react';
import { CreditCard, Wallet, ArrowRight } from 'lucide-react';
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
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import PaymentSuccessDialog from './payment-success';
import { useCreatePayment } from '../hooks/use-create-payment';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { paymentSchema, type FormPayment } from '../schema/create-payment';


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
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const createPaymentMutation = useCreatePayment();
  const form = useForm<FormPayment>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: defaultAmount,
      description: defaultDescription,
    },
  });

  const onSubmit = async (values: FormPayment) => {

  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {isSuccess ? (
        <PaymentSuccessDialog amount={form.getValues().amount} />
      ) : (
        <DialogContent className="max-w-md p-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-400"></div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader className="bg-gradient-to-r from-red-500 to-red-400 text-white rounded-t-lg p-6 pb-5 relative">
                <div className="absolute top-[10px] left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-red-600 to-red-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <div className="mt-8">
                  <DialogTitle className="text-base mt-8 text-center">Nạp Tiền Vào Tài Khoản</DialogTitle>
                  <DialogDescription className="text-white/90 text-center text-sm">
                    Nạp tiền an toàn qua cổng thanh toán PayOS
                  </DialogDescription>
                </div>
              </DialogHeader>

              <div className="p-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm">Số tiền (VNĐ)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Nhập số tiền"
                            className="focus:ring-red-500 focus:border-red-500 outline-none px-[12px] py-[8px] text-sm"
                            min={1}
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm">Mô tả</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Nhập mô tả (tùy chọn)"
                            className="focus:ring-red-500 focus:border-red-500 outline-none text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h4 className="font-medium text-gray-700 mb-3 text-sm">Phương thức thanh toán</h4>
                    <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-md hover:border-red-300 transition-colors cursor-pointer">
                      <div className="h-12 w-12 bg-gradient-to-r from-red-500 to-red-400 rounded-md flex items-center justify-center text-white shadow-sm">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">PayOS</p>
                        <p className="text-xs text-gray-500">Thanh toán an toàn qua cổng PayOS</p>
                      </div>
                      <div className="ml-auto">
                        <div className="w-5 h-5 rounded-full border-2 border-red-500 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 p-6 pt-0">
                <div className="w-full flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-100">
                  <span className="text-gray-700 text-sm">Tổng thanh toán:</span>
                  <span className="text-lg font-bold text-red-600">
                    {form.getValues().amount?.toLocaleString() || '0'} VNĐ
                  </span>
                </div>

                <Button
                  type="submit"
                  className={cn(
                    "w-full bg-gradient-to-r from-red-600 to-red-400 hover:from-red-700 hover:to-red-500 transition-all duration-300",
                    "transform hover:scale-105 active:scale-95 shadow-md",
                    "group overflow-hidden relative text-sm",
                  )}
                  disabled={isProcessing || createPaymentMutation.isPending || !form.formState.isValid}
                >
                  {isProcessing || createPaymentMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang xử lý...</span>
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10 flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                        Xác nhận thanh toán
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
}