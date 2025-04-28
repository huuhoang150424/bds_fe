import { useState } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import ListingTypeDelete from './listing-type-delete';

export enum ListingTypes {
  APARTMENT = 'CĂN HỘ',
  HOUSE = 'NHÀ Ở',
  CONDO = 'CHUNG CƯ',
  TOWNHOUSE = 'NHÀ PHỐ',
  LAND = 'ĐẤT',
  COMMERCIAL = 'THƯƠNG MẠI',
  INDUSTRIAL = 'CÔNG NGHIỆP',
  OFFICE = 'VĂN PHÒNG',
  RETAIL = 'BÁN LẺ',
  OTHER = 'KHÁC',
}

export type ListingType = {
  id: string;
  listingType: ListingTypes;
  slug: string;
  createdAt: string;
  updatedAt: string;
  propertyCount?: number;
};
export const columns: ColumnDef<ListingType>[] = [
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
    accessorKey: 'listingType',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Loại danh sách
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const listingType = row.getValue('listingType') as ListingTypes;
      return <Badge className='text-[10px] font-medium bg-red-100 text-red-700'>{listingType}</Badge>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Slug
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const slug = row.getValue('slug') as string;
      return <div className='text-xs font-mono'>{slug}</div>;
    },
  },
  {
    accessorKey: 'propertyCount',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Số lượng BĐS
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const propertyCount = row.getValue('propertyCount') as number;
      return <div className='text-xs font-medium'>{propertyCount?.toLocaleString() || 0}</div>;
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
      return <div className='text-xs'>{format(date, 'dd/MM/yyyy', { locale: vi })}</div>;
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Cập nhật
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('updatedAt') as string);
      return <div className='text-xs'>{format(date, 'dd/MM/yyyy', { locale: vi })}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];

function ActionsCell({ row }: { row: any }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const listingType = row.original;

  return (
    <div className='flex items-center gap-1'>
      <Button  variant='ghost' size='icon' className='h-6 w-6 p-0 hover:bg-red-50 hover:text-blue-500' title='Sửa'>
        <Edit className='h-3 w-3' />
        <span className='sr-only'>Sửa</span>
      </Button>
      <Button
        variant='ghost'
        size='icon'
        className='h-6 w-6 p-0 hover:bg-red-50 hover:text-red-500'
        onClick={()=>setDeleteDialogOpen(true)}
        title='Xóa'
      >
        <Trash2 className='h-3 w-3' />
        <span className='sr-only'>Xóa</span>
      </Button>

      <ListingTypeDelete
        selectedListingType={listingType}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
      />


    </div>
  );
}
