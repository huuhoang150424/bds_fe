import { useState, useCallback } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit2Icon, MapPinIcon, MoreHorizontalIcon, LockIcon, PhoneIcon, Sparkles, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ChangePasswordModal from './change-password';
import UpdateProfileModal from './update-profile';
import ChangePhoneModal from './changep-phone';
import Conditions from './conditions';

interface ProfileHeaderProps {
  user: any;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isChangePhoneOpen, setIsChangePhoneOpen] = useState(false);
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const handleOpenChangePhone = useCallback(() => {
    setIsChangePhoneOpen(true);
  }, []);

  const handleCloseChangePhone = useCallback(() => {
    setIsChangePhoneOpen(false);
  }, []);

  const handleOpenChangePassword = useCallback(() => {
    setIsChangePasswordOpen(true);
  }, []);

  const handleCloseChangePassword = useCallback(() => {
    setIsChangePasswordOpen(false);
  }, []);

  const handleOpenUpdateProfile = useCallback(() => {
    setIsUpdateProfileOpen(true);
  }, []);

  const handleCloseUpdateProfile = useCallback(() => {
    setIsUpdateProfileOpen(false);
  }, []);

  return (
    <div className="relative">
      <div className="h-48 md:h-64 w-full rounded-lg relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 rounded-lg"></div>
        <img
          src={user.coverPhoto || '/placeholder.svg?height=256&width=1024'}
          alt="Cover"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute z-[50] top-[200px] left-[2%]">
          <Avatar className="h-28 w-28 border-3 border-white dark:border-gray-900 shadow-md rounded-full overflow-hidden">
            <AvatarImage
              src={user.avatar || '/placeholder.svg?height=112&width=112'}
              alt={user.fullname || 'User'}
              className="object-cover"
            />
            <AvatarFallback className="bg-gray-200 text-gray-700 text-2xl">
              {user.fullname?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="relative pr-6 pl-[150px] mt-3 pb-3 z-20">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-3">
          <div className="flex w-full justify-between items-center mt-1 md:mt-0">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {user.fullname || 'Không xác định'}
                </h1>
                {user.emailVerified && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                    <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.5 12.5L10.5 14.5L15.5 9.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    Đã xác thực
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 text-gray-500 mt-1">
                <MapPinIcon className="h-3 w-3 text-gray-400" />
                <span className="text-xs">{user.address || 'Chưa cập nhật'}</span>
              </div>

              <div className="flex items-center gap-3 mt-1">
                <Badge
                  variant="secondary"
                  className="text-xs bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
                >
                  {user.roles || 'Agent'}
                </Badge>
                {user.lastActive && (
                  <span className="text-xs text-gray-500">
                    Hoạt động {formatDistanceToNow(new Date(user.lastActive), { addSuffix: true, locale: vi })}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3 md:mt-0">
            <Button
            onClick={() => setShowModal(true)}
            className="relative overflow-hidden bg-gradient-to-r from-red-500 via-red-600 to-rose-500 text-white px-8 py-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                <div className="absolute w-40 h-40 rounded-full bg-white blur-xl"></div>
              </div>
            </span>
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full"></span>
            <span className="relative flex items-center text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
              Đăng ký môi giới chuyên nghiệp
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
              <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8 border-gray-200 dark:border-gray-700">
                    <MoreHorizontalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="text-xs">Tùy chọn</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-xs cursor-pointer"
                    onSelect={(e) => {
                      e.preventDefault();
                      setIsDropdownOpen(false);
                      handleOpenChangePassword();
                    }}
                  >
                    <LockIcon className="h-3 w-3 mr-2" />
                    Đổi mật khẩu
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-xs cursor-pointer"
                    onSelect={(e) => {
                      e.preventDefault();
                      setIsDropdownOpen(false);
                      handleOpenChangePhone();
                    }}
                  >
                    <PhoneIcon className="h-3 w-3 mr-2" />
                    Thay đổi số điện thoại
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-xs cursor-pointer"
                    onSelect={(e) => {
                      e.preventDefault();
                      setIsDropdownOpen(false);
                      handleOpenUpdateProfile();
                    }}
                  >
                    <Edit2Icon className="h-3 w-3 mr-2" />
                    Chỉnh sửa hồ sơ
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-xs cursor-pointer"
                    onSelect={(e) => {
                      e.preventDefault();
                      setIsDropdownOpen(false);
                    }}
                  >
                    <svg className="h-3 w-3 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M19 9L12 16L5 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Tải xuống thông tin
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <Conditions open={showModal} onOpenChange={setShowModal}  />
      {isChangePasswordOpen && <ChangePasswordModal open={isChangePasswordOpen} onOpenChange={handleCloseChangePassword} /> }
      {isChangePhoneOpen && <ChangePhoneModal open={isChangePhoneOpen} onOpenChange={handleCloseChangePhone} />}
      {isUpdateProfileOpen && <UpdateProfileModal open={isUpdateProfileOpen} onOpenChange={handleCloseUpdateProfile} userSelect={user} />}
    </div>
  );
}