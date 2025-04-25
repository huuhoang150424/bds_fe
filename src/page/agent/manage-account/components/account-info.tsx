import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CreditCardIcon, AwardIcon, ShieldIcon, ClockIcon } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface AccountInfoProps {
  user: any;
}

export default function AccountInfo({ user }: AccountInfoProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <Card className='border shadow-sm border border-gray-200 rounded-[8px]'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-base flex items-center gap-2 text-gray-800 dark:text-gray-200'>
          <div className='p-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'>
            <ShieldIcon className='h-4 w-4' />
          </div>
          Thông tin tài khoản
        </CardTitle>
        <CardDescription className='text-xs'>Chi tiết về tài khoản và trạng thái của bạn</CardDescription>
      </CardHeader>
      <CardContent className='pt-4 grid gap-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-1.5 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800'>
            <Label className='text-xs text-gray-500'>ID tài khoản</Label>
            <div className='font-mono text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto'>{user.id}</div>
          </div>

          <div className='space-y-1.5 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800'>
            <Label className='text-xs text-gray-500'>Trạng thái</Label>
            <div className='font-medium text-sm'>
              {user.active ? (
                <span className='inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'>
                  <span className='w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5'></span>
                  Đang hoạt động
                </span>
              ) : (
                <span className='inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'>
                  <span className='w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5'></span>
                  Không hoạt động
                </span>
              )}
            </div>
          </div>

          <div className='space-y-1.5 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800'>
            <Label className='text-xs text-gray-500 flex items-center gap-1.5'>
              <CreditCardIcon className='h-3 w-3 text-gray-400' />
              Số dư tài khoản
            </Label>
            <div className='font-medium text-sm text-green-600 dark:text-green-400'>{formatCurrency(user.balance)}</div>
          </div>

          <div className='space-y-1.5 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800'>
            <Label className='text-xs text-gray-500 flex items-center gap-1.5'>
              <AwardIcon className='h-3 w-3 text-gray-400' />
              Điểm tích lũy
            </Label>
            <div className='font-medium text-sm flex items-center'>
              <span className='text-amber-500 font-bold mr-1.5'>{user.score}</span>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-3 w-3 ${i < Math.floor(user.score / 20) ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          <div className='space-y-1.5 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800'>
            <Label className='text-xs text-gray-500'>Vai trò</Label>
            <div className='font-medium text-sm'>
              <span className='inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'>
                {user.roles}
              </span>
            </div>
          </div>

          <div className='space-y-1.5 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800'>
            <Label className='text-xs text-gray-500 flex items-center gap-1.5'>
              <ClockIcon className='h-3 w-3 text-gray-400' />
              Hoạt động gần đây
            </Label>
            <div className='font-medium text-sm'>{format(user.lastActive, 'HH:mm - dd/MM/yyyy', { locale: vi })}</div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-3 mt-2'>
          <Card className='bg-gray-50 dark:bg-gray-900/50 border-dashed'>
            <CardContent className='p-3 flex flex-col items-center justify-center'>
              <div className='text-xs text-gray-500 mb-1'>Email</div>
              <div className='font-medium text-sm flex items-center'>
                {user.emailVerified ? (
                  <span className='text-green-600 dark:text-green-400 flex items-center'>
                    <svg
                      className='h-3.5 w-3.5 mr-1'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    Đã xác thực
                  </span>
                ) : (
                  <span className='text-red-600 dark:text-red-400 flex items-center'>
                    <svg
                      className='h-3.5 w-3.5 mr-1'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12 9V13M12 17H12.01M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </svg>
                    Chưa xác thực
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-50 dark:bg-gray-900/50 border-dashed'>
            <CardContent className='p-3 flex flex-col items-center justify-center'>
              <div className='text-xs text-gray-500 mb-1'>Trạng thái khóa</div>
              <div className='font-medium text-sm flex items-center'>
                {user.isLock ? (
                  <span className='text-red-600 dark:text-red-400 flex items-center'>
                    <svg
                      className='h-3.5 w-3.5 mr-1'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M16.5 10.5V6.5C16.5 4.01472 14.4853 2 12 2C9.51472 2 7.5 4.01472 7.5 6.5V10.5M12 15V17M7 10.5H17C18.1046 10.5 19 11.3954 19 12.5V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V12.5C5 11.3954 5.89543 10.5 7 10.5Z'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </svg>
                    Đã khóa
                  </span>
                ) : (
                  <span className='text-green-600 dark:text-green-400 flex items-center'>
                    <svg
                      className='h-3.5 w-3.5 mr-1'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21Z'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </svg>
                    Không khóa
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
