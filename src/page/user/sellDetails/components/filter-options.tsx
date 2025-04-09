'use client';

import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { ChevronDown, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useDebounce } from 'use-debounce';
import { vietnameseProvinces } from '@/constant/const-sell-detail';

interface FilterOptionsProps {
  bedrooms: number;
  setBedrooms: (value: number) => void;
  bathrooms: number;
  setBathrooms: (value: number) => void;
  floors: number;
  setFloors: (value: number) => void;
  direction: string;
  setDirection: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  areaRange: [number, number];
  setAreaRange: (value: [number, number]) => void;
  selectedProvinces: string[];
  setSelectedProvinces: (value: string[]) => void;
 
  onFilterSearch: (filters: any) => void;
}

export default function FilterOptions({
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,
  floors,
  setFloors,
  direction,
  setDirection,
  priceRange,
  setPriceRange,
  areaRange,
  setAreaRange,
  selectedProvinces,
  setSelectedProvinces,
  onFilterSearch,
}: FilterOptionsProps) {
  const houseDirections = ['Đông', 'Tây', 'Nam', 'Bắc', 'Đông Bắc', 'Đông Nam', 'Tây Bắc', 'Tây Nam'];

  const [searchInput, setSearchInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [debouncedSearchInput] = useDebounce(searchInput, 300);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handleReset = () => {
    setBedrooms(0);
    setBathrooms(0);
    setFloors(0);
    setDirection('');
    setPriceRange([0, 20]);
    setAreaRange([0, 500]);
    setSelectedProvinces([]);
  };
  const filteredProvinces = vietnameseProvinces.filter(
    (province) => province.toLowerCase().includes(searchInput.toLowerCase()) && !selectedProvinces.includes(province),
  );

  const handleProvinceSelect = (province: string) => {
    setSelectedProvinces([province]); // Thay thế toàn bộ mảng bằng một giá trị mới
    setSearchInput('');
    setIsDropdownOpen(false);
  };

  const handleRemoveProvince = () => {
    setSelectedProvinces([]); // Xóa lựa chọn hiện tại
  };
  // Hàm xử lý nút tìm kiếm
  const handleSearchClick = () => {
    // Tạo object chứa dữ liệu lọc
    const filters = {
      bedrooms,
      bathrooms,
      floors,
      direction,
      minPrice: priceRange[0] * 1000000000, // Chuyển sang số lớn
      maxPrice: priceRange[1] * 1000000000, // Chuyển sang số lớn
      minArea: areaRange[0],
      maxArea: areaRange[1],
      keyword: selectedProvinces, // Truyền selectedProvinces làm keyword
    };

    onFilterSearch(filters); // Gọi hàm callback với dữ liệu
    setIsPopoverOpen(false); // Đóng popover
  };
  return (
    <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full sm:w-[80%]'>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' className='w-full sm:w-[100%] justify-between bg-white text-gray-600 border'>
            <span className='text-sm truncate'>Lọc</span>
            <MdKeyboardArrowDown className='h-4 w-4 flex-shrink-0' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[1000px] sm:w-[1000px] p-0' align='start'>
          <div className='relative w-full'>
            <div className='flex items-center border rounded-lg p-2 bg-white'>
              <Search className='h-5 w-5 text-gray-400 mr-2' />

              <div className='flex flex-wrap gap-2 flex-1'>
                {selectedProvinces.map((province) => (
                  <div key={province} className='flex items-center bg-gray-100 rounded-md px-2 py-1'>
                    <span className='text-sm'>{province}</span>
                    <button
                      onClick={() => handleRemoveProvince()}
                      className='ml-1 text-gray-500 hover:text-gray-700'
                    >
                      <X className='h-3 w-3' />
                    </button>
                  </div>
                ))}

                <div className='relative flex-1 min-w-[120px]'>
                  <input
                    type='text'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onFocus={() => setIsDropdownOpen(true)}
                    // onBlur={handleBlur}
                    placeholder={selectedProvinces.length === 0 ? 'Tìm kiếm tỉnh thành...' : ''}
                    className='w-full border-none outline-none text-sm'
                  />
                </div>
              </div>

              <Button
                className='mr-[10px]'
                variant='ghost'
                size='sm'
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <ChevronDown className='h-4 w-4' />
              </Button>
            </div>

            {isDropdownOpen && (
              <div className='absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto'>
                {filteredProvinces.length > 0 ? (
                  filteredProvinces.map((province) => (
                    <div
                      key={province}
                      className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm'
                      onClick={() => {
                        handleProvinceSelect(province);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {province}
                    </div>
                  ))
                ) : (
                  <div className='px-4 py-2 text-gray-500 text-sm'>Không tìm thấy kết quả</div>
                )}
              </div>
            )}
          </div>
          <Card className='mb-6'>
            <CardContent className='pt-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <div>
                  <Label htmlFor='bedrooms'>Số phòng ngủ</Label>
                  <Select value={bedrooms.toString()} onValueChange={(value) => setBedrooms(Number(value))}>
                    <SelectTrigger id='bedrooms'>
                      <SelectValue placeholder='Chọn số phòng' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='1'>1</SelectItem>
                      <SelectItem value='2'>2</SelectItem>
                      <SelectItem value='3'>3</SelectItem>
                      <SelectItem value='4'>4</SelectItem>
                      <SelectItem value='5+'>5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='bathrooms'>Số phòng tắm</Label>
                  <Select value={bathrooms.toString()} onValueChange={(value) => setBathrooms(Number(value))}>
                    <SelectTrigger id='bathrooms'>
                      <SelectValue placeholder='Chọn số phòng' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='1'>1</SelectItem>
                      <SelectItem value='2'>2</SelectItem>
                      <SelectItem value='3'>3</SelectItem>
                      <SelectItem value='4'>4</SelectItem>
                      <SelectItem value='5+'>5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='floors'>Số tầng</Label>
                  <Select value={floors.toString()} onValueChange={(value) => setFloors(Number(value))}>
                    <SelectTrigger id='floors'>
                      <SelectValue placeholder='Chọn số tầng' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='1'>1</SelectItem>
                      <SelectItem value='2'>2</SelectItem>
                      <SelectItem value='3'>3</SelectItem>
                      <SelectItem value='4'>4</SelectItem>
                      <SelectItem value='5+'>5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='direction'>Hướng nhà</Label>
                  <Select value={direction} onValueChange={setDirection}>
                    <SelectTrigger id='direction'>
                      <SelectValue placeholder='Chọn hướng' />
                    </SelectTrigger>
                    <SelectContent>
                      {houseDirections.map((dir) => (
                        <SelectItem key={dir} value={dir}>
                          {dir}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='space-y-6'>
                  <div>
                    <div className='flex justify-between mb-2'>
                      <Label>Giá (tỷ VNĐ)</Label>
                      <div className='text-sm'>
                        {priceRange[0]} - {priceRange[1]} tỷ VNĐ
                      </div>
                    </div>
                    <Slider
                      defaultValue={[0, 20]}
                      max={20}
                      step={0.5}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className='my-4'
                    />
                    <div className='flex justify-between'>
                      <div className='w-[48%]'>
                        <Label htmlFor='minPrice'>Giá nhỏ nhất </Label>
                        <Input
                          id='minPrice'
                          type='number'
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number.parseFloat(e.target.value), priceRange[1]])}
                          min={0}
                          max={priceRange[1]}
                          step={0.5}
                          className='p-[4px]'
                        />
                      </div>
                      <div className='w-[48%]'>
                        <Label htmlFor='maxPrice'>Giá lớn nhất</Label>
                        <Input
                          id='maxPrice'
                          type='number'
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number.parseFloat(e.target.value)])}
                          min={priceRange[0]}
                          max={20}
                          step={0.5}
                          className='p-[4px]'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='space-y-6'>
                  <div>
                    <div className='flex justify-between mb-2'>
                      <Label>Diện tích (m²)</Label>
                      <div className='text-sm'>
                        {areaRange[0]} - {areaRange[1]} m²
                      </div>
                    </div>
                    <Slider
                      defaultValue={[0, 500]}
                      max={500}
                      step={10}
                      value={areaRange}
                      onValueChange={(value) => setAreaRange(value as [number, number])}
                      className='my-4'
                    />
                    <div className='flex justify-between'>
                      <div className='w-[48%]'>
                        <Label htmlFor='minArea'>Diện tích nhỏ nhất</Label>
                        <Input
                          id='minArea'
                          type='number'
                          value={areaRange[0]}
                          onChange={(e) => setAreaRange([Number.parseFloat(e.target.value), areaRange[1]])}
                          min={0}
                          max={areaRange[1]}
                          step={10}
                          className='p-[4px]'
                        />
                      </div>
                      <div className='w-[48%]'>
                        <Label htmlFor='maxArea'>Diện tích lớn nhất</Label>
                        <Input
                          id='maxArea'
                          type='number'
                          value={areaRange[1]}
                          onChange={(e) => setAreaRange([areaRange[0], Number.parseFloat(e.target.value)])}
                          min={areaRange[0]}
                          max={500}
                          step={10}
                          className='p-[4px]'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=' flex justify-end gap-4 mt-[20px]'>
                <Button
                  variant='outline'
                  onClick={handleReset}
                  className='w-full md:w-auto bg-[#fff] hover:bg-[#f2f2f2] text-black'
                >
                  Đặt lại
                </Button>
                <Button className='bg-[#E03C31] hover:bg-[#FF837A] text-white' onClick={handleSearchClick}>Tìm kiếm</Button>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
}

