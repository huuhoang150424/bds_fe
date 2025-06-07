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
import { columns } from './columns';
import { Pagination } from '@/components/user/pagination';
import { useGetPurchasedPackages } from '../hooks/use-get-my-pricing';
import { Loading } from '@/components/common';

export function DataTable() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, error } = useGetPurchasedPackages(page, limit);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  console.log('data ',data)
  const tableData = data?.data?.data || [];
  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || 1;

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

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  if (error) {
    return <div className="text-center text-red-500">Lỗi khi tải dữ liệu: {(error as Error).message}</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Lọc theo gói VIP..."
            value={(table.getColumn('pricingName')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('pricingName')?.setFilterValue(event.target.value)}
            className="text-[14px] text-gray-700 outline-none px-[16px] py-[6px] rounded-[8px]"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <Filter className="mr-1.5 h-3 w-3" />
                Lọc
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs">
              <DropdownMenuLabel className="text-xs">Lọc theo trạng thái</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                className="text-xs"
                checked={(table.getColumn('status')?.getFilterValue() as string) === 'completed'}
                onCheckedChange={() => {
                  table.getColumn('status')?.setFilterValue('completed');
                }}
              >
                Hoàn thành
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="text-xs"
                checked={(table.getColumn('status')?.getFilterValue() as string) === 'pending'}
                onCheckedChange={() => {
                  table.getColumn('status')?.setFilterValue('pending');
                }}
              >
                Đang xử lý
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="text-xs"
                checked={(table.getColumn('status')?.getFilterValue() as string) === 'expired'}
                onCheckedChange={() => {
                  table.getColumn('status')?.setFilterValue('expired');
                }}
              >
                Hết hạn
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-xs"
                onClick={() => {
                  table.getColumn('status')?.setFilterValue(null);
                }}
              >
                Xóa bộ lọc
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                Cột <ChevronDown className="ml-1.5 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="text-xs capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {isLoading ? (
        <Loading className="my-[200px] " />
      ) : (
        <div className="rounded-md border border-gray-200">
          <div className="relative max-h-[500px] overflow-auto">
            <Table className="text-xs">
              <TableHeader className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-gray-100 hover:bg-gray-50/80">
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-xs font-medium text-gray-700 h-8">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className="border-gray-100 hover:bg-gray-50/50 data-[state=selected]:bg-gray-50"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-2 text-xs">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center text-xs">
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-t w-full">
            <div className="text-xs text-gray-500">
              Hiển thị {(currentPage - 1) * limit + 1} đến{' '}
              {Math.min(currentPage * limit, totalItems)} trong tổng số {totalItems} gói VIP
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handleChangePage}
              className="mt-0"
            />
          </div>
        </div>
      )}
    </div>
  );
}