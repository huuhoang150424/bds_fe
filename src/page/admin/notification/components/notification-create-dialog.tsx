import type React from 'react';
import { useState } from 'react';
import { Plus, Loader2, Bell, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetAllUser } from '../../user/hooks/use-get-all-user';
import { Pagination } from '@/components/user/pagination';
import { toast } from '@/hooks/use-toast';
import { useSendNotification } from '../hooks/use-send-notification';

interface NotificationCreateDialogProps {
  trigger?: React.ReactNode;
  onNotificationCreated?: (notification: any) => void;
}

export function NotificationCreateDialog({ trigger, onNotificationCreated }: NotificationCreateDialogProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [manualSelectedUsers, setManualSelectedUsers] = useState<string[]>([]); 
  const [sendToAll, setSendToAll] = useState(false);
  const [notificationData, setNotificationData] = useState({
    message: '',
    priority: 'normal',
    expiresAt: '',
  });
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: allUser } = useGetAllUser(page, limit);
  const { mutate: sendNotification, isPending: isSubmitting } = useSendNotification();

  const handleChangePage = (page: number) => {
    setPage(page);
    setSelectedUsers([]);
    setManualSelectedUsers([]);
    setSendToAll(false);
  };

  const handleUserToggle = (userId: string) => {
    setManualSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
    if (!sendToAll) {
      setSelectedUsers((prev) =>
        prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
      );
    }
  };

  const handleSendToAll = (checked: boolean) => {
    setSendToAll(checked);
    if (checked) {
      const pageUserIds = allUser?.data?.map((user: any) => user.id) || [];
      setSelectedUsers(pageUserIds);
    } else {
      setSelectedUsers(manualSelectedUsers);
    }
  };

  const handleSubmit = async () => {
    if (!notificationData.message) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng nhập nội dung thông báo',
        variant: 'destructive',
      });
      return;
    }

    if (!notificationData.expiresAt) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng chọn ngày hết hạn',
        variant: 'destructive',
      });
      return;
    }

    if (selectedUsers.length === 0) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng chọn ít nhất một người nhận',
        variant: 'destructive',
      });
      return;
    }

    const priorityMap: { [key: string]: number } = {
      low: 1,
      normal: 2,
      high: 3,
    };

    const data: any = {
      message: notificationData.message,
      priority: priorityMap[notificationData.priority],
      endDate: new Date(notificationData.expiresAt).toISOString(),
      userId: selectedUsers.length === 1 ? selectedUsers[0] : selectedUsers,
    };

    sendNotification(data, {
      onSuccess: (response) => {
        toast({
          title: 'Thành công',
          description: 'Gửi thông báo thành công',
          variant: 'success',
        });
        if (onNotificationCreated) {
          onNotificationCreated(response);
        }
        setNotificationData({ message: '', priority: 'normal', expiresAt: '' });
        setSelectedUsers([]);
        setManualSelectedUsers([]);
        setSendToAll(false);
        setSearchQuery('');
        setOpen(false);
      },
      onError: (error: any) => {
        toast({
          title: 'Lỗi',
          description: error?.response?.data?.message || 'Không thể gửi thông báo',
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant={'outline'} className='bg-red-500 hover:bg-red-600 text-white'>
            <Plus className='mr-1 h-3 w-3' />
            <span className='text-[14px]'>Tạo thông báo mới</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg border-red-100 overflow-hidden max-h-[90vh] p-0'>
        <div className='overflow-y-auto max-h-[calc(90vh-30px)] px-6 py-6'>
          <DialogHeader>
            <DialogTitle className='text-base flex items-center gap-2'>
              <Bell className='h-4 w-4 text-red-500' />
              Tạo thông báo
            </DialogTitle>
            <DialogDescription className='text-[14px]'>
              Tạo một thông báo mới để gửi đến một hoặc nhiều người dùng.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-2'>
            <div className='space-y-2'>
              <Label htmlFor='message' className='text-[14px] font-medium'>
                Tin nhắn <span className='text-red-500'>*</span>
              </Label>
              <Textarea
                id='message'
                placeholder='Nhập nội dung thông báo'
                className='text-[14px] min-h-[100px] resize-none'
                value={notificationData.message}
                onChange={(e) => setNotificationData({ ...notificationData, message: e.target.value })}
              />
              <p className='text-[11px] text-muted-foreground'>{notificationData.message.length} / 500 ký tự</p>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='priority' className='text-[14px] font-medium'>
                  Độ ưu tiên
                </Label>
                <Select
                  value={notificationData.priority}
                  onValueChange={(value) => setNotificationData({ ...notificationData, priority: value })}
                >
                  <SelectTrigger id='priority' className='text-[14px] h-8'>
                    <SelectValue placeholder='Chọn độ ưu tiên' />
                  </SelectTrigger>
                  <SelectContent className='z-[9999999]'>
                    <SelectItem value='low' className='text-[14px]'>
                      <div className='flex items-center gap-2'>
                        <Badge className='bg-blue-100 text-blue-700 hover:bg-blue-200 text-[11px]'>Thấp</Badge>
                        <span>Độ ưu tiên thấp</span>
                      </div>
                    </SelectItem>
                    <SelectItem value='normal' className='text-[14px]'>
                      <div className='flex items-center gap-2'>
                        <Badge className='bg-green-100 text-green-700 hover:bg-green-200 text-[11px]'>
                          Bình thường
                        </Badge>
                        <span>Độ ưu tiên bình thường</span>
                      </div>
                    </SelectItem>
                    <SelectItem value='high' className='text-[14px]'>
                      <div className='flex items-center gap-2'>
                        <Badge className='bg-red-100 text-red-700 hover:bg-red-200 text-[11px]'>Cao</Badge>
                        <span>Độ ưu tiên cao</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='expiresAt' className='text-[14px] font-medium'>
                  Ngày hết hạn
                </Label>
                <Input
                  id='expiresAt'
                  type='datetime-local'
                  className='text-[14px] text-gray-700 outline-none px-[16px] py-[6px] rounded-[8px]'
                  value={notificationData.expiresAt}
                  onChange={(e) => setNotificationData({ ...notificationData, expiresAt: e.target.value })}
                />
                <p className='text-[11px] text-muted-foreground'>Bắt buộc. Chọn ngày hết hạn cho thông báo.</p>
              </div>
            </div>
            <Separator className='my-2 bg-red-100' />
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='recipients' className='text-[14px] font-medium'>
                  Người nhận <span className='text-red-500'>*</span>
                </Label>
                <div className='flex items-center space-x-2'>
                  <Switch
                    id='sendToAll'
                    checked={sendToAll}
                    onCheckedChange={handleSendToAll}
                    className='data-[state=checked]:bg-red-500'
                  />
                  <Label htmlFor='sendToAll' className='text-[14px]'>
                    Gửi đến tất cả người dùng trên trang này
                  </Label>
                </div>
              </div>
              {!sendToAll && (
                <>
                  <div className='relative'>
                    <Search className='absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground' />
                    <Input
                      placeholder='Tìm kiếm người dùng theo tên, email hoặc vai trò...'
                      className='pl-7 text-[14px] h-8 outline-none'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <Button
                        variant='ghost'
                        size='icon'
                        className='absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2'
                        onClick={() => setSearchQuery('')}
                      >
                        <X className='h-3 w-3' />
                      </Button>
                    )}
                  </div>
                  {selectedUsers.length > 0 && (
                    <div className='flex flex-wrap gap-1 mt-2'>
                      {selectedUsers.map((userId) => {
                        const user = allUser?.data?.find((u: any) => u.id === userId);
                        if (!user) return null;
                        return (
                          <Badge
                            key={userId}
                            variant='secondary'
                            className='text-[11px] bg-red-50 text-red-700 hover:bg-red-100'
                          >
                            {user.fullname}
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-3 w-3 ml-1'
                              onClick={() => handleUserToggle(userId)}
                            >
                              <X className='h-2 w-2' />
                            </Button>
                          </Badge>
                        );
                      })}
                      <Button
                        variant='ghost'
                        size='sm'
                        className='h-5 text-[11px] px-1'
                        onClick={() => {
                          setSelectedUsers([]);
                          setManualSelectedUsers([]);
                        }}
                      >
                        Xóa tất cả
                      </Button>
                    </div>
                  )}
                  <ScrollArea className='h-[150px] rounded-md border border-red-100'>
                    <div className='p-2 space-y-1'>
                      {allUser?.data?.length > 0 ? (
                        allUser?.data
                          ?.filter((user: any) =>
                            searchQuery
                              ? user.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                user.roles?.toLowerCase().includes(searchQuery.toLowerCase())
                              : true
                          )
                          ?.map((user: any) => (
                            <div
                              key={user.id}
                              className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-red-50 ${
                                selectedUsers.includes(user?.id) ? 'bg-red-50' : ''
                              }`}
                              onClick={() => handleUserToggle(user?.id)}
                            >
                              <div className='flex items-center gap-2'>
                                <Avatar className='h-6 w-6'>
                                  <AvatarImage src={user?.avatar || '/placeholder.svg'} alt={user?.fullname} />
                                  <AvatarFallback className='text-[11px] bg-red-100 text-red-500'>
                                    {user?.fullname?.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className='text-[14px] font-medium'>{user?.fullname}</p>
                                  <p className='text-[11px] text-muted-foreground'>{user?.email}</p>
                                </div>
                              </div>
                              <div className='flex items-center gap-2'>
                                <Badge variant='outline' className='text-[11px]'>
                                  {user?.roles}
                                </Badge>
                                <div
                                  className={`h-4 w-4 rounded-sm border ${
                                    selectedUsers.includes(user?.id) ? 'bg-red-500 border-red-500' : 'border-gray-300'
                                  } flex items-center justify-center`}
                                >
                                  {selectedUsers.includes(user?.id) && (
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      viewBox='0 0 24 24'
                                      fill='none'
                                      stroke='currentColor'
                                      strokeWidth='3'
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      className='h-3 w-3 text-white'
                                    >
                                      <polyline points='20 6 9 17 4 12'></polyline>
                                    </svg>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                      ) : (
                        <div className='text-center py-4 text-[14px] text-muted-foreground'>
                          Không tìm thấy người dùng nào khớp với "{searchQuery}"
                        </div>
                      )}
                    </div>
                    <div className='flex items-center justify-between px-4 py-3 border-t border-red-50 w-full'>
                      <div className='text-xs text-gray-500'>Người dùng</div>
                      <Pagination
                        currentPage={allUser?.currentPage}
                        totalPages={allUser?.totalPages}
                        onPageChange={handleChangePage}
                        className='mt-0'
                      />
                    </div>
                  </ScrollArea>
                  <p className='text-[11px] text-muted-foreground'>Đã chọn {selectedUsers.length} người dùng</p>
                </>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              size='sm'
              className='h-8 text-[14px]'
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button
              type='button'
              size='sm'
              variant={'outline'}
              className='bg-red-500 hover:bg-red-600 text-white'
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-1.5 h-3 w-3 animate-spin' />
                  Loading...
                </>
              ) : (
                <>
                  <Bell className='mr-1.5 h-3 w-3' />
                  Tạo thông báo mới
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}