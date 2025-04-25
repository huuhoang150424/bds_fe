import type React from 'react';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MapPin, User, CreditCard, Award, CalendarIcon, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';

export default function UserProfileEditable() {
  useScrollToTopOnMount();
  const [userData, setUserData] = useState({
    id: 'b10ba6ed-adf3-4519-aace-8208c72c4afa',
    createdAt: '2025-04-09T18:39:50.000Z',
    updatedAt: '2025-04-09T18:39:50.000Z',
    fullname: 'User 97',
    email: 'user97@gmail.com',
    emailVerified: false,
    isLock: false,
    phone: '',
    active: false,
    lastActive: null,
    address: 'TP. Hồ Chí Minh',
    gender: 'Other',
    dateOfBirth: new Date('1973-08-13T17:00:00.000Z'),
    avatar:
      'https://img.freepik.com/premium-vector/user-icons-includes-user-icons-people-icons-symbols-premiumquality-graphic-design-elements_981536-526.jpg',
    balance: 0,
    roles: 'User',
    score: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thông tin đã được cập nhật thành công!');
    }, 1500);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUserData({ ...userData, avatar: url });
    }
  };
  const formattedCreatedAt = format(new Date(userData.createdAt), 'dd/MM/yyyy');

  return (
    <div className='max-w-8xl  p-6 space-y-6 min-h-screen'>
      <h1 className='text-2xl font-[500]'>Chỉnh sửa hồ sơ người dùng</h1>

      <form onSubmit={handleSubmit}>
        {/* Profile Header */}
        <Card className='mb-6 border border-gray-200 rounded-[10px]'>
          <CardContent className='p-6'>
            <div className='flex flex-col md:flex-row items-start md:items-center gap-6'>
              <div className='flex flex-col items-center gap-2'>
                <Avatar className='w-24 h-24 border-2 border-slate-100'>
                  <AvatarImage src={userData.avatar} alt={userData.fullname} />
                  <AvatarFallback className='bg-rose-600 text-white text-lg'>
                    {userData.fullname.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <Label htmlFor='avatar-upload' className='cursor-pointer'>
                  <div className='flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 transition-colors'>
                    <Upload className='h-3 w-3' />
                    <span>Thay đổi ảnh</span>
                  </div>
                  <input
                    id='avatar-upload'
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleAvatarChange}
                  />
                </Label>
              </div>

              <div className='flex-1'>
                <div className='flex items-center gap-3 mb-2'>
                  <Input
                    value={userData.fullname}
                    onChange={(e) => setUserData({ ...userData, fullname: e.target.value })}
                    className='text-xl font-bold h-10 p-[8px]'
                    placeholder='Họ và tên'
                  />
                  <Badge
                    variant={userData.active ? 'default' : 'secondary'}
                    className={cn(
                      'rounded-full',
                      userData.active && 'bg-success-100 text-success-700 border-success-200',
                    )}
                  >
                    {userData.active ? 'Hoạt động' : 'Không hoạt động'}
                  </Badge>
                </div>

                <div className='flex items-center gap-2 mt-1 text-slate-500'>
                  
                  <Input
                    
                    value={userData.address}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                    className='h-8 text-sm p-[8px]'
                    placeholder='Địa chỉ'
                  />
                </div>

                <div className='flex flex-wrap gap-3 mt-3'>
                  <Badge variant='outline' className='bg-slate-100'>
                    Vai trò: {userData.roles}
                  </Badge>
                  <Badge variant='outline' className='bg-slate-100'>
                    Điểm: {userData.score}
                  </Badge>
                  {!userData.emailVerified && (
                    <Badge variant='outline' className='bg-amber-50 text-amber-700 border-amber-200'>
                      Email chưa xác thực
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card className='border border-gray-200 rounded-[10px]'>
            <CardHeader>
              <CardTitle className='text-lg font-semibold flex items-center'>
                <User className='h-5 w-5 mr-2 text-slate-500' />
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <Label htmlFor='fullname' className='text-sm text-slate-500'>
                  Họ và tên
                </Label>
                <Input
                  id='fullname'
                  value={userData.fullname}
                  onChange={(e) => setUserData({ ...userData, fullname: e.target.value })}
                  placeholder='Nhập họ và tên'
                  className='p-[8px]'
                />
              </div>
              <div>
                <Label htmlFor='email' className='text-sm text-slate-500'>
                  Email
                </Label>
                <div className='flex items-center gap-2'>
                  <Input
                    id='email'
                    type='email'
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    placeholder='Nhập email'
                    disabled={userData.emailVerified}
                    className='p-[8px]'
                  />
                  {!userData.emailVerified && (
                    <Badge variant='outline' className='text-xs bg-amber-50 text-amber-700 border-amber-200'>
                      Chưa xác thực
                    </Badge>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor='phone' className='text-sm text-slate-500'>
                  Số điện thoại
                </Label>
                <Input
                  id='phone'
                  type='tel'
                  value={userData.phone || ''}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  placeholder='Nhập số điện thoại'
                  className='p-[8px]'
                />
              </div>
              <div>
                <Label htmlFor='gender' className='text-sm text-slate-500'>
                  Giới tính
                </Label>
                <Select value={userData.gender} onValueChange={(value) => setUserData({ ...userData, gender: value })}>
                  <SelectTrigger id='gender'>
                    <SelectValue placeholder='Chọn giới tính' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Male'>Nam</SelectItem>
                    <SelectItem value='Female'>Nữ</SelectItem>
                    <SelectItem value='Other'>Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='dob' className='text-sm text-slate-500'>
                  Ngày sinh
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id='dob'
                      variant='outline'
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !userData.dateOfBirth && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {userData.dateOfBirth ? format(userData.dateOfBirth, 'dd/MM/yyyy') : <span>Chọn ngày sinh</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={userData.dateOfBirth}
                      onSelect={(date) => date && setUserData({ ...userData, dateOfBirth: date })}
                      initialFocus
                      captionLayout='dropdown-buttons'
                      fromYear={1940}
                      toYear={2020}
                      
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          <Card className='border border-gray-200 rounded-[10px]'>
            <CardHeader>
              <CardTitle className='text-lg font-semibold flex items-center'>
                <CreditCard className='h-5 w-5 mr-2 text-slate-500' />
                Thông tin tài khoản
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <Label className='text-sm text-slate-500'>ID tài khoản</Label>
                <p className='font-medium text-xs md:text-sm font-mono'>{userData.id}</p>
              </div>
              <div>
                <Label className='text-sm text-slate-500'>Ngày tạo tài khoản</Label>
                <p className='font-medium'>{formattedCreatedAt}</p>
              </div>
              <div>
                <Label className='text-sm text-slate-500'>Trạng thái tài khoản</Label>
                <div className='flex gap-2 flex-wrap'>
                  <Badge
                    variant={userData.active ? 'default' : 'secondary'}
                    className={cn(
                      'rounded-full',
                      userData.active && 'bg-success-100 text-success-700 border-success-200',
                    )}
                  >
                    {' '}
                    {userData.active ? 'Hoạt động' : 'Không hoạt động'}
                  </Badge>
                  {userData.isLock && (
                    <Badge variant='destructive' className='rounded-full'>
                      Đã khóa
                    </Badge>
                  )}
                </div>
              </div>
              <div>
                <Label className='text-sm text-slate-500'>Số dư</Label>
                <p className='font-medium'>{userData.balance.toLocaleString()} VND</p>
              </div>
              <div>
                <Label className='text-sm text-slate-500'>Điểm</Label>
                <div className='flex items-center gap-2'>
                  <p className='font-medium'>{userData.score}</p>
                  <Award className='h-4 w-4 text-amber-500' />
                </div>
              </div>
              <div>
                <Label htmlFor='address' className='text-sm text-slate-500'>
                  Địa chỉ
                </Label>
                <Textarea
                  id='address'
                  value={userData.address}
                  onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  placeholder='Nhập địa chỉ'
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className='flex justify-end gap-3 mt-6'>
          <Button variant='outline' type='button'>
            Hủy
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Button>
        </div>
      </form>
    </div>
  );
}
