import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PenLine, MapPin, User, CreditCard, Award } from 'lucide-react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '@/redux/authReducer';

export default function UserProfile() {
  const user = useSelector(selectUser);
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  console.log(user)
  // User data from the provided JSON
  const userData = {
    id: 'b10ba6ed-adf3-4519-aace-8208c72c4afa',
    createdAt: '2025-04-09T18:39:50.000Z',
    updatedAt: '2025-04-09T18:39:50.000Z',
    fullname: 'User 97',
    email: 'user97@gmail.com',
    emailVerified: false,
    isLock: false,
    phone: null,
    active: false,
    lastActive: null,
    address: 'TP. Hồ Chí Minh',
    gender: 'Other',
    dateOfBirth: '1973-08-13T17:00:00.000Z',
    avatar:
      'https://img.freepik.com/premium-vector/user-icons-includes-user-icons-people-icons-symbols-premiumquality-graphic-design-elements_981536-526.jpg',
    balance: 0,
    roles: 'User',
    score: 0,
  };

  // Format date of birth
  // const formattedDOB = user?.dateOfBirth ? format(new Date(user.dateOfBirth), 'dd/MM/yyyy') : 'Not provided';
  // const formattedCreatedAt = format(new Date(user?.createdAt), 'dd/MM/yyyy');

  return (
    <div className='max-w-8xl  p-6 space-y-6  min-h-screen'>
      <h1 className='text-2xl font-[500] '>Hồ sơ người dùng</h1>

      {/* Profile Header */}
      <Card className='border rounded-[10px] border-gray-200'>
        <CardContent className='p-6'>
          <div className='flex flex-col md:flex-row items-start md:items-center gap-6'>
            <Avatar className='w-24 h-24 border-2 border-slate-100'>
              <AvatarImage src={user?.avatar} alt={user?.fullname} />
              <AvatarFallback className='bg-rose-600 text-white text-lg'>
                {user?.fullname.substring(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className='flex-1'>
              <div className='flex items-center gap-3'>
                <h2 className='text-2xl font-bold text-slate-800'>{user?.fullname}</h2>
                {/* <Badge
                  variant={user.active ? 'default' : 'secondary'}
                  className={user.active ? 'bg-success-100 text-success-800' : 'rounded-full'}
                >
                  {' '}
                  {user.active ? 'Active' : 'Inactive'}
                </Badge> */}
              </div>

              <div className='flex items-center gap-2 mt-1 text-slate-500'>
                <MapPin className='h-4 w-4' />
                {/* <span>{user?.address}</span> */}
              </div>

              <div className='flex flex-wrap gap-3 mt-3'>
                <Badge variant='outline' className='bg-slate-100'>
                  Vai trò: {user?.roles}
                </Badge>
                <Badge variant='outline' className='bg-slate-100'>
                  Điểm: {user?.score}
                </Badge>
                {!user?.emailVerified && (
                  <Badge variant='outline' className='bg-amber-50 text-amber-700 border-amber-200'>
                    Email not verified
                  </Badge>
                )}
              </div>
            </div>

            {/* <Button variant='outline' className='rounded-full'>
              <PenLine className='h-4 w-4 mr-2' />
              Edit Profile
            </Button> */}
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card className='border rounded-[10px] border-gray-200'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold flex items-center'>
              <User className='h-5 w-5 mr-2 text-slate-500' />
              Thông tin cá nhân
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <p className='text-sm text-slate-500'>Họ và tên</p>
              <p className='font-medium'>{user?.fullname}</p>
            </div>
            <div>
              <p className='text-sm text-slate-500'>Email</p>
              <div className='flex items-center gap-2'>
                <p className='font-medium'>{user?.email}</p>
                {!user?.emailVerified && (
                  <Badge variant='outline' className='text-xs bg-amber-50 text-amber-700 border-amber-200'>
                    Not verified
                  </Badge>
                )}
              </div>
            </div>
            <div>
              <p className='text-sm text-slate-500'>Số điện thoại</p>
              <p className='font-medium'>{user?.phone || 'Not provided'}</p>
            </div>
            <div>
              {/* <p className='text-sm text-slate-500'>Giới tính</p> */}
              {/* <p className='font-medium'>{user?.gender}</p> */}
            </div>
            <div>
              {/* <p className='text-sm text-slate-500'>Ngày sinh</p> */}
              {/* <p className='font-medium'>{formattedDOB}</p> */}
            </div>
          </CardContent>
        </Card>

        <Card className='border rounded-[10px] border-gray-200'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold flex items-center'>
              <CreditCard className='h-5 w-5 mr-2 text-slate-500' />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <p className='text-sm text-slate-500'>ID tài khoản</p>
              <p className='font-medium text-xs md:text-sm font-mono'>{user?.id}</p>
            </div>
            <div>
              {/* <p className='text-sm text-slate-500'>Tạo ngày </p> */}
              {/* <p className='font-medium'>{formattedCreatedAt}</p> */}
            </div>
            <div>
              {/* <p className='text-sm text-slate-500'>Trạng thái tài khoản</p> */}
              <div className='flex gap-2 flex-wrap'>
                {/* <Badge
                  variant={user.active ? 'default' : 'secondary'}
                  className={user.active ? 'bg-success-100 text-success-800' : 'rounded-full'}
                >
                  {user.active ? 'Active' : 'Inactive'}
                </Badge>
                {user.isLock && (
                  <Badge variant='destructive' className='rounded-full'>
                    Locked
                  </Badge>
                )} */}
              </div>
            </div>
            <div>
              <p className='text-sm text-slate-500'>Tài chính</p>
              <p className='font-medium'>{user?.balance.toLocaleString()} VND</p>
            </div>
            <div>
              <p className='text-sm text-slate-500'>Điểm</p>
              <div className='flex items-center gap-2'>
                <p className='font-medium'>{user?.score}</p>
                <Award className='h-4 w-4 text-amber-500' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      {/* <div className='flex justify-end gap-3'>
        <Button variant='outline'>Change Password</Button>
        <Button>Update Profile</Button>
      </div> */}
    </div>
  );
}
