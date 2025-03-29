
import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CustomImage } from '@/components/common';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

export default function UltilitySuport() {
  const [isActiveTab, setIsActiveTab] = useState('');
  const [isChoose, setIsChoose] = useState(false);
  const [birthYear, setBirthYear] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const newsItems = [
    {
      id: 1,
      title: 'Các Kênh Dẫn Vốn Đang Tác Động Như Thế Nào Đến Thị Trường Bất Động Sản Việt Nam?',
      image: '/placeholder.svg?height=60&width=60',
    },
    {
      id: 2,
      title: 'Cách Tính Lãi Suất Vay Ngân Hàng Kèm Ví Dụ Cụ Thể',
      image: '/placeholder.svg?height=60&width=60',
    },
    {
      id: 3,
      title: 'Tuổi Quý Dậu Hợp Hướng Nào? Tư Vấn Phong Thủy Cho Người Sinh Năm 1993',
      image: '/placeholder.svg?height=60&width=60',
    },
    {
      id: 4,
      title: 'Tranh Chấp Đất Đai Đã Có Sổ Đỏ: Quy Trình Giải Quyết Và Mức Án Phí Theo Quy Định',
      image: '/placeholder.svg?height=60&width=60',
    },
    {
      id: 5,
      title: 'Thị Trường Nhà Cho Thuê Gần Khu Công Nghiệp Bàu Bàng Bình Dương: Những Điều Cần Biết',
      image: '/placeholder.svg?height=60&width=60',
    },
    {
      id: 6,
      title: 'Thông Tin Văn Phòng Công Chứng Hòa Lợi Bình Dương Mới Nhất',
      image: '/placeholder.svg?height=60&width=60',
    },
  ];

  const sidebarItems = [
    { id: 1, title: 'Xem hướng nhà', active: false },
    { id: 2, title: 'Xem tuổi xây nhà', active: false },
    { id: 3, title: 'Phong thủy văn phòng', active: false },
    { id: 4, title: 'Chọn màu sơn', active: true },   
  ];

  const colorRecommendations = [
    {
      element: 'Kim (Metal)',
      colors: ['Trắng', 'Bạc', 'Vàng nhạt'],
      description: 'Phù hợp với người mệnh Kim, tăng cường năng lượng và sự tập trung.',
    },
    {
      element: 'Mộc (Wood)',
      colors: ['Xanh lá', 'Xanh lục', 'Xanh ngọc'],
      description: 'Phù hợp với người mệnh Mộc, mang lại sự tươi mới và phát triển.',
    },
    {
      element: 'Thủy (Water)',
      colors: ['Xanh dương', 'Đen', 'Xanh đậm'],
      description: 'Phù hợp với người mệnh Thủy, tăng cường trí tuệ và sự sáng tạo.',
    },
    {
      element: 'Hỏa (Fire)',
      colors: ['Đỏ', 'Hồng', 'Tím'],
      description: 'Phù hợp với người mệnh Hỏa, mang lại nhiệt huyết và may mắn.',
    },
    {
      element: 'Thổ (Earth)',
      colors: ['Vàng', 'Nâu', 'Cam'],
      description: 'Phù hợp với người mệnh Thổ, tạo sự ổn định và vững chắc.',
    },
  ];

  return (
    <div className='max-w-6xl mx-auto py-[100px]'>
      {/* Search Bar */}
      <div className='flex items-center justify-center mb-6 gap-2'>
        <Input placeholder='Nhập từ khóa để tìm theo cụm từ' className='max-w-[300px] p-[8px]' />
        <Select defaultValue='news'>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Tin tức' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='news'>Tin tức</SelectItem>
            <SelectItem value='projects'>Dự án</SelectItem>
            <SelectItem value='services'>Dịch vụ</SelectItem>
          </SelectContent>
        </Select>
        <Button className='bg-red-600 hover:bg-red-700'>Tìm kiếm</Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        {/* Left Sidebar */}
        <div className='md:col-span-1 rounded-[8px]'>
          <div className='bg-gray-700 text-white p-3 font-medium text-center rounded-t-[5px]'>HỖ TRỢ TIỆN ÍCH</div>
          <div className='border border-gray-200'>
            {sidebarItems.map((item) => (
              <div
                onClick={() => setIsActiveTab(item.title)}
                className={cn(
                  isActiveTab === item.title ? ' bg-gray-400 text-[#fff]' : 'bg-[#fff]',
                  'p-[8px] border-b  cursor-pointer',
                )}
              >
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className='md:col-span-2'>
          {isActiveTab === '' ||
            (isActiveTab === 'Xem hướng nhà' && (
              <div className='text-center'>
                <span className='font-[500] text-xl '>Phong thủy xem hướng nhà</span>
                <div className='mt-[30px] border rounded-[10px] p-[30px]'>
                  <div className='mb-[30px] '>
                    <span>chọn hướng nhà phù hợp để đón vượng khí</span>
                  </div>
                  <div className='flex gap-[30px] justify-between items-center'>
                    <Label htmlFor='birthday'>Năm sinh gia chủ</Label>
                    <Input
                      id='birthday'
                      type='number'
                      placeholder='1990'
                      className='max-w-[300px] p-[5px]'
                      min='1900'
                      max='2025'
                    />
                  </div>
                  <div className='flex justify-start mt-[15px] gap-[150px] '>
                    <div>
                      <Label htmlFor='sex'>Giới tính</Label>
                    </div>
                    <RadioGroup defaultValue='comfortable' className='flex gap-4'>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='male' id='r1' />
                        <Label htmlFor='r1'>Nam</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='female' id='r2' />
                        <Label htmlFor='r2'>Nữ</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className='flex items-center justify-between mt-[15px]'>
                    <Label htmlFor='direction'>Hướng nhà</Label>
                    <Select>
                      <SelectTrigger className='max-w-[300px]'>
                        {' '}
                        <SelectValue placeholder='Chọn hướng nhà' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='1'>Đông</SelectItem>
                        <SelectItem value='2'>Tây</SelectItem>
                        <SelectItem value='3'>Nam</SelectItem>
                        <SelectItem value='4'>Bắc</SelectItem>
                        <SelectItem value='5'>Đông Bắc</SelectItem>
                        <SelectItem value='6'>Đông Nam</SelectItem>
                        <SelectItem value='7'>Tây Bắc</SelectItem>
                        <SelectItem value='8'>Tây Nam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className='mt-[30px] bg-[#E03C31] hover:bg-[#FF837A] text-[#fff]'>Xem kết quả</Button>
                </div>
              </div>
            ))}
          {isActiveTab === 'Xem tuổi xây nhà' && (
            <div>
              <div className='text-center'>
                <span className='font-[500] text-xl '>Phong thủy xem tuổi xây dựng, cải tạo nhà</span>
                <div className='mt-[30px] h-[500px] border rounded-[10px] p-[30px]'>
                  <div className='mb-[30px] '>
                    <span>Xem năm xây dựng, sửa chữa nhà ở</span>
                  </div>
                  <div className='flex gap-[30px] justify-between items-center'>
                    <Label htmlFor='birthday'>Năm sinh gia chủ</Label>
                    <Input
                      id='birthday'
                      type='number'
                      placeholder='1990'
                      className='max-w-[300px] p-[5px]'
                      min='1900'
                      max='2025'
                    />
                  </div>
                  <div className='flex items-center justify-between mt-[15px]'>
                    <Label htmlFor='direction'>Năm dự kiến khởi công </Label>
                    <Select>
                      <SelectTrigger className='max-w-[300px]'>
                        {' '}
                        <SelectValue placeholder='Chọn năm khởi công' />
                      </SelectTrigger>
                      <SelectContent side='bottom'>
                        {Array.from({ length: 21 }, (_, index) => {
                          const year = 2025 + index;
                          return (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className='mt-[30px] bg-[#E03C31] hover:bg-[#FF837A] text-[#fff]'>Xem kết quả</Button>
                </div>
              </div>
            </div>
          )}
          {isActiveTab === 'Phong thủy văn phòng' && (
            <div>
              <div className='text-center'>
                <span className='font-[500] text-xl '>Phong thủy văn phòng</span>
                <div className='mt-[30px] border rounded-[10px] p-[30px]'>
                  <div className='mb-[30px] '>
                    <span>Xem phong thủy văn phòng</span>
                  </div>
                  <div className='flex gap-[30px] justify-between items-center'>
                    <Label htmlFor='birthday'>Năm sinh gia chủ</Label>
                    <Input
                      id='birthday'
                      type='number'
                      placeholder='1990'
                      className='max-w-[300px] p-[5px]'
                      min='1900'
                      max='2025'
                    />
                  </div>
                  <div className='flex justify-start mt-[15px] gap-[150px] '>
                    <div>
                      <Label htmlFor='sex'>Giới tính</Label>
                    </div>
                    <RadioGroup defaultValue='comfortable' className='flex gap-4'>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='male' id='r1' />
                        <Label htmlFor='r1'>Nam</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='female' id='r2' />
                        <Label htmlFor='r2'>Nữ</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button className='mt-[30px] bg-[#E03C31] hover:bg-[#FF837A] text-[#fff]'>Xem kết quả</Button>
                </div>
              </div>
            </div>
          )}
          {isActiveTab === 'Chọn màu sơn' && (
            <div>
              <div className='text-center'>
                <span className='font-[500] text-xl '>Chọn màu sơn</span>
                <div className='mt-[30px] border rounded-[10px] p-[30px]'>
                  <div className='mb-[30px] '>
                    <span>Chọn màu sơn phù hợp với phòng thủy văn phòng</span>
                  </div>
                  <div className='flex gap-[30px] justify-between items-center'>
                    <Label htmlFor='birthday'>Năm sinh gia chủ</Label>
                    <Input
                      id='birthday'
                      type='number'
                      placeholder='1990'
                      className='max-w-[300px] p-[5px]'
                      min='1900'
                      max='2025'
                    />
                  </div>

                  <Button className='mt-[30px] bg-[#E03C31] hover:bg-[#FF837A] text-[#fff]'>Xem kết quả</Button>
                </div>
              </div>
            </div>
          )}
          

          {showResults && <div></div>}
        </div>

        {/* Right Sidebar */}
        {/* <div className='md:col-span-1'>
          <div className='bg-gray-700 text-white p-3 font-medium text-center mb-4'>TIN TỨC MỚI NHẤT</div>
          <div className='space-y-4'>
            {newsItems.map((item) => (
              <div key={item.id} className='flex gap-2 pb-3 border-b border-gray-200'>
                <CustomImage
                  src={item.image || '/placeholder.svg'}
                  alt={item.title}
                  width={60}
                  height={60}
                  className='object-cover rounded-md'
                />
                <a href='#' className='text-sm hover:text-red-600'>
                  {item.title}
                </a>
              </div>
            ))}
          </div>

          <div className='mt-6 border border-gray-200 p-2 rounded-md'>
            <CustomImage
              src='/placeholder.svg?height=200&width=300'
              alt='Advertisement'
              width={300}
              height={200}
              className='w-full object-cover'
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}
