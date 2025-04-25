import { useState } from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal, Eye, Clock, Filter } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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

// Define the data type
export type News = {
  id: string;
  title: string;
  category: string;
  views: number;
  readingTime: number;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  author: {
    name: string;
    avatar: string;
  };
};

// Sample data
export const data: News[] = [
  {
    id: '1',
    title: 'New Technology Breakthrough Promises Faster Computing',
    category: 'TECHNOLOGY',
    views: 1245,
    readingTime: 4,
    status: 'published',
    createdAt: '2023-10-15T10:30:00Z',
    author: {
      name: 'John Doe',
      avatar: '/placeholder.svg?height=40&width=40',
    },
  },
  {
    id: '2',
    title: 'Global Markets React to Economic Policy Changes',
    category: 'BUSINESS',
    views: 892,
    readingTime: 6,
    status: 'published',
    createdAt: '2023-10-14T14:15:00Z',
    author: {
      name: 'Jane Smith',
      avatar: '/placeholder.svg?height=40&width=40',
    },
  },
];

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
            <AvatarImage src={author.avatar || '/placeholder.svg'} alt={author.name} />
            <AvatarFallback className='text-[10px] bg-red-100 text-red-500'>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className='text-xs'>{author.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'views',
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
      const views = row.getValue('views') as number;
      return (
        <div className='flex items-center gap-1 text-xs'>
          <Eye className='h-3 w-3 text-muted-foreground' />
          {views.toLocaleString()}
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
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge
          className={`text-[10px] ${
            status === 'published'
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : status === 'draft'
                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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

export function NewsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between py-3'>
        <div className='flex items-center gap-2'>
          <Input
            placeholder='tìm kiếm theo title...'
            value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
            className=' text-[14px] text-gray-700 outline-none px-[16px] py-[6px] rounded-[8px] '
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='h-8 text-xs'>
                <Filter className='mr-1.5 h-3 w-3' />
                Lọc
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='text-xs'>
              <DropdownMenuLabel className='text-xs'>Lọc theo trạng thái</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                className='text-xs'
                checked={table.getColumn('status')?.getFilterValue() === 'published'}
                onCheckedChange={() => {
                  table.getColumn('status')?.setFilterValue('published');
                }}
              >
                Published
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className='text-xs'
                checked={table.getColumn('status')?.getFilterValue() === 'draft'}
                onCheckedChange={() => {
                  table.getColumn('status')?.setFilterValue('draft');
                }}
              >
                Draft
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className='text-xs'
                checked={table.getColumn('status')?.getFilterValue() === 'archived'}
                onCheckedChange={() => {
                  table.getColumn('status')?.setFilterValue('archived');
                }}
              >
                Archived
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='text-xs'
                onClick={() => {
                  table.getColumn('status')?.setFilterValue(null);
                }}
              >
                Xóa bộ lọc
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='h-8 text-xs'>
                Cột <ChevronDown className='ml-1.5 h-3 w-3' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='text-xs'>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='text-xs capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='rounded-md border border-gray-200'>
        <div className='relative max-h-[500px] overflow-auto'>
          <Table>
            <TableHeader className='bg-gray-50/50'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className='border-gray-200 hover:bg-gray-50/80'>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className='text-xs font-medium text-gray-700 h-8'>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className='border-gray-200 hover:bg-gray-50/50 data-[state=selected]:bg-gray-50'
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className='py-2 text-xs'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center text-xs'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-between px-4 py-3 border-t w-full'>
          <div className='text-xs text-gray-500'>Hiển thị 1 đến 10 trong tổng số 100 bất động sản</div>
          <Pagination currentPage={1} totalPages={100} onPageChange={() => {}} className='mt-0' />
        </div>
      </div>
    </div>
  );
}
