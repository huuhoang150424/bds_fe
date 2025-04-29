import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, Filter, Trash2, Bell, BellOff } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { NotificationDeleteDialog } from './delete-notification';

export type Notification = {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};


export const columns: ColumnDef<Notification>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Chọn tất cả'
        className='h-3 w-3 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Chọn hàng'
        className='h-3 w-3 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'message',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tin nhắn
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const message = row.getValue('message') as string;
      const isRead = row.original.isRead;
      return <div className={`font-medium text-xs max-w-[300px] ${isRead ? '' : 'font-semibold'}`}>{message}</div>;
    },
  },
  {
    accessorKey: 'isRead',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const isRead = row.getValue('isRead') as boolean;
      return (
        <Badge
          className={`text-[10px] ${
            isRead ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
          }`}
        >
          {isRead ? 'Đã đọc' : 'Chưa đọc'}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(String(row.getValue(id)));
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ngày
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt') as string);
      return <div className='text-xs'>{format(date, 'MMM dd, yyyy HH:mm')}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => <DeleteAction row={row} table={table} />,
  },
];

export default function DeleteAction({ row, table }: { row: any; table: any }) {
  const notification = row.original;
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteConfirm = (id: string) => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div className='flex items-center gap-1'>
        <Button
          variant='ghost'
          size='icon'
          className='h-6 w-6 p-0 hover:bg-red-50 hover:text-red-500'
          onClick={() => {}}
          title={notification.isRead ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc'}
        >
          {notification.isRead ? <BellOff className='h-3 w-3' /> : <Bell className='h-3 w-3' />}
          <span className='sr-only'>{notification.isRead ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc'}</span>
        </Button>
        <Button
          variant='ghost'
          size='icon'
          className='h-6 w-6 p-0 hover:bg-red-50 hover:text-red-500'
          onClick={() => setIsDeleteDialogOpen(true)}
          title='Xóa'
        >
          <Trash2 className='h-3 w-3' />
          <span className='sr-only'>Xóa</span>
        </Button>
      </div>
      <NotificationDeleteDialog
        notification={notification}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
