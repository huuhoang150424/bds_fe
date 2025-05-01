import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Trash2, Edit, Check, X } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import DeletePricing from './delete-pricing';
import { PricingEditDialog } from './edit-pricing';

export enum PricingLevel {
  FREE = 'FREE',
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE',
}
export type Pricing = {
  id: string;
  name: PricingLevel;
  description: string;
  price: number;
  discountPercent: number;
  displayDay: number;
  hasReport: boolean;
  maxPost: number;
  boostDays: number;
  expiredDay: number;
  createdAt: string;
  updatedAt: string;
  userCount?: number;
};
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(amount);
};
const calculateDiscountedPrice = (price: number, discountPercent: number) => {
  return price - (price * discountPercent) / 100;
};

export const columns: ColumnDef<Pricing>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Gói dịch vụ
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue('name') as PricingLevel;
      return (
        <Badge
          className={`text-[10px] font-medium ${
            name === PricingLevel.FREE
              ? 'bg-gray-100 text-gray-700'
              : name === PricingLevel.BASIC
                ? 'bg-blue-100 text-blue-700'
                : name === PricingLevel.STANDARD
                  ? 'bg-green-100 text-green-700'
                  : name === PricingLevel.PREMIUM
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-red-100 text-red-700'
          }`}
        >
          {name === PricingLevel.FREE
            ? 'Miễn phí'
            : name === PricingLevel.BASIC
              ? 'Cơ bản'
              : name === PricingLevel.STANDARD
                ? 'Tiêu chuẩn'
                : name === PricingLevel.PREMIUM
                  ? 'Cao cấp'
                  : 'Doanh nghiệp'}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'description',
    header: 'Mô tả',
    cell: ({ row }) => {
      const description = row.getValue('description') as string;
      return <div className='text-xs max-w-[200px] truncate'>{description}</div>;
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Giá
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.getValue('price') as number;
      const discountPercent = row.original.discountPercent;
      const hasDiscount = discountPercent > 0;

      return (
        <div className='text-xs'>
          {hasDiscount ? (
            <div>
              <span className='line-through text-muted-foreground'>{formatCurrency(price)}</span>
              <span className='ml-1 font-medium'>
                {formatCurrency(calculateDiscountedPrice(price, discountPercent))}
              </span>
              <Badge className='ml-1.5 text-[10px] bg-red-100 text-red-700'>-{discountPercent}%</Badge>
            </div>
          ) : (
            <span className='font-medium'>{formatCurrency(price)}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'features',
    header: 'Tính năng',
    cell: ({ row }) => {
      const { displayDay, maxPost, boostDays, hasReport, expiredDay } = row.original;
      return (
        <div className='text-xs space-y-1'>
          <div className='flex items-center gap-1'>
            <Badge variant='outline' className='text-[10px]'>
              {displayDay} ngày hiển thị
            </Badge>
            <Badge variant='outline' className='text-[10px]'>
              {maxPost} bài đăng
            </Badge>
          </div>
          <div className='flex items-center gap-1'>
            <Badge variant='outline' className='text-[10px]'>
              {boostDays} ngày tăng tốc
            </Badge>
            <Badge variant='outline' className='text-[10px]'>
              {expiredDay} ngày hiệu lực
            </Badge>
          </div>
          <div className='flex items-center gap-1'>
            {hasReport ? (
              <Badge className='text-[10px] bg-green-100 text-green-700'>
                <Check className='mr-1 h-2 w-2' />
                Có báo cáo
              </Badge>
            ) : (
              <Badge variant='outline' className='text-[10px] text-muted-foreground'>
                <X className='mr-1 h-2 w-2' />
                Không có báo cáo
              </Badge>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'userCount',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Người dùng
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const userCount = row.getValue('userCount') as number;
      return <div className='text-xs font-medium'>{userCount?.toLocaleString('vi-VN') || 0}</div>;
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
          Ngày tạo
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt') as string);
      return <div className='text-xs'>{format(date, 'dd MMM, yyyy')}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => <Action row={row} table={table} />,
  },
];
function Action({ row, table }: { row: any; table: any }) {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const selectedPricing = row.original;

  return (
    <div className='flex items-center gap-1'>
      <PricingEditDialog
        pricing={selectedPricing}
        trigger={
          <Button
            variant='ghost'
            size='icon'
            className='h-6 w-6 p-0 hover:bg-blue-50 hover:text-blue-500'
            title='Chỉnh sửa'
          >
            <Edit className='h-3 w-3' />
            <span className='sr-only'>Chỉnh sửa</span>
          </Button>
        }
      />
      <Button
        variant='ghost'
        size='icon'
        className='h-6 w-6 p-0 hover:bg-red-50 hover:text-red-500'
        onClick={() => setOpenModalDelete(true)}
        title='Xóa'
      >
        <Trash2 className='h-3 w-3' />
        <span className='sr-only'>Xóa</span>
      </Button>
      <DeletePricing
        selectedPricing={selectedPricing}
        open={openModalDelete}
        onOpenChange={setOpenModalDelete}
      />
    </div>
  );
}