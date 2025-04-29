import { useRef, useState } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { Check, MoreHorizontal, Shield, Trash2, ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DeletePost } from './delete-post';
import { ApprovePost } from './approve-post';
import { PostDetailModal } from './post-detail';

const formatPrice = (price: number, unit: string) => {
  if (unit === PriceUnit.VND) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price * 1000000);
  } else {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  }
};

enum PriceUnit {
  VND = 'VND',
  USD = 'USD',
}

enum StatusPost {
  AVAILABLE = 'Còn trống',
  NEGOTIATING = 'Đang đám phán',
  DELIVERED = 'Đã bàn giao',
}

export type Post = {
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

export const columns: ColumnDef<Post>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Chọn tất cả'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Chọn dòng'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <div className='flex items-center'>
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className='-ml-3'>
          Tiêu đề
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div>
        <div className='font-medium truncate max-w-[250px]' title={row.original.title}>
          {row.original.title}
        </div>
        <div className='text-xs text-muted-foreground truncate max-w-[250px]'>{row.original.address}</div>
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Giá
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => formatPrice(row.original.price, row.original.priceUnit),
  },
  {
    accessorKey: 'squareMeters',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Diện tích
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => `${row.original.squareMeters} m²`,
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant='outline'
          className={
            status === StatusPost.AVAILABLE
              ? 'bg-green-100 text-green-800'
              : status === StatusPost.NEGOTIATING
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-blue-100 text-blue-800'
          }
        >
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'verified',
    header: 'Xác minh',
    cell: ({ row }) => {
      const verified = row.original.verified;
      return verified ? (
        <Badge variant='outline' className='bg-green-100 text-green-800'>
          <Check className='mr-1 h-3 w-3' /> Đã xác minh
        </Badge>
      ) : (
        <Badge variant='outline' className='bg-red-100 text-red-800'>
          Chưa xác minh
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes((row.getValue(id) as boolean).toString());
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Ngày tạo
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => format(row.original.createdAt, 'dd/MM/yyyy', { locale: vi }),
    sortingFn: 'datetime',
  },
  {
    id: 'actions',
    cell: ({ row, table }) => <ActionsCell row={row} table={table} />,
  },
];

function ActionsCell({ row, table }: { row: any; table: any }) {
  const post = row.original;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [viewPosts, setViewPosts] = useState(false);
  const dropdownRefs = useRef<HTMLButtonElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button ref={dropdownRefs} variant='ghost' className='h-6 w-6 p-0 hover:bg-red-50'>
            <span className='sr-only'>Hành động</span>
            <MoreHorizontal className='h-3 w-3' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='text-xs'>
          <DropdownMenuLabel className='text-xs'>Thao tác</DropdownMenuLabel>
          {!post.verified && (
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setIsDropdownOpen(false);
                setViewPosts(true);
              }}
            >
              <Shield className='mr-2 h-4 w-4' /> Duyệt bài đăng
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className='text-xscursor-pointer'
            onSelect={(e) => {
              e.preventDefault();
              setIsDropdownOpen(false);
              setViewPosts(true);
            }}
          >
            Xem chi tiết bài đăng
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='text-xs text-red-500 cursor-pointer'
            onSelect={(e) => {
              e.preventDefault();
              setIsDropdownOpen(false);
              setIsDeleteModalOpen(true);
            }}
          >
            <Trash2 className='mr-2 h-4 w-4' /> Xóa bài đăng
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeletePost post={post} open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} />

      {!post.verified && <ApprovePost post={post} open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen} />}
      {/* <PostDetailModal post={post} onClose={setViewPosts} isOpen={viewPosts} /> */}
    </>
  );
}
