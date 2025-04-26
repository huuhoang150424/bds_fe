import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import NotificationCard from '../components/notification-card';
import { NotificationTable } from '../components/notification-table';
import { notificationData } from '../components/column';

export default function ListNotification() {
  useScrollToTopOnMount();
  const [notifications, setNotifications] = useState([...notificationData]);
  const handleDelete = (id: string) => {
  };


  return (
    <div className=''>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-xl font-[600] text-gray-700 tracking-tight'>Danh sách thông báo</h1>
          <p className='text-muted-foreground text-xs'>Quản lý thông báo toàn hệ thống</p>
        </div>
      </div>
      <Tabs defaultValue='tables' className='space-y-1'>
        <div className='flex items-center justify-between'>
          <TabsList className=' border border-gray-200 bg-transparent '>
            <TabsTrigger value='tables' className='text-[13px] px-6 data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm'>
              Bảng
            </TabsTrigger>
            <TabsTrigger value='unread' className='text-[13px] px-6 data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm'>
              Card
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='tables'>
          <NotificationTable />
        </TabsContent>
        <TabsContent value='unread' className='space-y-5'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4'>
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onDelete={() => handleDelete(notification.id)}
              />
            ))}
          </div>
          {notifications.length === 0 && (
            <div className='text-center py-10 text-muted-foreground text-xs'>No notifications found.</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
