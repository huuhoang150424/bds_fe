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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Filter, ExternalLink, Calendar, Eye, EyeOff } from 'lucide-react';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Pagination } from '@/components/user/pagination';

export type Banner = {
  banner_id: string;
  title: string;
  thumb_url: string;
  target_url: string;
  display_order: number;
  is_active: boolean;
  start_date: string;
  end_date: string;
  created_by: {
    user_id: number;
    name: string;
    avatar: string;
  };
  created_at: string;
  updated_at: string;
};

export const data: Banner[] = [
  {
    banner_id: 'b001',
    title: 'Summer Sale 2023',
    thumb_url:
      'https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2025/3/6/1-phu-long-17412487262271808788930-0-85-1010-1701-crop-17412487681591454151366.jpeg',
    target_url: 'https://example.com/summer-sale',
    display_order: 1,
    is_active: true,
    start_date: '2023-06-01T00:00:00Z',
    end_date: '2023-08-31T23:59:59Z',
    created_by: {
      user_id: 1,
      name: 'John Doe',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    created_at: '2023-05-15T10:30:00Z',
    updated_at: '2023-05-15T10:30:00Z',
  },
  {
    banner_id: 'b002',
    title: 'New Collection Launch',
    thumb_url:
      'https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2025/3/6/1-phu-long-17412487262271808788930-0-85-1010-1701-crop-17412487681591454151366.jpeg',
    target_url: 'https://example.com/new-collection',
    display_order: 2,
    is_active: true,
    start_date: '2023-07-15T00:00:00Z',
    end_date: '2023-09-15T23:59:59Z',
    created_by: {
      user_id: 2,
      name: 'Jane Smith',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    created_at: '2023-07-01T14:15:00Z',
    updated_at: '2023-07-02T09:20:00Z',
  },
];

export const columns: ColumnDef<Banner>[] = [
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
    accessorKey: 'display_order',
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
      const order = row.getValue('display_order') as number;
      return <div className='text-center font-medium text-xs'>{order}</div>;
    },
  },
  {
    accessorKey: 'thumb_url',
    header: 'Preview',
    cell: ({ row }) => {
      const thumb_url = row.getValue('thumb_url') as string;
      return (
        <div className='relative h-12 w-24 rounded-sm overflow-hidden border border-red-100'>
          <img src={thumb_url || '/placeholder.svg'} alt={row.getValue('title') as string} className='object-cover' />
        </div>
      );
    },
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
    accessorKey: 'target_url',
    header: 'Target URL',
    cell: ({ row }) => {
      const target_url = row.getValue('target_url') as string;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='flex items-center gap-1'>
                <div className='text-xs max-w-[120px] truncate'>{target_url}</div>
                <a
                  href={target_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-red-500 hover:text-red-600'
                >
                  <ExternalLink className='h-3 w-3' />
                </a>
              </div>
            </TooltipTrigger>
            <TooltipContent className='text-xs p-2 max-w-[300px] break-all'>{target_url}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    cell: ({ row }) => {
      const is_active = row.getValue('is_active') as boolean;
      return (
        <div className='flex items-center'>
          <Badge
            className={`text-[10px] ${
              is_active
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className='flex items-center gap-1'>
              {is_active ? <Eye className='h-2.5 w-2.5' /> : <EyeOff className='h-2.5 w-2.5' />}
              {is_active ? 'Active' : 'Inactive'}
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
    accessorKey: 'date_range',
    header: 'Display Period',
    cell: ({ row }) => {
      const start_date = new Date(row.original.start_date);
      const end_date = new Date(row.original.end_date);

      const now = new Date();
      let status = 'upcoming';
      if (now >= start_date && now <= end_date) {
        status = 'active';
      } else if (now > end_date) {
        status = 'expired';
      }

      return (
        <div className='text-xs'>
          <div className='flex items-center gap-1'>
            <Calendar className='h-3 w-3 text-muted-foreground' />
            <span>{format(start_date, 'MMM dd, yyyy')}</span>
          </div>
          <div className='flex items-center gap-1 mt-1'>
            <Calendar className='h-3 w-3 text-muted-foreground' />
            <span>{format(end_date, 'MMM dd, yyyy')}</span>
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
    accessorKey: 'created_by',
    header: 'Created By',
    cell: ({ row }) => {
      const creator = row.original.created_by;
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
    accessorKey: 'created_at',
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
      const date = new Date(row.getValue('created_at') as string);
      return <div className='text-xs'>{format(date, 'MMM dd, yyyy HH:mm')}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const banner = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-6 w-6 p-0 hover:bg-red-50'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-3 w-3' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='text-xs'>
            <DropdownMenuLabel className='text-xs'>Actions</DropdownMenuLabel>
            <DropdownMenuItem className='text-xs cursor-pointer'>Edit</DropdownMenuItem>
            <DropdownMenuItem className='text-xs cursor-pointer'>View</DropdownMenuItem>
            <DropdownMenuItem className='text-xs cursor-pointer'>
              {banner.is_active ? 'Deactivate' : 'Activate'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-xs cursor-pointer'>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-xs text-red-500 cursor-pointer'>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function BannerTable() {
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
            placeholder='Tìm kiếm theo title...'
            value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
            className='text-[14px] text-gray-700 outline-none px-[16px] py-[6px] rounded-[8px]  '
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='h-8 text-xs'>
                <Filter className='mr-1.5 h-3 w-3' />
                Trang thái
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='text-xs'>
              <DropdownMenuLabel className='text-xs'>Lọc theo trạng thái</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                className='text-xs'
                checked={table.getColumn('is_active')?.getFilterValue() === 'true'}
                onCheckedChange={() => {
                  table.getColumn('is_active')?.setFilterValue('true');
                }}
              >
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className='text-xs'
                checked={table.getColumn('is_active')?.getFilterValue() === 'false'}
                onCheckedChange={() => {
                  table.getColumn('is_active')?.setFilterValue('false');
                }}
              >
                Inactive
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='text-xs'
                onClick={() => {
                  table.getColumn('is_active')?.setFilterValue(null);
                }}
              >
                Clear filter
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
      <div className='rounded-md border border-red-100'>
        <div className='relative max-h-[500px] overflow-auto'>
          <Table>
            <TableHeader className='bg-red-50/50'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className='border-red-100 hover:bg-red-50/80'>
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
                    className='border-red-100 hover:bg-red-50/50 data-[state=selected]:bg-red-50'
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
