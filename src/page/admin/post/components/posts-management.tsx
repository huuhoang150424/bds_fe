import { useState, useEffect } from 'react';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { columns } from './columns';
import { Pagination } from '@/components/user/pagination';
import { useGetAllPost } from '../hooks/use-get-all-post';
import { useBulkAiApprovePosts } from '../hooks/use-approve-posts';
import { Loading } from '@/components/common';
import ConfirmBatchVerifyDialog from './bulk-approve';
import ConfirmBatchDeleteDialog from './confirm-batch-delete';
import ConfirmBatchRejectDialog from './reject-bulk-posts';
import { useAppContext } from '@/context/chat';

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
  const [showResultsDialog, setShowResultsDialog] = useState(false);
  const [approvalResults, setApprovalResults] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [processedPosts, setProcessedPosts] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [confirmVerifyDialogOpen, setConfirmVerifyDialogOpen] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [confirmRejectDialogOpen, setConfirmRejectDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { socket } = useAppContext();
  const { data: allPost, isLoading } = useGetAllPost(page, limit);
  const { mutate: aiApprovePosts, isPending: isAiApproving } = useBulkAiApprovePosts();

  const tableData = allPost?.data?.data || [];

  useEffect(() => {
    if (!socket) return;

    socket.on('approvalProgress', (data: { processed: number; total: number; progress: number }) => {
      setProcessedPosts(data.processed);
      setTotalPosts(data.total);
      setProgress(data.progress);
    });

    return () => {
      socket.off('approvalProgress');
    };
  }, [socket]);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const handleAiVerifyAll = () => {
    const hasUnverifiedPosts = tableData.some((post: any) => !post.verified && !post.isRejected);
    if (!hasUnverifiedPosts) {
      setErrorMessage('Không có bài đăng nào chưa duyệt để xử lý.');
      return;
    }
    setIsAiProcessing(true);
    setErrorMessage(null);
    setProgress(0);
    setProcessedPosts(0);
    setTotalPosts(0);
    aiApprovePosts(undefined, {
      onSuccess: (data) => {
        setApprovalResults(data.data);
        setShowResultsDialog(true);
        setIsAiProcessing(false);
        setProgress(100);
      },
      onError: (error: any) => {
        console.error('Lỗi khi duyệt bài đăng bằng AI:', error);
        setErrorMessage('Không thể duyệt bài đăng do lỗi API. Vui lòng thử lại sau hoặc kiểm tra giới hạn quota.');
        setIsAiProcessing(false);
        setProgress(0);
      },
    });
  };

  const handleBatchVerify = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const hasUnverified = selectedRows.some((row) => !row.original.verified && !row.original.isRejected);
    if (!hasUnverified) {
      setErrorMessage('Không có bài đăng chưa duyệt trong danh sách đã chọn.');
      return;
    }
    setConfirmVerifyDialogOpen(true);
  };

  const handleBatchReject = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const hasNonRejected = selectedRows.some((row) => !row.original.isRejected);
    if (!hasNonRejected) {
      setErrorMessage('Tất cả bài đăng đã chọn đã bị từ chối.');
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
    enableRowSelection: true,
  });

  const hasSelectedRows = table.getFilteredSelectedRowModel()?.rows?.length > 0;
  const selectedRowCount = table.getFilteredSelectedRowModel()?.rows?.length || 0;
  const selectedPostIds = Object.keys(rowSelection).map((index) => tableData[Number(index)].id);
  const hasUnverifiedPosts = tableData.some((p: any) => !p.verified && !p.isRejected);

  return (
    <div className="space-y-4">
      {errorMessage && (
        <Alert variant="destructive">
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <Card>
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
                disabled={isAiApproving || !hasUnverifiedPosts}
                className="relative overflow-hidden group bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
              >
                {isAiApproving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                    <span>Duyệt tự động bằng AI (tối đa 5 bài)</span>
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
                className="max-w-sm outline-none px-[14px] py-[8px]"
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
                    checked={(table.getColumn('status')?.getFilterValue() as string[])?.includes(StatusPost.NEGOTIATING)}
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
                    .map((column) => (
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
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

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
                  disabled={isLoading || !table.getFilteredSelectedRowModel().rows.some((row) => !row.original.verified && !row.original.isRejected)}
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
            <Loading className="mt-[200px]" />
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead className="text-[13px]" key={header.id}>
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
                      <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell className="text-[13px]" key={cell.id}>
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

      <Dialog open={showResultsDialog} onOpenChange={setShowResultsDialog}>
        <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Kết quả duyệt tự động bằng AI
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              Kết quả xử lý tối đa 5 bài đăng bất động sản bằng hệ thống AI.
            </DialogDescription>
          </DialogHeader>
          {approvalResults ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-inner">
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Tổng số bài đăng:</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{approvalResults.totalCount}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Tỷ lệ duyệt:</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{approvalResults.approvalRate}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Bài đăng được duyệt:</p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">{approvalResults.approvedCount}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Bài đăng bị từ chối:</p>
                  <p className="text-lg font-bold text-red-600 dark:text-red-400">{approvalResults.rejectedCount}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Chi tiết kết quả:</p>
                <div className="max-h-[250px] overflow-y-auto border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-100 dark:bg-gray-700">
                        <TableHead className="text-gray-800 dark:text-gray-200 font-semibold w-[150px]">
                          ID bài đăng
                        </TableHead>
                        <TableHead className="text-gray-800 dark:text-gray-200 font-semibold w-[100px]">
                          Trạng thái
                        </TableHead>
                        <TableHead className="text-gray-800 dark:text-gray-200 font-semibold">Lý do</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvalResults.details.map((result: any) => (
                        <TableRow
                          key={result.postId}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                            {result.postId}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${
                                result.approved
                                  ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                  : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                              } font-semibold`}
                            >
                              {result.approved ? 'Được duyệt' : 'Bị từ chối'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-700 dark:text-gray-300">
                            {result.reason || '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => setShowResultsDialog(false)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  Đóng
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">Không có kết quả để hiển thị.</p>
          )}
        </DialogContent>
      </Dialog>

      {isAiProcessing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999999] flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-2xl max-w-md w-full mx-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse">
                    AI
                  </div>
                  <div className="absolute -inset-1 blur-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
                Đang xử lý duyệt tự động
              </h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                <span>Đã xử lý: {processedPosts}/{totalPosts} bài</span>
                <span>{progress.toFixed(0)}%</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Kiểm tra thông tin bài đăng</span>
                </div>
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 mr-2 rounded-full bg-purple-500 animate-pulse"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Xác minh dữ liệu</span>
                </div>
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 mr-2 rounded-full bg-pink-500 animate-pulse"
                    style={{ animationDelay: '0.4s' }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Áp dụng quy tắc duyệt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}