//@ts-nocheck
import {
  type ColumnDef
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal, ExternalLink, Calendar, Eye, EyeOff, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';
import BannerDelete from './banner-delete';
import BannerEditDialog from './banner-edit';

export const columns: ColumnDef<any>[] = [
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
    accessorKey: 'displayOrder',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Order
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.getValue('displayOrder') as number;
      return <div className='text-center font-medium text-xs'>{order}</div>;
    },
  },
  {
    accessorKey: 'imageUrls',
    header: 'Preview',
    cell: ({ row }) => {
      const imageUrls: string = row.getValue('imageUrls');
      let parsedUrls: string[] = [];
      try {
        const parsed = JSON.parse(imageUrls);
        if (Array.isArray(parsed)) {
          parsedUrls = parsed;
        }
      } catch (error) {
        console.error('Failed to parse imageUrls:', error);
      }
      return (
        <div className='relative h-12 w-24 rounded-sm overflow-hidden border border-red-100'>
          <img
            src={parsedUrls[0] || 'https://via.placeholder.com/150'}
            alt={(row.getValue('title') as string) || 'No title'}
            className='object-cover w-full h-full'
          />
        </div>
      );
    },
  },,
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = row.getValue('title') as string;
      return (
        <div className='font-medium text-xs max-w-[200px] truncate' title={title}>
          {title}
        </div>
      );
    },
  },
  {
    accessorKey: 'targetUrl',
    header: 'Target URL',
    cell: ({ row }) => {
      const targetUrl = row.getValue('targetUrl') as string;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='flex items-center gap-1'>
                <div className='text-xs max-w-[120px] truncate'>{targetUrl}</div>
                <a
                  href={targetUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-red-500 hover:text-red-600'
                >
                  <ExternalLink className='h-3 w-3' />
                </a>
              </div>
            </TooltipTrigger>
            <TooltipContent className='text-xs p-2 max-w-[300px] break-all'>{targetUrl}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean;
      return (
        <div className='flex items-center'>
          <Badge
            className={`text-[10px] ${
              isActive
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className='flex items-center gap-1'>
              {isActive ? <Eye className='h-2.5 w-2.5' /> : <EyeOff className='h-2.5 w-2.5' />}
              {isActive ? 'Active' : 'Inactive'}
            </div>
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(String(row.getValue(id)));
    },
  },
  {
    accessorKey: 'dateRange',
    header: 'Display Period',
    cell: ({ row }) => {
      const startDate = new Date(row.original.startDate);
      const endDate = new Date(row.original.endDate);

      const now = new Date();
      let status = 'upcoming';
      if (now >= startDate && now <= endDate) {
        status = 'active';
      } else if (now > endDate) {
        status = 'expired';
      }

      return (
        <div className='text-xs'>
          <div className='flex items-center gap-1'>
            <Calendar className='h-3 w-3 text-muted-foreground' />
            <span>{format(startDate, 'MMM dd, yyyy')}</span>
          </div>
          <div className='flex items-center gap-1 mt-1'>
            <Calendar className='h-3 w-3 text-muted-foreground' />
            <span>{format(endDate, 'MMM dd, yyyy')}</span>
          </div>
          <Badge
            className={`mt-1 text-[10px] ${
              status === 'active'
                ? 'bg-green-100 text-green-700'
                : status === 'upcoming'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-amber-100 text-amber-700'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdBy',
    header: 'Created By',
    cell: ({ row }) => {
      const creator = row.original.createdBy || { name: 'Admin', avatar: null };
      return (
        <div className='flex items-center gap-1.5'>
          <Avatar className='h-5 w-5'>
            <AvatarImage src={creator.avatar || '/placeholder.svg'} alt={creator.name} />
            <AvatarFallback className='text-[10px] bg-red-100 text-red-500'>{creator.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className='text-xs'>{creator.name}</span>
        </div>
      );
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
          Created At
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
    cell: ({ row }) => <ActionsCell row={row} />
  },
];

function ActionsCell({ row }: { row: any }) {
  const banner = row.original;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-6 w-6 p-0 hover:bg-red-50'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-3 w-3' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='text-xs'>
          <DropdownMenuLabel className='text-xs'>Hành động</DropdownMenuLabel>
          <DropdownMenuItem
            className='text-xs cursor-pointer'
            onSelect={(e) => {
              e.preventDefault();
              setIsDropdownOpen(false);
              setEditDialogOpen(true); 
            }}
          >
            <Edit className='h-3 w-3 mr-2' />
            Sửa
          </DropdownMenuItem>
          <DropdownMenuItem
            className='text-xs cursor-pointer'
            onSelect={(e) => {
              e.preventDefault();
              setIsDropdownOpen(false);
            }}
          >
            {banner.isActive ? (
              <>
                <EyeOff className='h-3 w-3 mr-2' />
                Hủy kích hoạt
              </>
            ) : (
              <>
                <Eye className='h-3 w-3 mr-2' />
                Kích hoạt
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='text-xs text-red-500 cursor-pointer'
            onSelect={(e) => {
              e.preventDefault();
              setIsDropdownOpen(false);
              setDeleteDialogOpen(true);
            }}
          >
            <Trash2 className='h-3 w-3 mr-2' />
            Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <BannerDelete
        selectedBanner={banner}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
      />
      <BannerEditDialog
        banner={banner}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </>
  );
}