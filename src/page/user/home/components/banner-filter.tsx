import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { IoIosSearch } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { X } from 'lucide-react';
import { RandomizedTextEffect } from '@/components/user/text-randomized';
import { allCities, areaOptions, featuredCities, priceOptions, propertyTypesByTab } from '@/constant/const-home';

interface BannerSearchProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BannerFilter({ activeTab, setActiveTab }: BannerSearchProps) {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPropertyTypes, setShowPropertyTypes] = useState(false);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [selectedPriceOption, setSelectedPriceOption] = useState<string>('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showAreaFilter, setShowAreaFilter] = useState(false);
  const [selectedAreaOption, setSelectedAreaOption] = useState<string>('all');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');

  const propertyTypes = propertyTypesByTab[activeTab as keyof typeof propertyTypesByTab];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCity) params.append('keyword', selectedCity);
    if (searchQuery) params.append('keyword', searchQuery);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (minArea) params.append('minSquareMeters', minArea);
    if (maxArea) params.append('maxSquareMeters', maxArea);
    if (selectedPropertyTypes.length > 0) params.append('propertyTypeIds', selectedPropertyTypes.join(','));

    navigate(`/filter?${params.toString()}`);
  };

  const handlePropertyTypeChange = (propertyId: string) => {
    setSelectedPropertyTypes((prev) => {
      if (prev.includes(propertyId)) {
        return prev.filter((id) => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
  };

  const handlePriceOptionChange = (value: string) => {
    setSelectedPriceOption(value);
    switch (value) {
      case '0-500':
        setMinPrice('');
        setMaxPrice('500');
        break;
      case '500-800':
        setMinPrice('500');
        setMaxPrice('800');
        break;
      case '800-1000':
        setMinPrice('800');
        setMaxPrice('1000');
        break;
      case '1000-2000':
        setMinPrice('1000');
        setMaxPrice('2000');
        break;
      default:
        setMinPrice('');
        setMaxPrice('');
    }
  };

  const handleAreaOptionChange = (value: string) => {
    setSelectedAreaOption(value);
    switch (value) {
      case '0-30':
        setMinArea('');
        setMaxArea('30');
        break;
      case '30-50':
        setMinArea('30');
        setMaxArea('50');
        break;
      case '50-80':
        setMinArea('50');
        setMaxArea('80');
        break;
      case '80-100':
        setMinArea('80');
        setMaxArea('100');
        break;
      default:
        setMinArea('');
        setMaxArea('');
    }
  };

  return (
    <div className='top-[300px] absolute md:left-[20%] lg:left-[20%] left-[15%] text-center w-[90%] md:w-[70%] lg:w-[55%] bg-white shadow-xl z-[50] transition-opacity duration-30 py-[30px] px-[15px] rounded-[8px]'>
      <div className='flex flex-col md:flex-row gap-2'>
        <div className='relative w-full md:w-auto'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className='w-full md:w-[200px] justify-between bg-white text-gray-600 border border-gray-200 h-full'
              >
                <div className='flex items-center gap-2'>
                  <IoLocationOutline className='w-4 h-4' />
                  <span className='truncate'>{selectedCity || 'Hồ Chí Minh'}</span>
                </div>
                <MdKeyboardArrowDown className='h-4 w-4 flex-shrink-0' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[90vw] md:w-[746px] p-0' align='start'>
              <div className='p-4'>
                <h4 className='font-medium mb-1 text-sm text-gray-500'>Tất cả tỉnh thành</h4>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6'>
                  {allCities.map((city) => (
                    <div
                      key={city}
                      className='py-[3px] px-3 hover:bg-gray-100 cursor-pointer rounded text-[13px] text-black'
                      onClick={() => {
                        setSelectedCity(city);
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex relative w-full bg-white rounded-[5px]'>
          {!searchQuery && !isFocused && (
            <div className='absolute top-0 left-0 h-full flex items-center px-4 text-gray-400 pointer-events-none'>
              <RandomizedTextEffect text='Tìm kiếm theo địa điểm, tên bất động sản' />
            </div>
          )}
          <Input
            className='w-full p-4 border border-gray-200 outline-none'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder=''
          />
          <Button className='absolute right-[10px] top-[8px] bg-[#EF4444] hover:bg-[#FF837A]' onClick={handleSearch}>
            <span className='hidden md:inline'>Tìm kiếm</span>
            <IoIosSearch className='w-4 h-4 md:hidden' />
          </Button>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row gap-2 mt-2'>
        <Popover open={showPropertyTypes} onOpenChange={setShowPropertyTypes}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className='w-full sm:w-[33%] justify-between bg-white text-gray-600 border border-gray-200'
            >
              <span className='text-sm truncate'>Loại hình dự án</span>
              <MdKeyboardArrowDown className='h-4 w-4 flex-shrink-0' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[90vw] sm:w-[300px] p-0' align='start'>
            <div className='p-4'>
              <div className='flex items-center justify-between mb-4'>
                <h4 className='font-medium text-base'>Loại nhà đất</h4>
                <Button variant='ghost' size='icon' className='h-6 w-6' onClick={() => setShowPropertyTypes(false)}>
                  <X className='h-4 w-4' />
                </Button>
              </div>
              <div className='space-y-3'>
                {propertyTypes.map((type) => (
                  <div key={type.id} className='flex items-center space-x-2'>
                    <Checkbox
                      id={type.id}
                      checked={selectedPropertyTypes.includes(type.id)}
                      onCheckedChange={() => handlePropertyTypeChange(type.id)}
                    />
                    <label
                      htmlFor={type.id}
                      className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      {type.icon && <span className='mr-2'>{type.icon}</span>}
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
              <div className='flex gap-2 mt-4 border-t pt-4'>
                <Button
                  variant='outline'
                  className='flex-1'
                  onClick={() => {
                    setSelectedPropertyTypes([]);
                    setShowPropertyTypes(false);
                  }}
                >
                  Đặt lại
                </Button>
                <Button className='flex-1 bg-[#EF4444] hover:bg-[#FF837A]' onClick={() => setShowPropertyTypes(false)}>
                  Áp dụng
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Popover open={showPriceFilter} onOpenChange={setShowPriceFilter}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className='w-full sm:w-[33%] justify-between bg-white text-gray-600 border border-gray-200'
            >
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
                    className='flex-1 px-[8px] py-[6px] border border-gray-200 outline-none'
                  />
                  <span>→</span>
                  <Input
                    type='text'
                    placeholder='Đến'
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className='flex-1 px-[8px] py-[6px] border border-gray-200 outline-none'
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
                      setSelectedPriceOption('');
                    }}
                    className='[&_.bg-[#EF4444]]:bg-[#00B4D8]'
                  />
                </div>
              </div>
              <RadioGroup value={selectedPriceOption} onValueChange={handlePriceOptionChange} className='space-y-2'>
                {priceOptions.map((option) => (
                  <div key={option.value} className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className='text-[#00B4D8] border-[#00B4D8]'
                    />
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
                    setSelectedPriceOption('all');
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
        <Popover open={showAreaFilter} onOpenChange={setShowAreaFilter}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className='w-full sm:w-[33%] justify-between bg-white text-gray-600 border border-gray-200'
            >
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
                    className='flex-1 px-[8px] py-[6px] border border-gray-200 outline-none'
                  />
                  <span>→</span>
                  <Input
                    type='text'
                    placeholder='Đến'
                    value={maxArea}
                    onChange={(e) => setMaxArea(e.target.value)}
                    className='flex-1 px-[8px] py-[6px] border border-gray-200 outline-none'
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
                      setSelectedAreaOption('');
                    }}
                  />
                </div>
              </div>
              <RadioGroup value={selectedAreaOption} onValueChange={handleAreaOptionChange} className='space-y-2'>
                {areaOptions.map((option) => (
                  <div key={option.value} className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className='text-[#00B4D8] border-[#00B4D8]'
                    />
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
                    setSelectedAreaOption('all');
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
      </div>
    </div>
  );
}