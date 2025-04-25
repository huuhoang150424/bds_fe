
import {
  type ColumnDef
} from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Eye, Clock, Filter } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Pagination } from '@/components/user/pagination';


export type News = {
  id: string;
  title: string;
  category: string;
  view: number;
  readingTime: number;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  author: {
    fullname: string;
    avatar: string;
  };
};


// Define the columns
export const columns: ColumnDef<News>[] = [
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
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tên bài viết
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = row.getValue('title') as string;
      return (
        <div className='flex items-center gap-2 max-w-[300px]'>
          <div className='font-medium text-xs truncate'>{title}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Danh mục
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.getValue('category') as string;
      return (
        <Badge variant='outline' className='text-[10px] border-red-200 text-red-500 font-medium'>
          {category.charAt(0) + category.slice(1).toLowerCase().replace('_', ' ')}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'author',
    header: 'Tác giả',
    cell: ({ row }) => {
      const author = row.original.author;
      return (
        <div className='flex items-center gap-1.5'>
          <Avatar className='h-5 w-5'>
            <AvatarImage src={author.avatar || '/placeholder.svg'} alt={author.fullname} />
            <AvatarFallback className='text-[10px] bg-red-100 text-red-500'>{author.fullname.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className='text-xs'>{author.fullname}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'view',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Lượt xem
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const view = row.getValue('view') as number;
      return (
        <div className='flex items-center gap-1 text-xs'>
          <Eye className='h-3 w-3 text-muted-foreground' />
          {view.toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: 'readingTime',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Số phút đọc
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const readingTime = row.getValue('readingTime') as number;
      return (
        <div className='flex items-center gap-1 text-xs'>
          <Clock className='h-3 w-3 text-muted-foreground' />
          {readingTime} min
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
          Ngày
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
    cell: ({ row }) => {
      const news = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-6 w-6 p-0 hover:bg-red-50'>
              <span className='sr-only'>Hành động</span>
              <MoreHorizontal className='h-3 w-3' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='text-xs'>
            <DropdownMenuLabel className='text-xs'>Hành động</DropdownMenuLabel>
            <DropdownMenuItem className='text-xs cursor-pointer'>Sửa</DropdownMenuItem>
            <DropdownMenuItem className='text-xs cursor-pointer'>Xem</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-xs text-red-500 cursor-pointer'>Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
