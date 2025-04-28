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
import { Loader2, Shield, Trash2, Sparkles, ChevronDown } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { columns } from './columns';
import { Pagination } from '@/components/user/pagination';
// Enums from the model

enum Directions {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST',
  NORTHEAST = 'NORTHEAST',
  NORTHWEST = 'NORTHWEST',
  SOUTHEAST = 'SOUTHEAST',
  SOUTHWEST = 'SOUTHWEST',
}

enum PriceUnit {
  VND = 'VND',
  USD = 'USD',
}

enum StatusPost {
  AVAILABLE = 'Còn trống',
  NEGOTIATING = 'Đang đám phán',
  DELIVERED = 'Đã bàn giao',
}

// Define the Post type
type Post = {
  id: string;
  userId: string;
  title: string;
  priceUnit: string;
  address: string;
  price: number;
  squareMeters: number;
  description: string;
  floor: number;
  bedroom: number;
  bathroom: number;
  priority: number;
  isFurniture: boolean;
  direction: string;
  verified: boolean;
  expiredDate: Date;
  status: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
};

// Mock data for posts
const generateMockPosts = (count = 20) => {
  const posts = [];
  const statuses = Object.values(StatusPost);
  const directions = Object.values(Directions);
  const priceUnits = Object.values(PriceUnit);

  for (let i = 1; i <= count; i++) {
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30));

    const expiredDate = new Date();
    expiredDate.setDate(expiredDate.getDate() + Math.floor(Math.random() * 90) + 30);

    posts.push({
      id: `post-${i}`,
      userId: `user-${Math.floor(Math.random() * 10) + 1}`,
      title: `Căn hộ ${i} phòng ngủ tại Quận ${Math.floor(Math.random() * 12) + 1}, TP.HCM`,
      priceUnit: priceUnits[Math.floor(Math.random() * priceUnits.length)],
      address: `${Math.floor(Math.random() * 100) + 1} Đường ABC, Phường XYZ, Quận ${Math.floor(Math.random() * 12) + 1}, TP.HCM`,
      price: Math.floor(Math.random() * 10000) + 1000,
      squareMeters: Math.floor(Math.random() * 100) + 30,
      description: `Mô tả chi tiết về căn hộ ${i} phòng ngủ...`,
      floor: Math.floor(Math.random() * 20) + 1,
      bedroom: Math.floor(Math.random() * 4) + 1,
      bathroom: Math.floor(Math.random() * 3) + 1,
      priority: Math.floor(Math.random() * 5),
      isFurniture: Math.random() > 0.5,
      direction: directions[Math.floor(Math.random() * directions.length)],
      verified: Math.random() > 0.7,
      expiredDate,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      slug: `can-ho-${i}-phong-ngu-quan-${Math.floor(Math.random() * 12) + 1}`,
      createdAt,
      updatedAt: new Date(),
      user: {
        id: `user-${Math.floor(Math.random() * 10) + 1}`,
        fullName: `Người dùng ${Math.floor(Math.random() * 10) + 1}`,
        email: `user${Math.floor(Math.random() * 10) + 1}@example.com`,
      },
    });
  }

  return posts;
};

const mockPosts = generateMockPosts(50);

