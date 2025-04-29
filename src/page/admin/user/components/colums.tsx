import {  useState } from 'react';
import {
  type ColumnDef
} from '@tanstack/react-table';
import { ArrowUpDown, Filter, Trash2, Lock, Unlock, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LockUser from './lock-user';
import DeleteUser from './delete-user';
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

export const columns: ColumnDef<User>[] = [
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
            <Badge className={`text-[10px] ${active ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              {active ? 'Online' : 'Offline'}
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
        <Badge className={`text-[10px] ${isProfessional ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
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
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];

function ActionsCell({ row }: { row: any }) {
  const [lockDialogOpen, setLockDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
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
        className='h-6 w-6 p-0 hover:bg-red-50 hover:text-amber-500'
        onClick={() =>setLockDialogOpen(true)}
        title={user.isLock ? 'Mở khóa' : 'Khóa'}
      >
        {user.isLock ? <Unlock className='h-3 w-3' /> : <Lock className='h-3 w-3' />}
        <span className='sr-only'>{user.isLock ? 'Mở khóa' : 'Khóa'}</span>
      </Button>
      <Button
        variant='ghost'
        size='icon'
        className='h-6 w-6 p-0 hover:bg-red-50 hover:text-red-500'
        onClick={() => setDeleteDialogOpen(true)}
        title='Xóa'
      >
        <Trash2 className='h-3 w-3' />
        <span className='sr-only'>Xóa</span>
      </Button>

      <LockUser selectedUser={user} lockDialogOpen={lockDialogOpen} setLockDialogOpen={setLockDialogOpen} />
      <DeleteUser deleteDialogOpen={deleteDialogOpen} setDeleteDialogOpen={setDeleteDialogOpen} selectedUser={user} />
    </div>
  );
}
