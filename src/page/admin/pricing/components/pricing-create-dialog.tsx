import type React from 'react';
import { useState } from 'react';
import { Plus, Loader2, DollarSign, Percent, Calendar, Tag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { PricingLevel } from './column';

interface PricingCreateDialogProps {
  trigger?: React.ReactNode;
  onPricingCreated?: (pricing: any) => void;
}

export function PricingCreateDialog({ trigger, onPricingCreated }: PricingCreateDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pricingData, setPricingData] = useState({
    name: PricingLevel.BASIC,
    description: '',
    price: 9.99,
    discountPercent: 0,
    displayDay: 10,
    hasReport: false,
    maxPost: 10,
    boostDays: 1,
    expiredDay: 30,
  });

  // Tính giá đã chiết khấu
  const calculateDiscountedPrice = (price: number, discountPercent: number) => {
    return price - (price * discountPercent) / 100;
  };

  // Định dạng tiền tệ
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = async () => {};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size='sm' variant={'outline'} className='bg-red-500 hover:bg-red-600 text-white'>
            <Plus className='mr-1.5 h-3 w-3' />
            Tạo Gói
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg border-red-100 overflow-hidden max-h-[90vh] p-0'>
        <div className='overflow-y-auto max-h-[calc(90vh-30px)] px-6 py-6'>
          <DialogHeader>
            <DialogTitle className='text-base flex items-center gap-2'>
              <Tag className='h-4 w-4 text-red-500' />
              Tạo Gói Giá
            </DialogTitle>
            <DialogDescription className='text-[13px]'>
              Tạo một gói giá mới với các tính năng và giá cả tùy chỉnh.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-2'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='name' className='text-[13px] font-medium'>
                  Cấp Gói <span className='text-red-500'>*</span>
                </Label>
                <Select
                  value={pricingData.name}
                  onValueChange={(value: PricingLevel) => setPricingData({ ...pricingData, name: value })}
                >
                  <SelectTrigger id='name' className='text-[14px] text-gray-700 outline-none pl-[10px] pr-[10px]  py-[6px] rounded-[8px]'>
                    <SelectValue placeholder='Chọn cấp gói' />
                  </SelectTrigger>
                  <SelectContent className='z-[99999] '>
                    {Object.values(PricingLevel).map((level) => (
                      <SelectItem key={level} value={level} className='text-[13px]'>
                        <div className='flex items-center gap-2'>
                          <Badge
                            className={`text-[10px] font-medium ${
                              level === PricingLevel.FREE
                                ? 'bg-gray-100 text-gray-700'
                                : level === PricingLevel.BASIC
                                  ? 'bg-blue-100 text-blue-700'
                                  : level === PricingLevel.STANDARD
                                    ? 'bg-green-100 text-green-700'
                                    : level === PricingLevel.PREMIUM
                                      ? 'bg-purple-100 text-purple-700'
                                      : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {level}
                          </Badge>
                          <span>{level}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='price' className='text-[13px] font-medium'>
                  Giá <span className='text-red-500'>*</span>
                </Label>
                <div className='relative'>
                  <DollarSign className='absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    id='price'
                    type='number'
                    step='0.01'
                    min='0'
                    className='text-[14px] text-gray-700 outline-none pl-[26px] pr-[10px]  py-[6px] rounded-[8px] '
                    value={pricingData.price}
                    onChange={(e) => setPricingData({ ...pricingData, price: Number.parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='description' className='text-[13px] font-medium'>
                Mô Tả <span className='text-red-500'>*</span>
              </Label>
              <Textarea
                id='description'
                placeholder='Nhập mô tả gói'
                className='text-[13px] min-h-[80px] resize-none'
                value={pricingData.description}
                onChange={(e) => setPricingData({ ...pricingData, description: e.target.value })}
              />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='discountPercent' className='text-[13px] font-medium'>
                  Phần Trăm Chiết Khấu
                </Label>
                <div className='flex items-center gap-2'>
                  <Badge className='text-[10px] bg-red-100 text-red-700'>{pricingData.discountPercent}%</Badge>
                  {pricingData.discountPercent > 0 && (
                    <div className='text-[10px] text-muted-foreground'>
                      Giá cuối: {formatCurrency(calculateDiscountedPrice(pricingData.price, pricingData.discountPercent))}
                    </div>
                  )}
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <Slider
                  id='discountPercent'
                  min={0}
                  max={100}
                  step={5}
                  value={[pricingData.discountPercent]}
                  onValueChange={(value) => setPricingData({ ...pricingData, discountPercent: value[0] })}
                  className='flex-1'
                />
                <div className='relative w-20'>
                  <Percent className='absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    type='number'
                    min={0}
                    max={100}
                    step={1}
                    className='text-[14px] text-gray-700 outline-none pl-[26px] pr-[10px]  py-[6px] rounded-[8px]  w-20'
                    value={pricingData.discountPercent}
                    onChange={(e) =>
                      setPricingData({
                        ...pricingData,
                        discountPercent: Math.min(100, Math.max(0, Number.parseInt(e.target.value) || 0)),
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <Separator className='my-2 bg-red-100' />
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='displayDay' className='text-[13px] font-medium'>
                  Số Ngày Hiển Thị
                </Label>
                <div className='relative'>
                  <Calendar className='absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    id='displayDay'
                    type='number'
                    min='1'
                    className='text-[14px] text-gray-700 outline-none pl-[26px] pr-[10px]  py-[6px] rounded-[8px] '
                    value={pricingData.displayDay}
                    onChange={(e) =>
                      setPricingData({ ...pricingData, displayDay: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <p className='text-[10px] text-muted-foreground'>Số ngày nội dung sẽ được hiển thị</p>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='expiredDay' className='text-[13px] font-medium'>
                  Số Ngày Hết Hạn
                </Label>
                <div className='relative'>
                  <Calendar className='absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    id='expiredDay'
                    type='number'
                    min='1'
                    className='text-[14px] text-gray-700 outline-none pl-[26px] pr-[10px]  py-[6px] rounded-[8px] '
                    value={pricingData.expiredDay}
                    onChange={(e) =>
                      setPricingData({ ...pricingData, expiredDay: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <p className='text-[10px] text-muted-foreground'>Số ngày cho đến khi gói hết hạn</p>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='maxPost' className='text-[13px] font-medium'>
                  Số Bài Đăng Tối Đa
                </Label>
                <Input
                  id='maxPost'
                  type='number'
                  min='0'
                  className='text-[14px] text-gray-700 outline-none pl-[10px] pr-[10px]  py-[6px] rounded-[8px]'
                  value={pricingData.maxPost}
                  onChange={(e) => setPricingData({ ...pricingData, maxPost: Number.parseInt(e.target.value) || 0 })}
                />
                <p className='text-[10px] text-muted-foreground'>Số lượng bài đăng tối đa được phép</p>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='boostDays' className='text-[13px] font-medium'>
                  Số Ngày Tăng Tốc
                </Label>
                <Input
                  id='boostDays'
                  type='number'
                  min='0'
                  className='text-[14px] text-gray-700 outline-none pl-[10px] pr-[10px]  py-[6px] rounded-[8px]'
                  value={pricingData.boostDays}
                  onChange={(e) => setPricingData({ ...pricingData, boostDays: Number.parseInt(e.target.value) || 0 })}
                />
                <p className='text-[10px] text-muted-foreground'>Số ngày nội dung sẽ được tăng tốc</p>
              </div>
            </div>
            <div className='flex items-center justify-between rounded-lg border border-red-100 p-3'>
              <div className='space-y-0.5'>
                <Label htmlFor='hasReport' className='text-[13px] font-medium'>
                  Bao Gồm Báo Cáo
                </Label>
                <p className='text-[10px] text-muted-foreground'>Kích hoạt báo cáo phân tích chi tiết</p>
              </div>
              <Switch
                id='hasReport'
                checked={pricingData.hasReport}
                onCheckedChange={(checked) => setPricingData({ ...pricingData, hasReport: checked })}
                className='data-[state=checked]:bg-red-500'
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              size='sm'
              className='h-8 text-[13px]'
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button
              type='button'
              size='sm'
              variant={'outline'}
              className='bg-red-500 hover:bg-red-600 text-white'
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-1.5 h-3 w-3 animate-spin' />
                  Đang tạo...
                </>
              ) : (
                <>
                  <Plus className='mr-1.5 h-3 w-3' />
                  Tạo Gói
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}