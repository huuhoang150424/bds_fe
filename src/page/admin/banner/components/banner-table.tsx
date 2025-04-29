import { useState } from 'react';
import {
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
import { ArrowUpDown, ChevronDown, Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
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
import { Pagination } from '@/components/user/pagination';
import { useGetAllBanners } from '../hooks/use-getbanners';
import {columns} from './columns';
import { Loading } from '@/components/common';



export function BannerTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [page, setPage] = useState(1);
  const limit = 10;

  const {data:allBanner, isLoading, error, refetch} = useGetAllBanners(page, limit);
  
  const isLoadingData = isLoading || !allBanner;
  const allBanners = allBanner?.data?.data || [];
  const totalItems = allBanner?.data?.totalItems || 0;
  const totalPages = allBanner?.data?.totalPages || 1;
  const currentPage = allBanner?.data?.currentPage || 1;

  const handleChangePage = (newPage: number) => {
    if (newPage === page) return; 
    setPage(newPage);
  };

  const safeData = isLoadingData ? [] : allBanners;

  const table = useReactTable({
    data: safeData,
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
                Trạng thái
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='text-xs'>
              <DropdownMenuLabel className='text-xs'>Lọc theo trạng thái</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                className='text-xs'
                checked={table.getColumn('isActive')?.getFilterValue() === 'true'}
                onCheckedChange={() => {
                  table.getColumn('isActive')?.setFilterValue('true');
                }}
              >
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className='text-xs'
                checked={table.getColumn('isActive')?.getFilterValue() === 'false'}
                onCheckedChange={() => {
                  table.getColumn('isActive')?.setFilterValue('false');
                }}
              >
                Inactive
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='text-xs'
                onClick={() => {
                  table.getColumn('isActive')?.setFilterValue(null);
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
        {isLoadingData ? (
          <Loading className='mt-[200px]'/>
        ) : error ? (
          <div className='h-64 flex items-center justify-center'>
            <div className='text-center text-red-500'>
              <div className='text-sm'>Error loading data. Please try again.</div>
              <Button 
                variant='outline' 
                size='sm' 
                className='mt-2 text-xs'
                onClick={() => refetch()}
              >
                Retry
              </Button>
            </div>
          </div>
        ) : (
          <>
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
              <div className='text-xs text-gray-500'>
                {allBanners.length > 0 
                  ? `Hiển thị ${(currentPage - 1) * limit + 1} đến ${Math.min(currentPage * limit, totalItems)} trong tổng số ${totalItems} banner` 
                  : 'Không có dữ liệu'}
              </div>
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handleChangePage} 
                className='mt-0'
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}