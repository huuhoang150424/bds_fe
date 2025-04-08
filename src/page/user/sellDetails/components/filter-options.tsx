'use client';

import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { X } from 'lucide-react';
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

interface FilterOptionsProps {
  showAreaFilter: boolean;
  setShowAreaFilter: (show: boolean) => void;
  minArea: string;
  setMinArea: (area: string) => void;
  maxArea: string;
  setMaxArea: (area: string) => void;
  selectedAreaOption: string;
  handleAreaOptionChange: (value: string) => void;
  showPriceFilter: boolean;
  setShowPriceFilter: (show: boolean) => void;
  minPrice: string;
  setMinPrice: (price: string) => void;
  maxPrice: string;
  setMaxPrice: (price: string) => void;
  selectedPriceOption: string;
  handlePriceOptionChange: (value: string) => void;
}

export default function FilterOptions({
  showAreaFilter,
  setShowAreaFilter,
  minArea,
  setMinArea,
  maxArea,
  setMaxArea,
  selectedAreaOption,
  handleAreaOptionChange,
  showPriceFilter,
  setShowPriceFilter,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedPriceOption,
  handlePriceOptionChange,
}: FilterOptionsProps) {
  const areaOptions = [
    { value: 'all', label: 'Tất cả diện tích' },
    { value: '0-30', label: 'Dưới 30 m²' },
    { value: '30-50', label: '30 - 50 m²' },
    { value: '50-80', label: '50 - 80 m²' },
    { value: '80-100', label: '80 - 100 m²' },
  ];

  const priceOptions = [
    { value: 'all', label: 'Tất cả mức giá' },
    { value: '0-500', label: 'Dưới 500 triệu' },
    { value: '500-800', label: '500 - 800 triệu' },
    { value: '800-1000', label: '800 triệu - 1 tỷ' },
    { value: '1000-2000', label: '1 - 2 tỷ' },
  ];
  // House directions
  const houseDirections = ['Đông', 'Tây', 'Nam', 'Bắc', 'Đông Bắc', 'Đông Nam', 'Tây Bắc', 'Tây Nam'];

  // Sample tag IDs
  const tagIds = ['residential', 'commercial', 'new', 'resale', 'furnished', 'unfurnished', 'premium', 'budget'];
  const [bedrooms, setBedrooms] = useState<string>('');
  const [bathrooms, setBathrooms] = useState<string>('');
  const [floors, setFloors] = useState<string>('');
  const [direction, setDirection] = useState<string>('');
  const [tagId, setTagId] = useState<string>('');
  const [setSelectedAreaOption, setAreaOption] = React.useState<string>('all');
  const [setSelectedPriceOption, setPriceOption] = React.useState<string>('all');
  const handleReset = () => {
    setBedrooms('');
    setBathrooms('');
    setFloors('');
    setDirection('');
    setTagId('');
  };
  return (
    <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full sm:w-[80%]'>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' className='w-full sm:w-[66%] justify-between bg-white text-gray-600 border'>
            <span className='text-sm truncate'>Lọc</span>
            <MdKeyboardArrowDown className='h-4 w-4 flex-shrink-0' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[1000px] sm:w-[1000px] p-0' align='start'>
          <Card className='mb-6'>
            <CardContent className='pt-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <div>
                  <Label htmlFor='bedrooms'>Số phòng ngủ</Label>
                  <Select value={bedrooms} onValueChange={setBedrooms}>
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
                  <Select value={bathrooms} onValueChange={setBathrooms}>
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
                  <Select value={floors} onValueChange={setFloors}>
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

              <div className='mt-6'>
                <Label htmlFor='tagId'>Tag ID</Label>
                <Select value={tagId} onValueChange={setTagId}>
                  <SelectTrigger id='tagId'>
                    <SelectValue placeholder='Chọn Tag ID' />
                  </SelectTrigger>
                  <SelectContent>
                    {tagIds.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <div className=' flex justify-end gap-4'>
                <Button variant='outline' onClick={handleReset} className='w-full md:w-auto bg-[#E03C31] hover:bg-[#FF837A] text-white'>
                  Đặt lại
                </Button>
                </div>
            </CardFooter>
          </Card>
        </PopoverContent>
      </Popover>

      <Popover open={showAreaFilter} onOpenChange={setShowAreaFilter}>
        <PopoverTrigger asChild>
          <Button variant='outline' className='w-full sm:w-[33%] justify-between bg-white text-gray-600 border'>
            <span className='text-sm truncate'>Diện tích</span>
            <MdKeyboardArrowDown className='h-4 w-4 flex-shrink-0' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[90vw] sm:w-[300px] p-0' align='start'>
          <div className='p-4'>
            <div className='flex items-center justify-between mb-4'>
              <h4 className='font-medium text-base'>Diện tích</h4>
              <Button variant='ghost' size='icon' className='h-6 w-6' onClick={() => setShowAreaFilter(false)}>
                <X className='h-4 w-4' />
              </Button>
            </div>

            <div className='mb-6'>
              <div className='flex justify-between mb-2'>
                <span className='text-sm font-medium'>Diện tích nhỏ nhất</span>
                <span className='text-sm font-medium'>Diện tích lớn nhất</span>
              </div>
              <div className='flex items-center gap-2'>
                <Input
                  type='text'
                  placeholder='Từ'
                  value={minArea}
                  onChange={(e) => setMinArea(e.target.value)}
                  className='flex-1'
                />
                <span>→</span>
                <Input
                  type='text'
                  placeholder='Đến'
                  value={maxArea}
                  onChange={(e) => setMaxArea(e.target.value)}
                  className='flex-1'
                />
              </div>
              <div className='mt-4'>
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={5}
                  value={[Number.parseInt(minArea || '0'), Number.parseInt(maxArea || '100')]}
                  onValueChange={(value) => {
                    setMinArea(value[0].toString());
                    setMaxArea(value[1].toString());
                    setAreaOption('');
                  }}
                />
              </div>
            </div>

            <RadioGroup value={selectedAreaOption} onValueChange={handleAreaOptionChange} className='space-y-2'>
              {areaOptions.map((option) => (
                <div key={option.value} className='flex items-center space-x-2'>
                  <RadioGroupItem value={option.value} id={option.value} className='text-[#00B4D8] border-[#00B4D8]' />
                  <label htmlFor={option.value} className='text-sm'>
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>

            <div className='flex gap-2 mt-4 border-t pt-4'>
              <Button
                variant='outline'
                className='flex-1'
                onClick={() => {
                  setMinArea('');
                  setMaxArea('');
                  handleAreaOptionChange('all');
                }}
              >
                Đặt lại
              </Button>
              <Button className='flex-1 bg-[#EF4444] hover:bg-[#FF837A]' onClick={() => setShowAreaFilter(false)}>
                Áp dụng
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover open={showPriceFilter} onOpenChange={setShowPriceFilter}>
        <PopoverTrigger asChild>
          <Button variant='outline' className='w-full sm:w-[33%] justify-between bg-white text-gray-600 border'>
            <span className='text-sm truncate'>Mức giá</span>
            <MdKeyboardArrowDown className='h-4 w-4 flex-shrink-0' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[90vw] sm:w-[300px] p-0' align='start'>
          <div className='p-4'>
            <div className='flex items-center justify-between mb-4'>
              <h4 className='font-medium text-base'>Mức giá</h4>
              <Button variant='ghost' size='icon' className='h-6 w-6' onClick={() => setShowPriceFilter(false)}>
                <X className='h-4 w-4' />
              </Button>
            </div>

            <div className='mb-6'>
              <div className='flex justify-between mb-2'>
                <span className='text-sm font-medium'>Giá thấp nhất</span>
                <span className='text-sm font-medium'>Giá cao nhất</span>
              </div>
              <div className='flex items-center gap-2'>
                <Input
                  type='text'
                  placeholder='Từ'
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className='flex-1'
                />
                <span>→</span>
                <Input
                  type='text'
                  placeholder='Đến'
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className='flex-1'
                />
              </div>
              <div className='mt-4'>
                <Slider
                  defaultValue={[0, 2000]}
                  max={2000}
                  step={100}
                  value={[Number.parseInt(minPrice || '0'), Number.parseInt(maxPrice || '2000')]}
                  onValueChange={(value) => {
                    setMinPrice(value[0].toString());
                    setMaxPrice(value[1].toString());
                    setPriceOption('');
                  }}
                  className='[&_.bg-\[\#EF4444\]]:bg-[#00B4D8]'
                />
              </div>
            </div>

            <RadioGroup value={selectedPriceOption} onValueChange={handlePriceOptionChange} className='space-y-2'>
              {priceOptions.map((option) => (
                <div key={option.value} className='flex items-center space-x-2'>
                  <RadioGroupItem value={option.value} id={option.value} className='text-[#00B4D8] border-[#00B4D8]' />
                  <label htmlFor={option.value} className='text-sm'>
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>

            <div className='flex gap-2 mt-4 border-t pt-4'>
              <Button
                variant='outline'
                className='flex-1'
                onClick={() => {
                  setMinPrice('');
                  setMaxPrice('');
                  handlePriceOptionChange('all');
                }}
              >
                Đặt lại
              </Button>
              <Button className='flex-1 bg-[#EF4444] hover:bg-[#FF837A]' onClick={() => setShowPriceFilter(false)}>
                Áp dụng
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
