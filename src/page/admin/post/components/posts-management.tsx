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
import { Loader2, Shield, Trash2, Sparkles, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { columns } from './columns';
import { Pagination } from '@/components/user/pagination';
import { useGetAllPost } from '../hooks/use-get-all-post';
import { Loading } from '@/components/common';
import ConfirmBatchVerifyDialog from './bulk-approve';
import ConfirmBatchDeleteDialog from './confirm-batch-delete';
import ConfirmBatchRejectDialog from './reject-bulk-posts';

enum StatusPost {
  AVAILABLE = 'Còn trống',
  NEGOTIATING = 'Đang đám phán',
  DELIVERED = 'Đã bàn giao',
}

export function PostsManagement() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [confirmVerifyDialogOpen, setConfirmVerifyDialogOpen] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);

  const [confirmRejectDialogOpen, setConfirmRejectDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const { data: allPost, isLoading } = useGetAllPost(page, limit);

  const tableData = allPost?.data?.data || [];

  console.log(tableData)

  const handleAiVerifyAll = () => {
    // TODO: Triển khai AI duyệt tự động sau
    setIsAiProcessing(true);
    setAiProgress(0);
    // Giả lập progress
    const interval = setInterval(() => {
      setAiProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAiProcessing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleBatchVerify = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const hasUnverified = selectedRows.some((row) => !row.original.verified);
    if (!hasUnverified) {
      return;
    }
    setConfirmVerifyDialogOpen(true);
  };
  const handleBatchReject = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const hasNonRejected = selectedRows.some((row) => !row.original.isRejected);
    if (!hasNonRejected) {
      return;
    }
    setConfirmRejectDialogOpen(true);
  };
  const handleBatchDelete = () => {
    setConfirmDeleteDialogOpen(true);
  };

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
    // Bỏ giới hạn, cho phép chọn tất cả bài đăng
    enableRowSelection: true,
  });

  const hasSelectedRows = table.getFilteredSelectedRowModel()?.rows?.length > 0;
  const selectedRowCount = table.getFilteredSelectedRowModel()?.rows?.length || 0;
  const selectedPostIds = Object.keys(rowSelection).map((index) => tableData[Number(index)].id);
  const hasUnverifiedPosts = tableData.filter((p: any) => !p.verified)?.length > 0;

  return (
    <div className="space-y-4">
      <Card className="">
        <CardHeader className="p-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Danh sách bài đăng</CardTitle>
              <CardDescription>Quản lý và duyệt các bài đăng bất động sản</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant={'outline'}
                onClick={handleAiVerifyAll}
                disabled={isAiProcessing || !hasUnverifiedPosts}
                className="relative overflow-hidden group bg-red-500 hover:bg-red-600 text-white"
              >
                {isAiProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                    <span>Duyệt tự động bằng AI</span>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
            <div className="flex-1">
              <Input
                placeholder="Tìm kiếm theo tiêu đề..."
                value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
                className="max-w-sm outline-none px-[14px] py-[8px] "
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Trạng thái <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem
                    checked={
                      table.getColumn('status')?.getFilterValue() === undefined ||
                      (table.getColumn('status')?.getFilterValue() as string[])?.includes(StatusPost.AVAILABLE)
                    }
                    onCheckedChange={(checked) => {
                      const filterValues = (table.getColumn('status')?.getFilterValue() as string[]) || [];
                      if (checked) {
                        table.getColumn('status')?.setFilterValue([...filterValues, StatusPost.AVAILABLE]);
                      } else {
                        table
                          .getColumn('status')
                          ?.setFilterValue(filterValues.filter((value) => value !== StatusPost.AVAILABLE));
                      }
                    }}
                  >
                    Còn trống
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={(table.getColumn('status')?.getFilterValue() as string[])?.includes(
                      StatusPost.NEGOTIATING
                    )}
                    onCheckedChange={(checked) => {
                      const filterValues = (table.getColumn('status')?.getFilterValue() as string[]) || [];
                      if (checked) {
                        table.getColumn('status')?.setFilterValue([...filterValues, StatusPost.NEGOTIATING]);
                      } else {
                        table
                          .getColumn('status')
                          ?.setFilterValue(filterValues.filter((value) => value !== StatusPost.NEGOTIATING));
                      }
                    }}
                  >
                    Đang đàm phán
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={(table.getColumn('status')?.getFilterValue() as string[])?.includes(StatusPost.DELIVERED)}
                    onCheckedChange={(checked) => {
                      const filterValues = (table.getColumn('status')?.getFilterValue() as string[]) || [];
                      if (checked) {
                        table.getColumn('status')?.setFilterValue([...filterValues, StatusPost.DELIVERED]);
                      } else {
                        table
                          .getColumn('status')
                          ?.setFilterValue(filterValues.filter((value) => value !== StatusPost.DELIVERED));
                      }
                    }}
                  >
                    Đã bàn giao
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Xác minh <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem
                    checked={
                      table.getColumn('verified')?.getFilterValue() === undefined ||
                      (table.getColumn('verified')?.getFilterValue() as string[])?.includes('true')
                    }
                    onCheckedChange={(checked) => {
                      const filterValues = (table.getColumn('verified')?.getFilterValue() as string[]) || [];
                      if (checked) {
                        table.getColumn('verified')?.setFilterValue([...filterValues, 'true']);
                      } else {
                        table.getColumn('verified')?.setFilterValue(filterValues.filter((value) => value !== 'true'));
                      }
                    }}
                  >
                    Đã xác minh
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={(table.getColumn('verified')?.getFilterValue() as string[])?.includes('false')}
                    onCheckedChange={(checked) => {
                      const filterValues = (table.getColumn('verified')?.getFilterValue() as string[]) || [];
                      if (checked) {
                        table.getColumn('verified')?.setFilterValue([...filterValues, 'false']);
                      } else {
                        table.getColumn('verified')?.setFilterValue(filterValues.filter((value) => value !== 'false'));
                      }
                    }}
                  >
                    Chưa xác minh
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={(table.getColumn('verified')?.getFilterValue() as string[])?.includes('rejected')}
                    onCheckedChange={(checked) => {
                      const filterValues = (table.getColumn('verified')?.getFilterValue() as string[]) || [];
                      if (checked) {
                        table.getColumn('verified')?.setFilterValue([...filterValues, 'rejected']);
                      } else {
                        table.getColumn('verified')?.setFilterValue(filterValues.filter((value) => value !== 'rejected'));
                      }
                    }}
                  >
                    Đã bị từ chối
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Cột <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => column.toggleVisibility(!!value)}
                        >
                          {column.id === 'title'
                            ? 'Tiêu đề'
                            : column.id === 'price'
                            ? 'Giá'
                            : column.id === 'squareMeters'
                            ? 'Diện tích'
                            : column.id === 'status'
                            ? 'Trạng thái'
                            : column.id === 'verified'
                            ? 'Xác minh'
                            : column.id === 'createdAt'
                            ? 'Ngày tạo'
                            : column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Batch actions */}
          {hasSelectedRows && (
            <div className="bg-slate-100 p-4 rounded-md flex items-center justify-between mb-4">
              <div>
                <span className="font-medium">{selectedRowCount} bài đăng được chọn</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBatchVerify}
                  disabled={isLoading || !table.getFilteredSelectedRowModel().rows.some((row) => !row.original.verified)}
                >
                  <Shield className="mr-2 h-4 w-4" /> Duyệt đã chọn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBatchReject}
                  disabled={isLoading || !table.getFilteredSelectedRowModel().rows.some((row) => !row.original.isRejected)}
                >
                  <X className="mr-2 h-4 w-4" /> Từ chối đã chọn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600"
                  onClick={handleBatchDelete}
                  disabled={isLoading}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Xóa đã chọn
                </Button>
              </div>
            </div>
          )}
          {isLoading ? (
            <Loading className="mt-[200px] " />
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead className="text-[13px] " key={header.id}>
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
                      <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell className="text-[13px] " key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns?.length} className="h-24 text-center">
                        Không tìm thấy bài đăng nào
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between px-4 py-3 border-t w-full">
                <div className="text-xs text-gray-500">
                  Hiển thị {allPost?.data?.data?.length ? '1' : '0'} đến{' '}
                  {allPost?.data?.data?.length || 0} trong tổng số {allPost?.data?.totalDocs || 0} bài đăng hệ thống
                </div>
                <Pagination
                  currentPage={allPost?.data?.currentPage || 1}
                  totalPages={allPost?.data?.totalPages || 1}
                  onPageChange={handleChangePage}
                  className="mt-0"
                />
              </div>
            </div>
          )}
          <ConfirmBatchVerifyDialog
            open={confirmVerifyDialogOpen}
            setOpen={setConfirmVerifyDialogOpen}
            totalPosts={selectedRowCount}
            postIds={selectedPostIds}
            resetSelection={() => setRowSelection({})}
          />
          <ConfirmBatchDeleteDialog
            open={confirmDeleteDialogOpen}
            setOpen={setConfirmDeleteDialogOpen}
            totalPosts={selectedRowCount}
            postIds={selectedPostIds}
            resetSelection={() => setRowSelection({})}
          />
          <ConfirmBatchRejectDialog
            open={confirmRejectDialogOpen}
            setOpen={setConfirmRejectDialogOpen}
            totalPosts={selectedRowCount}
            postIds={selectedPostIds}
            resetSelection={() => setRowSelection({})}
          />
        </CardContent>
      </Card>

      {isAiProcessing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999999] flex items-center justify-center">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-xl max-w-md w-full mx-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse">
                    AI
                  </div>
                  <div className="absolute -inset-1 blur-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Đang xử lý duyệt tự động</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                <div
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${aiProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Đang phân tích dữ liệu</span>
                <span>{aiProgress}%</span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-sm">Kiểm tra thông tin bài đăng</span>
                </div>
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 mr-2 rounded-full bg-purple-500 animate-pulse"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <span className="text-sm">Xác minh dữ liệu</span>
                </div>
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 mr-2 rounded-full bg-pink-500 animate-pulse"
                    style={{ animationDelay: '0.4s' }}
                  />
                  <span className="text-sm">Áp dụng quy tắc duyệt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}