import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Trash2, Edit, Check, X } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { PricingCreateDialog } from './pricing-create-dialog';
import DeletePricing from './delete-pricing';

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
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
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
        aria-label='Select all'
        className='h-3 w-3 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
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
          Package
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
          {name}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
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
          Price
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
    header: 'Features',
    cell: ({ row }) => {
      const { displayDay, maxPost, boostDays, hasReport, expiredDay } = row.original;
      return (
        <div className='text-xs space-y-1'>
          <div className='flex items-center gap-1'>
            <Badge variant='outline' className='text-[10px]'>
              {displayDay} days display
            </Badge>
            <Badge variant='outline' className='text-[10px]'>
              {maxPost} posts
            </Badge>
          </div>
          <div className='flex items-center gap-1'>
            <Badge variant='outline' className='text-[10px]'>
              {boostDays} boost days
            </Badge>
            <Badge variant='outline' className='text-[10px]'>
              {expiredDay} days validity
            </Badge>
          </div>
          <div className='flex items-center gap-1'>
            {hasReport ? (
              <Badge className='text-[10px] bg-green-100 text-green-700'>
                <Check className='mr-1 h-2 w-2' />
                Reports
              </Badge>
            ) : (
              <Badge variant='outline' className='text-[10px] text-muted-foreground'>
                <X className='mr-1 h-2 w-2' />
                No Reports
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
          Users
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const userCount = row.getValue('userCount') as number;
      return <div className='text-xs font-medium'>{userCount?.toLocaleString() || 0}</div>;
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
          Created
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt') as string);
      return <div className='text-xs'>{format(date, 'MMM dd, yyyy')}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row,table }) => <Action row={row} table={table}/>
  }
];


function Action({ row, table }: { row: any; table: any }) {
  const [openModalDelete,setOpenModalDelete]=useState(false);
  const selectedPricing=row.original ;
  const handleDeleteConfirm=()=>{

  }

  return (
    <div className='flex items-center gap-1'>
      <Button variant='ghost' size='icon' className='h-6 w-6 p-0 hover:bg-red-50 hover:text-blue-500' title='Edit'>
        <Edit className='h-3 w-3' />
        <span className='sr-only'>Sửa</span>
      </Button>
      <Button
        variant='ghost'
        size='icon'
        className='h-6 w-6 p-0 hover:bg-red-50 hover:text-red-500'
        onClick={() => setOpenModalDelete(true)}
        title='Delete'
      >
        <Trash2 className='h-3 w-3' />
        <span className='sr-only'>Xóa</span>
      </Button>

      <DeletePricing
        selectedPricing={selectedPricing}
        open={openModalDelete}
        onOpenChange={setOpenModalDelete}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
