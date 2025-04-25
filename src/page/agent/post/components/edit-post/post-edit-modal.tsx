import React from 'react';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { cn } from '@/lib/utils';

// Enums from your model
const PriceUnit = {
  VND: 'VND',
  USD: 'USD',
};

const Directions = {
  NORTH: 'Bắc',
  SOUTH: 'Nam',
  EAST: 'Đông',
  WEST: 'Tây',
  NORTHEAST: 'Đông Bắc',
  NORTHWEST: 'Tây Bắc',
  SOUTHEAST: 'Đông Nam',
  SOUTHWEST: 'Tây Nam',
};

const StatusPost = {
  AVAILABLE: 'Còn trống',
  NEGOTIATING: 'Đang đám phán',
  DELIVERED: 'Đã bàn giao',
};

interface PostEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post?: any;
  onSave: (post: any) => void;
}

export function PostEditModal({ open, onOpenChange, post, onSave }: PostEditModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    priceUnit: PriceUnit.VND,
    address: '',
    price: 0,
    squareMeters: 0,
    description: '',
    floor: 0,
    bedroom: 0,
    bathroom: 0,
    priority: 0,
    isFurniture: false,
    direction: Directions.NORTH,
    verified: false,
    expiredDate: new Date(),
    status: StatusPost.AVAILABLE,
  });

  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (post) {
      setFormData({
        ...post,
        expiredDate: post.expiredDate ? new Date(post.expiredDate) : new Date(),
      });
      setDate(post.expiredDate ? new Date(post.expiredDate) : new Date());
    }
  }, [post]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number.parseFloat(value) : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setFormData({
        ...formData,
        expiredDate: date,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0 gap-0'>
        <div className='bg-gradient-to-r from-rose-100 to-teal-100 p-6 rounded-t-lg'>
          <DialogHeader className='mb-2'>
            <DialogTitle className='text-2xl font-bold text-gray-800'>Chỉnh sửa bất động sản</DialogTitle>
            <p className='text-gray-600 text-base'>Cập nhật thông tin chi tiết về bất động sản của bạn</p>
            <Button
              variant='ghost'
              size='icon'
              className='absolute right-4 top-4 hover:bg-white/20 rounded-full'
              onClick={() => onOpenChange(false)}
            >
              <X className='h-4 w-4' />
            </Button>
          </DialogHeader>
        </div>
        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm'>
              <Label htmlFor='title' className='text-base font-medium text-gray-700'>
                Tiêu đề
              </Label>
              <Input
                id='title'
                name='title'
                value={formData.title}
                onChange={handleChange}
                className='text-base border-gray-200 focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all'
                required
              />
            </div>

            <div className='space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm'>
              <Label htmlFor='address' className='text-base font-medium text-gray-700'>
                Địa chỉ
              </Label>
              <Input
                id='address'
                name='address'
                value={formData.address}
                onChange={handleChange}
                className='text-base border-gray-200 focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all'
                required
              />
            </div>

            <div className='space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm'>
              <Label htmlFor='price' className='text-base font-medium text-gray-700'>
                Giá
              </Label>
              <div className='flex gap-2'>
                <Input
                  id='price'
                  name='price'
                  type='number'
                  value={formData.price}
                  onChange={handleChange}
                  className='text-base border-gray-200 focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all'
                  required
                />
                <Select value={formData.priceUnit} onValueChange={(value) => handleSelectChange('priceUnit', value)}>
                  <SelectTrigger className='w-[100px] text-base border-gray-200 focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all'>
                    <SelectValue placeholder='Đơn vị' />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(PriceUnit).map((unit) => (
                      <SelectItem key={unit} value={unit} className='text-base'>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm'>
              <Label htmlFor='squareMeters' className='text-base font-medium text-gray-700'>
                Diện tích (m²)
              </Label>
              <Input
                id='squareMeters'
                name='squareMeters'
                type='number'
                value={formData.squareMeters}
                onChange={handleChange}
                className='text-base border-gray-200 focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all'
                required
              />
            </div>

            <div className='space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm'>
              <Label htmlFor='floor' className='text-base font-medium text-gray-700'>
                Tầng
              </Label>
              <Input
                id='floor'
                name='floor'
                type='number'
                value={formData.floor}
                onChange={handleChange}
                className='text-base border-gray-200 focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all'
                required
              />
            </div>

            <div className='space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm'>
              <Label htmlFor='bedroom' className='text-base font-medium text-gray-700'>
                Phòng ngủ
              </Label>
              <Input
                id='bedroom'
                name='bedroom'
                type='number'
                value={formData.bedroom}
                onChange={handleChange}
                className='text-base border-gray-200 focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all'
                required
              />
            </div>

            <div className='space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm'>
              <Label htmlFor='bathroom' className='text-base font-medium text-gray-700'>
                Phòng tắm
              </Label>
              <Input
                id='bathroom'
                name='bathroom'
                type='number'
                value={formData.bathroom}
                onChange={handleChange}
                className='text-base border-gray-200 focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all'
                required
              />
            </div>

            <div className='space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm'>
              <Label htmlFor='priority' className='text-base font-medium text-gray-700'>
                Ưu tiên
              </Label>
              <Input
                id='priority'
                name='priority'
                type='number'
                value={formData.priority}
                onChange={handleChange}
                className='text-base border-gray-200 focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all'
              />
            </div>

            <div className='space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm'>
              <Label htmlFor='direction' className='text-base font-medium text-gray-700'>
                Hướng
              </Label>
              <Select value={formData.direction} onValueChange={(value) => handleSelectChange('direction', value)}>
                <SelectTrigger className='text-base border-gray-200 focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all'>
                  <SelectValue placeholder='Chọn hướng' />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Directions).map((direction) => (
                    <SelectItem key={direction} value={direction} className='text-base'>
                      {direction}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm'>
              <Label htmlFor='status' className='text-base font-medium text-gray-700'>
                Trạng thái
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                <SelectTrigger className='text-base border-gray-200 focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all'>
                  <SelectValue placeholder='Chọn trạng thái' />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(StatusPost).map((status) => (
                    <SelectItem key={status} value={status} className='text-base'>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm'>
              <Label htmlFor='expiredDate' className='text-base font-medium text-gray-700'>
                Ngày hết hạn
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal text-base border-gray-200 focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all',
                      !date && 'text-muted-foreground',
                    )}
                  >
                    {date ? format(date, 'dd/MM/yyyy', { locale: vi }) : <span>Chọn ngày</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar mode='single' selected={date} onSelect={handleDateChange} initialFocus locale={vi} />
                </PopoverContent>
              </Popover>
            </div>

            <div className='flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm'>
              <Switch
                id='isFurniture'
                checked={formData.isFurniture}
                onCheckedChange={(checked) => handleSwitchChange('isFurniture', checked)}
                className='data-[state=checked]:bg-teal-500'
              />
              <Label htmlFor='isFurniture' className='text-base font-medium text-gray-700'>
                Có nội thất
              </Label>
            </div>

            <div className='flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm'>
              <Switch
                id='verified'
                checked={formData.verified}
                onCheckedChange={(checked) => handleSwitchChange('verified', checked)}
                className='data-[state=checked]:bg-teal-500'
              />
              <Label htmlFor='verified' className='text-base font-medium text-gray-700'>
                Đã xác minh
              </Label>
            </div>
          </div>

          <div className='space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm col-span-1 md:col-span-2'>
            <Label htmlFor='description' className='text-base font-medium text-gray-700'>
              Mô tả
            </Label>
            <Textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              className='min-h-[120px] text-base border-gray-200 focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all'
              required
            />
          </div>

          <div className='flex justify-end space-x-4 pt-4 border-t'>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
              className='text-base border-gray-300 hover:bg-gray-100 transition-colors'
            >
              Hủy
            </Button>
            <Button
              type='submit'
              className='text-base bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 transition-colors'
            >
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
