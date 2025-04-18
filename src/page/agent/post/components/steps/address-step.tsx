import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddress } from "../../hooks/use-get-address";
import type { AddressData } from "../listing-wizard";
import { LoadingSpinner } from "@/components/common";

interface AddressStepProps {
  onSubmit: (data: string) => void;
  onBack: () => void;
}

export default function AddressStep({ onSubmit, onBack }: AddressStepProps) {
  const [formData, setFormData] = useState<AddressData>({
    province: "",
    district: "",
    ward: "",
    street: "",
    fullAddress: "",
  });

  const { provinceQuery, useDistrictQuery, useWardQuery } = useAddress();
  const { data: provinceData, isLoading } = provinceQuery;

  const selectedProvinceId = formData.province ? formData.province.split("|")[0] : "";
  const selectedDistrictId = formData.district ? formData.district.split("|")[0] : "";

  const districtQueryResult = useDistrictQuery(selectedProvinceId);
  const wardQueryResult = useWardQuery(selectedDistrictId);

  const { data: districtData, isLoading: isLoadingDistrict } = districtQueryResult;
  const { data: wardData, isLoading: isLoadingWardData } = wardQueryResult;

  const handleChange = (field: keyof AddressData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "province" ? { district: "", ward: "" } : {}),
      ...(field === "district" ? { ward: "" } : {}),
    }));
  };

  const handleSubmit = () => {
    if (!formData.province || !formData.district || !formData.ward) {
      return;
    }
    const provinceName = formData.province.split("|")[1];
    const districtName = formData.district.split("|")[1];
    const wardName = formData.ward.split("|")[1];
    
    const fullAddress = [
      formData.street,
      wardName,
      districtName,
      provinceName,
    ]
      .filter(Boolean)
      .join(", ");
    onSubmit(fullAddress);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div variants={containerVariants} initial='hidden' animate='visible' className='space-y-6'>
      <motion.h2 variants={itemVariants} className='text-[17px] font-[500] text-gray-700'>
        Chọn địa chỉ
      </motion.h2>
      <motion.div variants={containerVariants} className='space-y-4'>
        <motion.div variants={itemVariants}>
          <Label htmlFor='province' className='mb-[10px] block text-gray-700 font-[500] text-[15px]'>
            Tỉnh/ Thành
          </Label>
          <Select value={formData.province} onValueChange={(value) => handleChange('province', value)}>
            <SelectTrigger id='province' className='w-full'>
              <SelectValue placeholder='Chọn tỉnh/thành' />
            </SelectTrigger>
            <SelectContent>
              {isLoading ? (
                <LoadingSpinner className='mx-auto' />
              ) : (
                <>
                  {provinceData?.data?.map((province: any) => (
                    <SelectItem key={province?.id} value={`${province?.id}|${province?.full_name}`}>
                      {province?.full_name}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Label htmlFor='district' className='mb-[10px] block text-gray-700 font-[500] text-[15px]'>
            Quận/ Huyện
          </Label>
          <Select
            value={formData.district}
            onValueChange={(value) => handleChange('district', value)}
            disabled={!formData.province || isLoadingDistrict}
          >
            <SelectTrigger id='district' className='w-full'>
              <SelectValue placeholder={isLoadingDistrict ? 'Đang tải...' : 'Chọn quận/huyện'} />
            </SelectTrigger>
            <SelectContent>
              {districtData?.data?.map((district: any) => (
                <SelectItem key={district.id} value={`${district.id}|${district.full_name}`}>
                  {district.full_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Label htmlFor='ward' className='mb-[10px] block text-gray-700 font-[500] text-[15px]'>
            Phường/ Xã
          </Label>
          <Select
            value={formData.ward}
            onValueChange={(value) => handleChange('ward', value)}
            disabled={!formData.district || isLoadingWardData}
          >
            <SelectTrigger id='ward' className='w-full'>
              <SelectValue placeholder={isLoadingWardData ? 'Đang tải...' : 'Chọn phường/xã'} />
            </SelectTrigger>
            <SelectContent>
              {wardData?.data?.map((ward: any) => (
                <SelectItem key={ward.id} value={`${ward.id}|${ward.full_name}`}>
                  {ward.full_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Label htmlFor='street' className='mb-[10px] block text-gray-700 font-[500] text-[15px]'>
            Đường/ Phố <span className='text-sm text-gray-500'>(không bắt buộc)</span>
          </Label>
          <Input
            id='street'
            value={formData.street}
            onChange={(e) => handleChange('street', e.target.value)}
            placeholder='Nhập tên đường/phố'
            className='w-full outline-none px-[18px] py-[8px] rounded-[8px]'
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Label htmlFor='fullAddress' className='mb-[10px] block text-gray-700 font-[500] text-[15px]'>
            Địa chỉ hiển thị trên tin đăng
          </Label>
          <Input
            id='fullAddress'
            placeholder='Địa chỉ sẽ được tự động tạo khi bạn chọn các thông tin trên'
            value={
              [
                formData.street,
                formData.ward.split('|')[1],
                formData.district.split('|')[1],
                formData.province.split('|')[1],
              ]
                .filter(Boolean)
                .join(', ') || ''
            }
            readOnly
            className='bg-gray-50 outline-none px-[18px] py-[8px] rounded-[4px]'
          />
        </motion.div>
      </motion.div>
      <motion.div variants={itemVariants} className='flex justify-between pt-4'>
        <Button variant='outline' type='button' onClick={onBack}>
          Quay lại
        </Button>
        <Button
          type='button'
          onClick={handleSubmit}
          disabled={!formData.province || !formData.district || !formData.ward}
          className='relative overflow-hidden'
        >
          <motion.span initial={{ x: -5, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            Xác nhận
          </motion.span>
        </Button>
      </motion.div>
    </motion.div>
  );
}