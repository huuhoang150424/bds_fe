import { useState } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ListingTypeDelete from './listing-type-delete';
import ListingTypeUpdate from './listing-type-update';

export enum ListingTypes {
  Sale = "Bán",
  Rent = "Cho thuê",
  Project = "Dự án",
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
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Loại danh sách
        <ArrowUpDown className='ml-1 h-3 w-3' />
      </Button>
    ),
    cell: ({ row }) => {
      const listingType = row.getValue('listingType') as ListingTypes;
      return <Badge className='text-[10px] font-medium bg-red-100 text-red-700'>{listingType}</Badge>;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Slug
        <ArrowUpDown className='ml-1 h-3 w-3' />
      </Button>
    ),
    cell: ({ row }) => {
      const slug = row.getValue('slug') as string;
      return <div className='text-xs font-mono'>{slug}</div>;
    },
  },
  {
    accessorKey: 'propertyCount',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Số lượng BĐS
        <ArrowUpDown className='ml-1 h-3 w-3' />
      </Button>
    ),
    cell: ({ row }) => {
      const propertyCount = row.getValue('propertyCount') as number;
      return <div className='text-xs font-medium'>{propertyCount?.toLocaleString() || 0}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Ngày tạo
        <ArrowUpDown className='ml-1 h-3 w-3' />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt') as string);
      return <div className='text-xs'>{format(date, 'dd/MM/yyyy', { locale: vi })}</div>;
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Cập nhật
        <ArrowUpDown className='ml-1 h-3 w-3' />
      </Button>
    ),
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
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const listingType = row.original as ListingType;

  const isRestricted = [ListingTypes.Sale, ListingTypes.Rent, ListingTypes.Project].includes(
    listingType.listingType
  );

  return (
    <div className='flex items-center gap-1'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button
                variant='ghost'
                size='icon'
                className={`h-6 w-6 p-0 ${
                  isRestricted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-50 hover:text-blue-500'
                }`}
                onClick={() => !isRestricted && setEditDialogOpen(true)}
                disabled={isRestricted}
                title={isRestricted ? 'Không thể chỉnh sửa loại danh sách cố định' : 'Sửa'}
              >
                <Edit className='h-3 w-3' />
                <span className='sr-only'>Sửa</span>
              </Button>
            </span>
          </TooltipTrigger>
          {isRestricted && (
            <TooltipContent>
              <p>Không thể chỉnh sửa loại danh sách "{listingType.listingType}" vì nó thuộc danh sách cố định.</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button
                variant='ghost'
                size='icon'
                className={`h-6 w-6 p-0 ${
                  isRestricted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-50 hover:text-red-500'
                }`}
                onClick={() => !isRestricted && setDeleteDialogOpen(true)}
                disabled={isRestricted}
                title={isRestricted ? 'Không thể xóa loại danh sách cố định' : 'Xóa'}
              >
                <Trash2 className='h-3 w-3' />
                <span className='sr-only'>Xóa</span>
              </Button>
            </span>
          </TooltipTrigger>
          {isRestricted && (
            <TooltipContent>
              <p>Không thể xóa loại danh sách "{listingType.listingType}" vì nó thuộc danh sách cố định.</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      <ListingTypeUpdate
        selectedListingType={listingType}
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
      />
      <ListingTypeDelete
        selectedListingType={listingType}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
      />
    </div>
  );
}