export function PostsManagement() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const handleVerifyPost = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, verified: true };
        }
        return post;
      }),
    );
  };
  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };
  const handleAiVerifyAll = () => {
    setIsAiProcessing(true);
    setAiProgress(0);

    const interval = setInterval(() => {
      setAiProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    setTimeout(() => {
      setPosts(
        posts.map((post) => {
          if (!post.verified) {
            return { ...post, verified: true };
          }
          return post;
        }),
      );
      clearInterval(interval);
      setAiProgress(100);
      setTimeout(() => {
        setIsAiProcessing(false);
      }, 500);
    }, 2500);
  };
  const handleBatchVerify = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedIds = selectedRows.map((row) => row.original.id);

    setPosts(
      posts.map((post) => {
        if (selectedIds.includes(post.id) && !post.verified) {
          return { ...post, verified: true };
        }
        return post;
      }),
    );

    setRowSelection({});
  };

  const handleBatchDelete = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedIds = selectedRows.map((row) => row.original.id);

    setPosts(posts.filter((post) => !selectedIds.includes(post.id)));

    setRowSelection({});
  };

  const table = useReactTable({
    data: posts,
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
    <div className='space-y-4'>
      <Card className=''>
        <CardHeader className='p-0'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <CardTitle>Danh sách bài đăng</CardTitle>
              <CardDescription>Quản lý và duyệt các bài đăng bất động sản</CardDescription>
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
              <Button
                variant={'outline'}
                onClick={handleAiVerifyAll}
                disabled={isAiProcessing || posts.filter((p) => !p.verified).length === 0}
                className='relative overflow-hidden group bg-red-500 hover:bg-red-600 text-white '
              >
                {isAiProcessing ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Sparkles className='mr-2 h-4 w-4 group-hover:animate-pulse' />
                    <span>Duyệt tự động bằng AI</span>
                    <span className='absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer' />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='flex flex-col md:flex-row justify-between items-center py-4 gap-4'>
            <div className='flex-1'>
              <Input
                placeholder='Tìm kiếm theo tiêu đề...'
                value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
                className='max-w-sm outline-none px-[14px] py-[8px] '
              />
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='ml-auto'>
                    Trạng thái <ChevronDown className='ml-2 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
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
                      StatusPost.NEGOTIATING,
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
                  <Button variant='outline' className='ml-auto'>
                    Xác minh <ChevronDown className='ml-2 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
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
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline'>
                    Cột <ChevronDown className='ml-2 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className='capitalize'
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
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <div className='bg-slate-100 p-4 rounded-md flex items-center justify-between mb-4'>
              <div>
                <span className='font-medium'>
                  {table.getFilteredSelectedRowModel().rows.length} bài đăng được chọn
                </span>
              </div>
              <div className='flex gap-2'>
                <Button variant='outline' size='sm' onClick={handleBatchVerify}>
                  <Shield className='mr-2 h-4 w-4' /> Duyệt đã chọn
                </Button>
                <Button variant='outline' size='sm' className='text-red-600' onClick={handleBatchDelete}>
                  <Trash2 className='mr-2 h-4 w-4' /> Xóa đã chọn
                </Button>
              </div>
            </div>
          )}

          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead className='text-[13px] ' key={header.id}>
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
                        <TableCell className='text-[13px] ' key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className='h-24 text-center'>
                      Không tìm thấy bài đăng nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className='flex items-center justify-between px-4 py-3 border-t w-full'>
              <div className='text-xs text-gray-500'>Hiển thị 1 đến 10 trong tổng số 100 bài đăng hệ thống</div>
              <Pagination currentPage={1} totalPages={100} onPageChange={() => {}} className='mt-0' />
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog open={!!selectedPostId} onOpenChange={(open) => !open && setSelectedPostId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa bài đăng</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa bài đăng này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Hủy</Button>
            </DialogClose>
            <Button
              variant='destructive'
              onClick={() => {
                if (selectedPostId) {
                  handleDeletePost(selectedPostId);
                  setSelectedPostId(null);
                }
              }}
            >
              Xóa bài đăng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {isAiProcessing && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-[999999] flex items-center justify-center'>
          <div className='bg-white dark:bg-slate-900 rounded-lg p-6 shadow-xl max-w-md w-full mx-4 relative overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse' />

            <div className='relative z-10'>
              <div className='flex justify-center mb-4'>
                <div className='relative'>
                  <div className='text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse'>
                    AI
                  </div>
                  <div className='absolute -inset-1 blur-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 animate-pulse' />
                </div>
              </div>

              <h3 className='text-xl font-semibold text-center mb-4'>Đang xử lý duyệt tự động</h3>

              <div className='w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700'>
                <div
                  className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-300 ease-out'
                  style={{ width: `${aiProgress}%` }}
                />
              </div>

              <div className='flex justify-between text-sm text-gray-500'>
                <span>Đang phân tích dữ liệu</span>
                <span>{aiProgress}%</span>
              </div>

              <div className='mt-4 space-y-2'>
                <div className='flex items-center'>
                  <div className='w-4 h-4 mr-2 rounded-full bg-blue-500 animate-pulse' />
                  <span className='text-sm'>Kiểm tra thông tin bài đăng</span>
                </div>
                <div className='flex items-center'>
                  <div
                    className='w-4 h-4 mr-2 rounded-full bg-purple-500 animate-pulse'
                    style={{ animationDelay: '0.2s' }}
                  />
                  <span className='text-sm'>Xác minh dữ liệu</span>
                </div>
                <div className='flex items-center'>
                  <div
                    className='w-4 h-4 mr-2 rounded-full bg-pink-500 animate-pulse'
                    style={{ animationDelay: '0.4s' }}
                  />
                  <span className='text-sm'>Áp dụng quy tắc duyệt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
