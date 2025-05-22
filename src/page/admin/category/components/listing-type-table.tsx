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
import { ListingTypeCreateDialog } from './listing-type-create';
import { ListingTypes, columns } from './column';
import { useGetListType } from '@/page/agent/post/hooks/use-get-list-type';
import { Loading } from '@/components/common';


export function ListingTypeTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const {data:allListingType, isLoading} = useGetListType();
  const tableData = allListingType || [];
  

  const table = useReactTable({
    data: tableData,
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
            placeholder='Tìm kiếm theo slug...'
            value={(table.getColumn('slug')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('slug')?.setFilterValue(event.target.value)}
            className='max-w-sm h-8 text-xs outline-none px-[12px] py-[8px] '
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='h-8 text-xs'>
                <Filter className='mr-1.5 h-3 w-3' />
                Loại
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='text-xs'>
              <DropdownMenuLabel className='text-xs'>Lọc theo loại</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Object.values(ListingTypes).map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  className='text-xs'
                  checked={
                    table.getColumn('listingType')?.getFilterValue() === type ||
                    (Array.isArray(table.getColumn('listingType')?.getFilterValue()) &&
                      (table.getColumn('listingType')?.getFilterValue() as string[])?.includes(type))
                  }
                  onCheckedChange={(checked) => {
                    const filterValues = (table.getColumn('listingType')?.getFilterValue() as string[]) || [];
                    if (checked) {
                      table.getColumn('listingType')?.setFilterValue([...filterValues, type]);
                    } else {
                      table.getColumn('listingType')?.setFilterValue(filterValues.filter((val) => val !== type));
                    }
                  }}
                >
                  {type}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='text-xs'
                onClick={() => {
                  table.getColumn('listingType')?.setFilterValue(null);
                }}
              >
                Xóa bộ lọc
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex items-center gap-2'>
          <ListingTypeCreateDialog />

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
                      {column.id === 'listingType'
                        ? 'Loại danh sách'
                        : column.id === 'slug'
                          ? 'Slug'
                          : column.id === 'propertyCount'
                            ? 'Số lượng BĐS'
                            : column.id === 'createdAt'
                              ? 'Ngày tạo'
                              : column.id === 'updatedAt'
                                ? 'Cập nhật'
                                : column.id === 'actions'
                                  ? 'Hành động'
                                  : column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='rounded-md border border-red-100'>
        {isLoading ? (
          <Loading className='mt-[200px] '/>
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
                        Không có dữ liệu.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className='flex items-center justify-between px-4 py-3 border-t w-full'>
              <div className='text-xs text-gray-500'>Hiển thị danh mục hệ thống</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}