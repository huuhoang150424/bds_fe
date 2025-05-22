import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import NotificationCard from '../components/notification-card';
import { NotificationTable } from '../components/notification-table';
import { useGetNotification } from '../hooks/use-get-notification';
import { Pagination } from '@/components/user/pagination';
import { NotificationDeleteDialog } from '../components/delete-notification';

export default function ListNotification() {
  useScrollToTopOnMount();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetNotification(page, limit);
  const [notificationId, setNotificationId] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const handleChangePage = (page: number) => {
    setPage(page);
  };
  const handleDelete = (id: string) => {
    setNotificationId(id);
    setIsDeleteDialogOpen(true);
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
            <TabsTrigger
              value='tables'
              className='text-[13px] px-6 data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm'
            >
              Bảng
            </TabsTrigger>
            <TabsTrigger
              value='unread'
              className='text-[13px] px-6 data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm'
            >
              Card
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='tables'>
          <NotificationTable data={data} isLoading={isLoading} handleChangePage={handleChangePage} />
        </TabsContent>
        <TabsContent value='unread' className='space-y-5'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4'>
            {data?.data?.data?.map((notification: any) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onDelete={() => handleDelete(notification.id)}
              />
            ))}
          </div>
          {data?.data?.data?.length === 0 && (
            <div className='text-center py-10 text-muted-foreground text-xs'>No notifications found.</div>
          )}
          <div className='flex items-center justify-between px-4 py-3 border rounded-[8px] w-full'>
            <div className='text-xs text-gray-500'>Hiển thị 1 đến 10 trong tổng số 100 thông báo hệ thống</div>
            <Pagination
              currentPage={data?.data?.currentPage}
              totalPages={data?.data?.totalPages}
              onPageChange={handleChangePage}
              className='mt-0'
            />
          </div>
          <NotificationDeleteDialog
            notificationId={notificationId}
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
