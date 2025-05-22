import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, Edit } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

// Define the data type
export type PricingPackage = {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  pricingId: string;
  remainingPosts: number;
  displayDay: number;
  startDate: string;
  boostDays: number;
  endDate: string;
  status: 'completed' | 'pending' | 'expired';
  pricing: {
    id: string;
    name: string;
    price: number;
    displayDay: number;
    boostDays: number;
    expiredDay: number;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  profession: string;
  points: number;
  createdAt: string;
};

export type VIPPackage = {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  pricingId: string;
  remainingPosts: number;
  displayDay: number;
  startDate: string;
  boostDays: number;
  endDate: string;
  status: 'completed' | 'pending' | 'expired';
  pricing: {
    id: string;
    name: string;
    price: number;
    displayDay: number;
    boostDays: number;
    expiredDay: number;
  };
};

// Format currency to VND
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Format date to Vietnamese format
const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'dd/MM/yyyy', { locale: vi });
};

export const columns: ColumnDef<PricingPackage>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'pricing.name',
    header: ({ column }) => {
      return (
        <div className='flex items-center'>
          Gói VIP
          <Button
            variant='ghost'
            size='sm'
            className='ml-1 h-4 w-4 p-0'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className='h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className='font-medium'>{row.original.pricing.name}</div>;
    },
  },
  {
    accessorKey: 'pricing.price',
    header: ({ column }) => {
      return (
        <div className='flex items-center'>
          Giá
          <Button
            variant='ghost'
            size='sm'
            className='ml-1 h-4 w-4 p-0'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className='h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => formatCurrency(row.original.pricing.price),
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => {
      return (
        <div className='flex items-center'>
          Ngày bắt đầu
          <Button
            variant='ghost'
            size='sm'
            className='ml-1 h-4 w-4 p-0'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className='h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => formatDate(row.original.startDate),
  },
  {
    accessorKey: 'endDate',
    header: 'Ngày kết thúc',
    cell: ({ row }) => formatDate(row.original.endDate),
  },
  {
    accessorKey: 'remainingPosts',
    header: ({ column }) => {
      return (
        <div className='flex items-center'>
          Bài còn lại
          <Button
            variant='ghost'
            size='sm'
            className='ml-1 h-4 w-4 p-0'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className='h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => row.original.remainingPosts,
  },
  {
    accessorKey: 'displayDay',
    header: 'Ngày hiển thị',
    cell: ({ row }) => `${row.original.displayDay} ngày`,
  },
  {
    accessorKey: 'boostDays',
    header: 'Ngày boost',
    cell: ({ row }) => `${row.original.boostDays} ngày`,
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.original.status;
      let badgeClass = '';
      let statusText = '';

      switch (status) {
        case 'completed':
          badgeClass = 'bg-green-100 text-green-700 hover:bg-green-100';
          statusText = 'Hoàn thành';
          break;
        case 'pending':
          badgeClass = 'bg-blue-100 text-blue-700 hover:bg-blue-100';
          statusText = 'Đang xử lý';
          break;
        case 'expired':
          badgeClass = 'bg-amber-100 text-amber-700 hover:bg-amber-100';
          statusText = 'Hết hạn';
          break;
        default:
          badgeClass = 'bg-gray-100 text-gray-700 hover:bg-gray-100';
          statusText = status;
      }

      return (
        <Badge variant='outline' className={badgeClass}>
          {statusText}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            <Eye className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            <Edit className='h-4 w-4' />
          </Button>
        </div>
      );
    },
  },
];
