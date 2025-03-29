'use client';

import React, { useState } from 'react';
import { Cat, Dog, Fish, Rabbit, Turtle } from 'lucide-react';
import { MultiSelect } from '@/components/core/multi-selector';

const provincesList = [
    { value: 'hanoi', label: 'Hà Nội' },
    { value: 'hochiminh', label: 'TP. Hồ Chí Minh' },
    { value: 'haiphong', label: 'Hải Phòng' },
    { value: 'danang', label: 'Đà Nẵng' },
    { value: 'cantho', label: 'Cần Thơ' },
    { value: 'angiang', label: 'An Giang' },
    { value: 'bacgiang', label: 'Bắc Giang' },
    { value: 'backan', label: 'Bắc Kạn' },
    { value: 'baclieu', label: 'Bạc Liêu' },
    { value: 'bacninh', label: 'Bắc Ninh' },
    { value: 'baria-vungtau', label: 'Bà Rịa - Vũng Tàu' },
    { value: 'bentre', label: 'Bến Tre' },
    { value: 'binhdinh', label: 'Bình Định' },
    { value: 'binhduong', label: 'Bình Dương' },
    { value: 'binhphuoc', label: 'Bình Phước' },
    { value: 'binhthuan', label: 'Bình Thuận' },
    { value: 'camau', label: 'Cà Mau' },
    { value: 'caobang', label: 'Cao Bằng' },
    { value: 'daklak', label: 'Đắk Lắk' },
    { value: 'daknong', label: 'Đắk Nông' },
    { value: 'dienbien', label: 'Điện Biên' },
    { value: 'dongnai', label: 'Đồng Nai' },
    { value: 'dongthap', label: 'Đồng Tháp' },
    { value: 'gialai', label: 'Gia Lai' },
    { value: 'hagiang', label: 'Hà Giang' },
    { value: 'hanam', label: 'Hà Nam' },
    { value: 'hatinh', label: 'Hà Tĩnh' },
    { value: 'haiduong', label: 'Hải Dương' },
    { value: 'haugiang', label: 'Hậu Giang' },
    { value: 'hoabinh', label: 'Hòa Bình' },
    { value: 'hungyen', label: 'Hưng Yên' },
    { value: 'khanhhoa', label: 'Khánh Hòa' },
    { value: 'kiengiang', label: 'Kiên Giang' },
    { value: 'kontum', label: 'Kon Tum' },
    { value: 'laichau', label: 'Lai Châu' },
    { value: 'lamdong', label: 'Lâm Đồng' },
    { value: 'langson', label: 'Lạng Sơn' },
    { value: 'laocai', label: 'Lào Cai' },
    { value: 'longan', label: 'Long An' },
    { value: 'namdinh', label: 'Nam Định' },
    { value: 'nghean', label: 'Nghệ An' },
    { value: 'ninhbinh', label: 'Ninh Bình' },
    { value: 'ninhthuan', label: 'Ninh Thuận' },
    { value: 'phutho', label: 'Phú Thọ' },
    { value: 'phuyen', label: 'Phú Yên' },
    { value: 'quangbinh', label: 'Quảng Bình' },
    { value: 'quangnam', label: 'Quảng Nam' },
    { value: 'quangngai', label: 'Quảng Ngãi' },
    { value: 'quangninh', label: 'Quảng Ninh' },
    { value: 'quangtri', label: 'Quảng Trị' },
    { value: 'soctrang', label: 'Sóc Trăng' },
    { value: 'sonla', label: 'Sơn La' },
    { value: 'tayninh', label: 'Tây Ninh' },
    { value: 'thaibinh', label: 'Thái Bình' },
    { value: 'thainguyen', label: 'Thái Nguyên' },
    { value: 'thanhhoa', label: 'Thanh Hóa' },
    { value: 'thuathienhue', label: 'Thừa Thiên Huế' },
    { value: 'tiengiang', label: 'Tiền Giang' },
    { value: 'travinh', label: 'Trà Vinh' },
    { value: 'tuyenquang', label: 'Tuyên Quang' },
    { value: 'vinhlong', label: 'Vĩnh Long' },
    { value: 'vinhphuc', label: 'Vĩnh Phúc' },
    { value: 'yenbai', label: 'Yên Bái' },
  ];

function Tags() {
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([
    'hochiminh',
    'danang',
  ]);

  return (
    <div className='pt-8 pb-16 w-[400px]'>
      <MultiSelect
        options={provincesList}
        onValueChange={setSelectedProvinces}
        defaultValue={selectedProvinces}
        placeholder='Chọn tỉnh/thành phố'
        popoverClass='w-96'
        maxCount={3}
      />
      <div className='mt-4'>
        <h2 className='text-xl font-semibold'>Chọn các tỉnh liên quan:</h2>
        <ul className='list-disc list-inside'>
          {selectedProvinces.map((province) => {
            const selected = provincesList.find((p) => p.value === province);
            return <li key={province}>{selected?.label}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Tags;