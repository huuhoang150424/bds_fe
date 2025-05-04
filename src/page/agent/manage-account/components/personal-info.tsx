import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { UserIcon, PhoneIcon, MailIcon, MapPinIcon, CalendarIcon } from 'lucide-react';

interface PersonalInfoProps {
  user: any;
}

export default function PersonalInfo({ user }: PersonalInfoProps) {
  return (
    <Card className="border border-gray-200 rounded-[8px] shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <div className="p-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            <UserIcon className="h-4 w-4" />
          </div>
          Thông tin cá nhân
        </CardTitle>
        <CardDescription className="text-xs">Thông tin chi tiết về hồ sơ cá nhân của bạn</CardDescription>
      </CardHeader>
      <CardContent className="pt-4 grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
            <Label className="text-xs text-gray-500 flex items-center gap-1.5">
              <UserIcon className="h-3 w-3 text-gray-400" />
              Họ và tên
            </Label>
            <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{user?.fullname || 'Chưa cập nhật'}</div>
          </div>

          <div className="space-y-1.5 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
            <Label className="text-xs text-gray-500 flex items-center gap-1.5">
              <svg className="h-3 w-3 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.5 9.5C19.1667 8.83333 18.5 7.5 17.5 6.5C16.5 5.5 15.1667 4.83333 14.5 4.5M4.5 9.5C4.83333 8.83333 5.5 7.5 6.5 6.5C7.5 5.5 8.83333 4.83333 9.5 4.5M14.5 19.5C15.1667 19.1667 16.5 18.5 17.5 17.5C18.5 16.5 19.1667 15.1667 19.5 14.5M9.5 19.5C8.83333 19.1667 7.5 18.5 6.5 17.5C5.5 16.5 4.83333 15.1667 4.5 14.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Giới tính
            </Label>
            <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{user?.gender || 'Chưa cập nhật'}</div>
          </div>

          <div className="space-y-1.5 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
            <Label className="text-xs text-gray-500 flex items-center gap-1.5">
              <MailIcon className="h-3 w-3 text-gray-400" />
              Email
            </Label>
            <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{user?.email || 'Chưa cập nhật'}</div>
          </div>

          <div className="space-y-1.5 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
            <Label className="text-xs text-gray-500 flex items-center gap-1.5">
              <PhoneIcon className="h-3 w-3 text-gray-400" />
              Số điện thoại
            </Label>
            <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{user?.phone || 'Chưa cập nhật'}</div>
          </div>

          <div className="space-y-1.5 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
            <Label className="text-xs text-gray-500 flex items-center gap-1.5">
              <CalendarIcon className="h-3 w-3 text-gray-400" />
              Ngày sinh
            </Label>
            <div className="font-medium text-sm text-gray-900 dark:text-gray-100">
              {user?.dateOfBirth
                ? format(new Date(user.dateOfBirth), 'dd/MM/yyyy', { locale: vi })
                : 'Chưa cập nhật'}
            </div>
          </div>

          <div className="space-y-1.5 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
            <Label className="text-xs text-gray-500 flex items-center gap-1.5">
              <MapPinIcon className="h-3 w-3 text-gray-400" />
              Địa chỉ
            </Label>
            <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{user?.address || 'Chưa cập nhật'}</div>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-gray-500 flex items-center gap-1.5">
            <svg className="h-3 w-3 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 10H8.01M12 10H12.01M16 10H16.01M9 16H5C3.89543 16 3 15.1046 3 14V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V14C21 15.1046 20.1046 16 19 16H15L12 19L9 16Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Giới thiệu bản thân
          </Label>
          <div className="font-medium text-sm p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800">
            {user?.selfIntroduction || 'Chưa có thông tin giới thiệu'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}