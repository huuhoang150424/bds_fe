import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { AddressData } from '../listing-wizard';

interface AddressStepProps {
  onSubmit: (data: AddressData) => void;
  onBack: () => void;
}

export default function AddressStep({ onSubmit, onBack }: AddressStepProps) {
  const [formData, setFormData] = useState<AddressData>({
    province: '',
    district: '',
    ward: '',
    street: '',
    fullAddress: '',
  });

  const provinces = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng'];
  const districts = ['Quận 1', 'Quận 2', 'Quận 3', 'Quận Hoàn Kiếm', 'Quận Ba Đình'];
  const wards = ['Phường Bến Nghé', 'Phường Bến Thành', 'Phường Đa Kao'];
  const streets = ['Đường Lê Lợi', 'Đường Nguyễn Huệ', 'Đường Đồng Khởi'];

  const handleChange = (field: keyof AddressData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.province || !formData.district || !formData.ward) {
      return;
    }
    const fullAddress = [formData.street, formData.ward, formData.district, formData.province]
      .filter(Boolean)
      .join(', ');

    onSubmit({
      ...formData,
      fullAddress,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.div variants={containerVariants} initial='hidden' animate='visible' className='space-y-6'>
      <motion.h2 variants={itemVariants} className='text-[17px]  font-[500] text-gray-700 '>
        Chọn địa chỉ
      </motion.h2>

      <motion.div variants={containerVariants} className='space-y-4'>
        <motion.div variants={itemVariants}>
          <Label htmlFor='province' className='mb-[10px] block text-gray-700 font-[500] text-[15px]  '>
            Tỉnh/ Thành
          </Label>
          <Select value={formData.province} onValueChange={(value) => handleChange('province', value)}>
            <SelectTrigger id='province' className='w-full'>
              <SelectValue placeholder='Chọn tỉnh/thành' />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((province) => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Label htmlFor='district' className='mb-[10px] block text-gray-700 font-[500] text-[15px]  '>
            Quận/ Huyện
          </Label>
          <Select value={formData.district} onValueChange={(value) => handleChange('district', value)}>
            <SelectTrigger id='district' className='w-full'>
              <SelectValue placeholder='Chọn quận/huyện' />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Label htmlFor='ward' className='mb-[10px] block text-gray-700 font-[500] text-[15px]  '>
            Phường/ Xã
          </Label>
          <Select value={formData.ward} onValueChange={(value) => handleChange('ward', value)}>
            <SelectTrigger id='ward' className='w-full'>
              <SelectValue placeholder='Chọn phường/xã' />
            </SelectTrigger>
            <SelectContent>
              {wards.map((ward) => (
                <SelectItem key={ward} value={ward}>
                  {ward}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Label htmlFor='street' className='mb-[10px] block text-gray-700 font-[500] text-[15px]  '>
            Đường/ Phố <span className='text-sm text-gray-500'>(không bắt buộc)</span>
          </Label>
          <Select value={formData.street} onValueChange={(value) => handleChange('street', value)}>
            <SelectTrigger id='street' className='w-full'>
              <SelectValue placeholder='Chọn đường/phố' />
            </SelectTrigger>
            <SelectContent>
              {streets.map((street) => (
                <SelectItem key={street} value={street}>
                  {street}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Label htmlFor='fullAddress' className='mb-[10px] block text-gray-700 font-[500] text-[15px]  '>
            Địa chỉ hiển thị trên tin đăng
          </Label>
          <Input
            id='fullAddress'
            placeholder='Địa chỉ sẽ được tự động tạo khi bạn chọn các thông tin trên'
            value={
              [formData.street, formData.ward, formData.district, formData.province].filter(Boolean).join(', ') || ''
            }
            readOnly
            className='bg-gray-50 outline-none px-[18px] py-[8px] rounded-[4px] '
          />
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className='flex justify-between pt-4'>
        <Button variant='outline' type='button' onClick={onBack}>
          Quay lại
        </Button>
        <Button type='button' onClick={handleSubmit} className='relative overflow-hidden'>
          <motion.span initial={{ x: -5, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            Xác nhận
          </motion.span>
        </Button>
      </motion.div>
    </motion.div>
  );
}
