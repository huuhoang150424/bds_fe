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
import { ArrowUpDown, ChevronDown, Filter, Trash2, Lock, Unlock, Eye, UserCog } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

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

export enum Roles {
  Admin = 'ADMIN',
  User = 'USER',
  Agent = 'AGENT',
  Moderator = 'MODERATOR',
}

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
}

export type User = {
  id: string;
  fullname: string;
  email: string;
  emailVerified: boolean;
  isLock: boolean;
  phone: string | null;
  isProfessional: boolean;
  active: boolean;
  lastActive: string | null;
  address: string | null;
  gender: Gender;
  dateOfBirth: string | null;
  avatar: string;
  coverPhoto: string;
  balance: number;
  roles: Roles;
  score: number;
  selfIntroduction: string | null;
  certificates: string | null;
  experienceYears: string | null;
  expertise: string[] | null;
  createdAt: string;
  updatedAt: string;
};

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
  }
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

  const handleDelete = async () => {
    if (!selectedUser) return;

    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setData((prev) => prev.filter((user) => user.id !== selectedUser.id));

      setDeleteDialogOpen(false);
    } catch (error) {
    } finally {
      setIsProcessing(false);
    }
  };
  const handleToggleLock = async () => {
    if (!selectedUser) return;

    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setData((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id ? { ...user, isLock: !user.isLock, active: user.isLock } : user,
        ),
      );

      setLockDialogOpen(false);
    } catch (error) {
    } finally {
      setIsProcessing(false);
    }
  };
  const columns: ColumnDef<User>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Chọn tất cả'
          className='h-3 w-3 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Chọn hàng'
          className='h-3 w-3 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'fullname',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Họ tên
            <ArrowUpDown className='ml-1 h-3 w-3' />
          </Button>
        );
      },
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className='flex items-center gap-2'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src={user.avatar || '/placeholder.svg'} alt={user.fullname} />
              <AvatarFallback className='text-[10px] bg-red-100 text-red-500'>{user.fullname.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className='font-medium text-xs'>{user.fullname}</div>
              <div className='text-[10px] text-muted-foreground'>{user.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'phone',
      header: 'Số điện thoại',
      cell: ({ row }) => {
        const phone = row.getValue('phone') as string | null;
        return <div className='text-xs'>{phone || 'Chưa cung cấp'}</div>;
      },
    },
    {
      accessorKey: 'roles',
      header: 'Vai trò',
      cell: ({ row }) => {
        const role = row.getValue('roles') as Roles;
        return (
          <Badge
            className={`text-[10px] font-medium ${
              role === Roles.Admin
                ? 'bg-purple-100 text-purple-700'
                : role === Roles.Agent
                  ? 'bg-blue-100 text-blue-700'
                  : role === Roles.Moderator
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
            }`}
          >
            {role === Roles.Admin
              ? 'Quản trị viên'
              : role === Roles.Agent
                ? 'Môi giới'
                : role === Roles.Moderator
                  ? 'Điều hành viên'
                  : 'Người dùng'}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => {
        const isLock = row.original.isLock;
        const active = row.original.active;
        return (
          <div className='flex flex-col gap-1'>
            <Badge className={`text-[10px] ${isLock ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {isLock ? 'Đã khóa' : 'Hoạt động'}
            </Badge>
            {!isLock && (
              <Badge
                className={`text-[10px] ${active ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}
              >
                {active ? 'Đang hoạt động' : 'Không hoạt động'}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'isProfessional',
      header: 'Chuyên nghiệp',
      cell: ({ row }) => {
        const isProfessional = row.getValue('isProfessional') as boolean;
        return (
          <Badge
            className={`text-[10px] ${isProfessional ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
          >
            {isProfessional ? 'Chuyên nghiệp' : 'Thường'}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(String(row.getValue(id)));
      },
    },
    {
      accessorKey: 'score',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Điểm
            <ArrowUpDown className='ml-1 h-3 w-3' />
          </Button>
        );
      },
      cell: ({ row }) => {
        const score = row.getValue('score') as number;
        return <div className='text-xs font-medium'>{score}</div>;
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
            Ngày tạo
            <ArrowUpDown className='ml-1 h-3 w-3' />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt') as string);
        return <div className='text-xs'>{format(date, 'dd/MM/yyyy', { locale: vi })}</div>;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className='flex items-center gap-1'>
            <Button variant='ghost' size='icon' className='h-6 w-6 p-0 hover:bg-red-50 hover:text-blue-500' title='Xem'>
              <Eye className='h-3 w-3' />
              <span className='sr-only'>Xem</span>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='h-6 w-6 p-0 hover:bg-red-50 hover:text-green-500'
              title='Chỉnh sửa'
            >
              <UserCog className='h-3 w-3' />
              <span className='sr-only'>Chỉnh sửa</span>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='h-6 w-6 p-0 hover:bg-red-50 hover:text-amber-500'
              onClick={() => {
                setSelectedUser(user);
                setLockDialogOpen(true);
              }}
              title={user.isLock ? 'Mở khóa' : 'Khóa'}
            >
              {user.isLock ? <Unlock className='h-3 w-3' /> : <Lock className='h-3 w-3' />}
              <span className='sr-only'>{user.isLock ? 'Mở khóa' : 'Khóa'}</span>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='h-6 w-6 p-0 hover:bg-red-50 hover:text-red-500'
              onClick={() => {
                setSelectedUser(user);
                setDeleteDialogOpen(true);
              }}
              title='Xóa'
            >
              <Trash2 className='h-3 w-3' />
              <span className='sr-only'>Xóa</span>
            </Button>
          </div>
        );
      },
    },
  ];

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
            className='max-w-sm h-8 text-xs'
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
      </div>
      <div className='flex items-center justify-between space-x-2 py-3'>
        <div className='flex-1 text-xs text-muted-foreground'>
          Đã chọn {table.getFilteredSelectedRowModel().rows.length} / {table.getFilteredRowModel().rows.length} dòng.
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className='h-7 text-xs'
          >
            Trước
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className='h-7 text-xs'
          >
            Sau
          </Button>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className='border-red-100'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-base text-red-500'>Xóa người dùng</AlertDialogTitle>
            <AlertDialogDescription className='text-xs'>
              Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {selectedUser && (
            <div className='my-2 rounded-md bg-red-50 p-3 border border-red-100'>
              <h4 className='text-xs font-medium text-red-800 mb-1'>Bạn sắp xóa:</h4>
              <div className='flex items-center gap-2'>
                <Avatar className='h-6 w-6'>
                  <AvatarImage src={selectedUser.avatar || '/placeholder.svg'} alt={selectedUser.fullname} />
                  <AvatarFallback className='text-[10px] bg-red-100 text-red-500'>
                    {selectedUser.fullname.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className='text-xs text-red-700 font-medium'>{selectedUser.fullname}</p>
                  <p className='text-[10px] text-red-600'>{selectedUser.email}</p>
                </div>
              </div>
              <p className='text-[10px] text-red-600 mt-1'>ID: {selectedUser.id}</p>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel className='h-8 text-xs'>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className='h-8 text-xs bg-red-500 hover:bg-red-600 text-white'
              onClick={handleDelete}
              disabled={isProcessing}
            >
              {isProcessing ? 'Đang xóa...' : 'Xóa'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={lockDialogOpen} onOpenChange={setLockDialogOpen}>
        <AlertDialogContent className='border-red-100'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-base text-red-500'>
              {selectedUser?.isLock ? 'Mở khóa người dùng' : 'Khóa người dùng'}
            </AlertDialogTitle>
            <AlertDialogDescription className='text-xs'>
              {selectedUser?.isLock
                ? 'Bạn có chắc chắn muốn mở khóa người dùng này?'
                : 'Bạn có chắc chắn muốn khóa người dùng này? Người dùng sẽ không thể đăng nhập hoặc sử dụng tài khoản.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {selectedUser && (
            <div className='my-2 rounded-md bg-red-50 p-3 border border-red-100'>
              <h4 className='text-xs font-medium text-red-800 mb-1'>
                {selectedUser.isLock ? 'Bạn sắp mở khóa:' : 'Bạn sắp khóa:'}
              </h4>
              <div className='flex items-center gap-2'>
                <Avatar className='h-6 w-6'>
                  <AvatarImage src={selectedUser.avatar || '/placeholder.svg'} alt={selectedUser.fullname} />
                  <AvatarFallback className='text-[10px] bg-red-100 text-red-500'>
                    {selectedUser.fullname.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className='text-xs text-red-700 font-medium'>{selectedUser.fullname}</p>
                  <p className='text-[10px] text-red-600'>{selectedUser.email}</p>
                </div>
              </div>
              <p className='text-[10px] text-red-600 mt-1'>ID: {selectedUser.id}</p>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel className='h-8 text-xs'>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className={`h-8 text-xs ${
                selectedUser?.isLock ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-500 hover:bg-amber-600'
              } text-white`}
              onClick={handleToggleLock}
              disabled={isProcessing}
            >
              {isProcessing
                ? selectedUser?.isLock
                  ? 'Đang mở khóa...'
                  : 'Đang khóa...'
                : selectedUser?.isLock
                  ? 'Mở khóa'
                  : 'Khóa'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
