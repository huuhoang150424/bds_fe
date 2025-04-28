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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { columns, Gender, Roles, type User } from './colums';
import { Pagination } from '@/components/user/pagination';

export const userData: User[] = [
  {
    id: 'u001',
    fullname: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    emailVerified: true,
    isLock: false,
    phone: '0912345678',
    isProfessional: false,
    active: true,
    lastActive: '2023-10-15T10:30:00Z',
    address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
    gender: Gender.Male,
    dateOfBirth: '1990-05-15T00:00:00Z',
    avatar: '/placeholder.svg?height=40&width=40',
    coverPhoto: '/placeholder.svg?height=200&width=800',
    balance: 0,
    roles: Roles.User,
    score: 120,
    selfIntroduction: null,
    certificates: null,
    experienceYears: null,
    expertise: null,
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-10-15T10:30:00Z',
  },
  {
    id: 'u002',
    fullname: 'Trần Thị B',
    email: 'tranthib@example.com',
    emailVerified: true,
    isLock: false,
    phone: '0923456789',
    isProfessional: true,
    active: true,
    lastActive: '2023-10-14T14:15:00Z',
    address: '456 Đường Nguyễn Huệ, Quận 1, TP.HCM',
    gender: Gender.Female,
    dateOfBirth: '1988-08-20T00:00:00Z',
    avatar: '/placeholder.svg?height=40&width=40',
    coverPhoto: '/placeholder.svg?height=200&width=800',
    balance: 500000,
    roles: Roles.Agent,
    score: 450,
    selfIntroduction: 'Chuyên viên môi giới bất động sản với hơn 5 năm kinh nghiệm',
    certificates: 'Chứng chỉ môi giới bất động sản',
    experienceYears: '5',
    expertise: ['Căn hộ', 'Nhà phố', 'Biệt thự'],
    createdAt: '2023-02-10T09:45:00Z',
    updatedAt: '2023-10-14T14:15:00Z',
  },
];

export function UserTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<User[]>([...userData]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [lockDialogOpen, setLockDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDelete = async () => {};
  const handleToggleLock = async () => {};

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
            placeholder='Tìm kiếm theo tên...'
            value={(table.getColumn('fullname')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('fullname')?.setFilterValue(event.target.value)}
            className='max-w-sm outline-none px-[14px] py-[6px]  '
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='h-8 text-xs'>
                <Filter className='mr-1.5 h-3 w-3' />
                Vai trò
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='text-xs'>
              <DropdownMenuLabel className='text-xs'>Lọc theo vai trò</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Object.values(Roles).map((role) => (
                <DropdownMenuCheckboxItem
                  key={role}
                  className='text-xs'
                  checked={
                    table.getColumn('roles')?.getFilterValue() === role ||
                    (Array.isArray(table.getColumn('roles')?.getFilterValue()) &&
                      (table.getColumn('roles')?.getFilterValue() as string[])?.includes(role))
                  }
                  onCheckedChange={(checked) => {
                    const filterValues = (table.getColumn('roles')?.getFilterValue() as string[]) || [];
                    if (checked) {
                      table.getColumn('roles')?.setFilterValue([...filterValues, role]);
                    } else {
                      table.getColumn('roles')?.setFilterValue(filterValues.filter((val) => val !== role));
                    }
                  }}
                >
                  {role === Roles.Admin
                    ? 'Quản trị viên'
                    : role === Roles.Agent
                      ? 'Môi giới'
                      : role === Roles.Moderator
                        ? 'Điều hành viên'
                        : 'Người dùng'}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='text-xs'
                onClick={() => {
                  table.getColumn('roles')?.setFilterValue(null);
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
                      {column.id === 'fullname'
                        ? 'Họ tên'
                        : column.id === 'phone'
                          ? 'Số điện thoại'
                          : column.id === 'roles'
                            ? 'Vai trò'
                            : column.id === 'status'
                              ? 'Trạng thái'
                              : column.id === 'isProfessional'
                                ? 'Chuyên nghiệp'
                                : column.id === 'score'
                                  ? 'Điểm'
                                  : column.id === 'createdAt'
                                    ? 'Ngày tạo'
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
          <div className='text-xs text-gray-500'>Hiển thị 1 đến 10 trong tổng số 100 bài đăng hệ thống</div>
          <Pagination currentPage={1} totalPages={100} onPageChange={() => {}} className='mt-0' />
        </div>
      </div>
    </div>
  );
}
