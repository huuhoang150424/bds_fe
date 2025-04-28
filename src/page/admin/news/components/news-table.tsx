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
import { ChevronDown, Filter } from 'lucide-react';
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
import { columns } from './columns';
import { useGetAllNewsAdmin } from '../hooks/use-get-all-new';
import { Loading } from '@/components/common';

export function NewsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [page, setPage] = useState(1);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const { data: dataNew, isLoading } = useGetAllNewsAdmin(page, 10);


  const table = useReactTable({
    data: dataNew?.data?.data,
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
      {isLoading ? (
        <Loading className='mx-auto my-[200px] ' />
      ) : (
        <div className='rounded-md border border-gray-200'>
          <div className='relative max-h-[500px] overflow-auto'>
            <Table>
              <TableHeader className='bg-gray-50/50'>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className='border-gray-200 hover:bg-gray-50/80'>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className='text-xs font-medium text-gray-700 h-8'>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
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
            <Pagination
              currentPage={dataNew?.data?.meta?.currentPage}
              totalPages={dataNew?.data?.meta?.totalPages}
              onPageChange={handleChangePage}
              className='mt-0'
            />
          </div>
        </div>
      )}
    </div>
  );
}
