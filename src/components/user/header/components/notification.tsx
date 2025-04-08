import { useEffect, useState } from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { PiBellRinging } from 'react-icons/pi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BsCheckAll } from 'react-icons/bs';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, Megaphone } from 'lucide-react';
import { useAppContext } from '@/context/chat';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/authReducer';
import { useGetAllNotification } from '../hooks/use-get-notifications';
import { useReadAllNotification } from '../hooks/use-read-all-notification';
import { useReadNotification } from '../hooks/use-read-notification';
import { LoadingSpinner } from '@/components/common';
import { convertDate } from '@/lib/convert-date';
import Push from 'push.js';

export default function Notification() {
  const { socket, connectSocket } = useAppContext();
  const user = useSelector(selectUser);
  const [read, setRead] = useState(false);
  const [allNotification, setAllNotification] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const { data, isLoading } = useGetAllNotification();
  const readAllMutation = useReadAllNotification();
  const readMutation = useReadNotification();

  const originalTitle = document.title;

  useEffect(() => {
    connectSocket();
    socket.emit('subscribeToNotifications', user?.id);

    const getAllNotification = (notification: any) => {
      console.log('Thông báo mới:', notification);
      setAllNotification((prev) => [notification, ...prev]);

      Push.create("Thông báo mới", {
        body: notification.message,
        icon: "https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-notification-icon-png-image_4187244.jpg", 
        timeout: 5000, 
        onClick: function (this:any) {
          window.focus();
          this.close();
        },
      });

      let isBlinking = false;
      const blinkInterval = setInterval(() => {
        document.title = isBlinking ? `📢 ${notification.message}` : originalTitle;
        isBlinking = !isBlinking;
      }, 1000);

      setTimeout(() => {
        clearInterval(blinkInterval);
        document.title = originalTitle;
      }, 5000);
    };
    socket.on('newNotification', getAllNotification);

    return () => {
      socket.off('newNotification', getAllNotification);
    };
  }, [socket, user?.id]);

  useEffect(() => {
    if (data?.data) {
      const sortedNotifications = [...data.data].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setAllNotification(sortedNotifications);
    }
  }, [data]);

  const handleMarkAllAsRead = () => {
    readAllMutation.mutate(undefined, {
      onSuccess: () => {
        setRead(true);
        setAllNotification((prev) =>
          prev.map((notification) => ({ ...notification, isRead: true }))
        );
      },
      onError: (error) => {
        console.error('Lỗi khi đánh dấu tất cả:', error);
      },
    });
  };
  const handleMarkAsRead = (notificationId: string) => {
    readMutation.mutate(
      { notificationId },
      {
        onSuccess: () => {
          setAllNotification((prev) =>
            prev.map((notification) =>
              notification.id === notificationId ? { ...notification, isRead: true } : notification
            )
          );
        },
        onError: (error) => {
          console.error('Lỗi khi đánh dấu thông báo:', error);
        },
      }
    );
  };
  const unreadNotifications = allNotification
    .filter((notification) => !notification.isRead)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const readNotifications = allNotification
    .filter((notification) => notification.isRead)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <Popover>
      <PopoverTrigger>
        <div className='relative'>
          <PiBellRinging size={22} />
          {unreadNotifications.length > 0 && (
            <span className='absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full'></span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className='z-[100] w-[380px] p-0 mt-[10px]'>
        <div className='p-3'>
          <div className='flex items-center justify-between mb-[10px]'>
            <span className='font-medium text-lg'>Thông báo</span>
            <div className='flex items-center space-x-2'>
              <div className='flex items-center space-x-1'>
                <Switch
                  id='mark-all-read'
                  checked={read}
                  onCheckedChange={(checked) => {
                    if (checked) handleMarkAllAsRead();
                    setRead(checked);
                  }}
                />
                <label htmlFor='mark-all-read' className='text-sm text-gray-600'>
                  Đánh dấu tất cả
                </label>
              </div>
              <HoverCard>
                <HoverCardTrigger>
                  <div className='text-[24px] cursor-pointer'>
                    <BsCheckAll
                      className={cn(read === true ? 'opacity-20' : 'font-bold')}
                      onClick={handleMarkAllAsRead}
                    />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className='text-sm'>Đánh dấu tất cả đã đọc thông báo</HoverCardContent>
              </HoverCard>
              <Settings size={18} className='text-gray-500 cursor-pointer' />
            </div>
          </div>
        </div>

        <div className='border-t border-gray-200'></div>

        <Tabs defaultValue='all' className='w-full' onValueChange={setActiveTab}>
          <div className='border-b border-gray-200'>
            <ScrollArea className='whitespace-nowrap'>
              <div className='flex p-1'>
                <TabsList className='bg-transparent h-9 p-0'>
                  <TabsTrigger
                    className='data-[state=active]:bg-transparent data-[state=active]:text-[#E03C31] data-[state=active]:border-b-2 data-[state=active]:border-[#E03C31] rounded-none px-3 h-9'
                    value='all'
                  >
                    Tất cả
                  </TabsTrigger>
                  <TabsTrigger
                    className='data-[state=active]:bg-transparent data-[state=active]:text-[#E03C31] data-[state=active]:border-b-2 data-[state=active]:border-[#E03C31] rounded-none px-3 h-9'
                    value='unread'
                  >
                    Chưa đọc
                  </TabsTrigger>
                  <TabsTrigger
                    className='data-[state=active]:bg-transparent data-[state=active]:text-[#E03C31] data-[state=active]:border-b-2 data-[state=active]:border-[#E03C31] rounded-none px-3 h-9'
                    value='read'
                  >
                    Đã đọc
                  </TabsTrigger>
                </TabsList>
              </div>
            </ScrollArea>
          </div>
          <TabsContent value='all' className='m-0'>
            {isLoading ? (
              <LoadingSpinner className='mx-auto my-[100px]' />
            ) : (
              <>
                {allNotification.length > 0 ? (
                  <ScrollArea className='h-[300px]'>
                    {allNotification.map((notification: any) => (
                      <div
                        key={notification?.id}
                        className={cn(
                          'flex items-start p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer',
                          !notification?.isRead && 'bg-gray-50',
                        )}
                        onClick={() => !notification.isRead && handleMarkAsRead(notification.id)}
                      >
                        <div className='relative mr-3 mt-1'>
                          <div className='bg-gray-200 rounded-full p-2'>
                            <Megaphone size={18} className='text-gray-600' />
                          </div>
                          {!notification?.isRead && (
                            <span className='absolute -top-1 -left-1 w-2 h-2 bg-red-500 rounded-full'></span>
                          )}
                        </div>
                        <div className='flex-1'>
                          <p className={cn('text-sm', !notification?.isRead && 'font-medium')}>
                            {notification.message}
                          </p>
                          <p className='text-xs text-gray-500 mt-1'>{convertDate(notification?.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                ) : (
                  <div className='flex flex-col items-center justify-center py-10'>
                    <div className='bg-gray-100 rounded-full p-4 mb-3'>
                      <PiBellRinging size={24} className='text-gray-400' />
                    </div>
                    <p className='text-gray-500'>Không có thông báo nào</p>
                  </div>
                )}
              </>
            )}
          </TabsContent>
          <TabsContent value='unread' className='m-0'>
            {isLoading ? (
              <LoadingSpinner className='mx-auto my-[100px]' />
            ) : (
              <>
                {unreadNotifications.length > 0 ? (
                  <ScrollArea className='h-[300px]'>
                    {unreadNotifications.map((notification: any) => (
                      <div
                        key={notification?.id}
                        className={cn(
                          'flex items-start p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer',
                          !notification?.isRead && 'bg-gray-50',
                        )}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <div className='relative mr-3 mt-1'>
                          <div className='bg-gray-200 rounded-full p-2'>
                            <Megaphone size={18} className='text-gray-600' />
                          </div>
                          {!notification?.isRead && (
                            <span className='absolute -top-1 -left-1 w-2 h-2 bg-red-500 rounded-full'></span>
                          )}
                        </div>
                        <div className='flex-1'>
                          <p className={cn('text-sm', !notification?.isRead && 'font-medium')}>
                            {notification.message}
                          </p>
                          <p className='text-xs text-gray-500 mt-1'>{convertDate(notification?.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                ) : (
                  <div className='flex flex-col items-center justify-center py-10'>
                    <div className='bg-gray-100 rounded-full p-4 mb-3'>
                      <PiBellRinging size={24} className='text-gray-400' />
                    </div>
                    <p className='text-gray-500'>Không có thông báo chưa đọc nào</p>
                  </div>
                )}
              </>
            )}
          </TabsContent>
          <TabsContent value='read' className='m-0'>
            {isLoading ? (
              <LoadingSpinner className='mx-auto my-[100px]' />
            ) : (
              <>
                {readNotifications.length > 0 ? (
                  <ScrollArea className='h-[300px]'>
                    {readNotifications.map((notification: any) => (
                      <div
                        key={notification?.id}
                        className={cn(
                          'flex items-start p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer',
                        )}
                      >
                        <div className='relative mr-3 mt-1'>
                          <div className='bg-gray-200 rounded-full p-2'>
                            <Megaphone size={18} className='text-gray-600' />
                          </div>
                        </div>
                        <div className='flex-1'>
                          <p className='text-sm'>{notification.message}</p>
                          <p className='text-xs text-gray-500 mt-1'>{convertDate(notification?.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                ) : (
                  <div className='flex flex-col items-center justify-center py-10'>
                    <div className='bg-gray-100 rounded-full p-4 mb-3'>
                      <PiBellRinging size={24} className='text-gray-400' />
                    </div>
                    <p className='text-gray-500'>Không có thông báo đã đọc nào</p>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}