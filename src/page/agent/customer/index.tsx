import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { MoreHorizontal, FileText, Phone, Calendar, RefreshCw, ChevronFirst, ChevronLast } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Tiềm năng' | 'Đang giao dịch' | 'Đã mua';
  lastContact: string;
  interests: string[];
}

const customers: Customer[] = [
  {
    id: 'KH001',
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@example.com',
    phone: '0912 345 678',
    status: 'Tiềm năng',
    lastContact: '15/07/2023',
    interests: ['Căn hộ', 'Nhà phố'],
  },
  {
    id: 'KH002',
    name: 'Trần Thị Bình',
    email: 'tranthib@example.com',
    phone: '0987 654 321',
    status: 'Đang giao dịch',
    lastContact: '20/07/2023',
    interests: ['Thương mại', 'Đất nền'],
  },
  {
    id: 'KH003',
    name: 'Lê Minh Cường',
    email: 'leminhc@example.com',
    phone: '0909 456 789',
    status: 'Đã mua',
    lastContact: '30/06/2023',
    interests: ['Nhà phố'],
  },
  {
    id: 'KH004',
    name: 'Phạm Thị Dung',
    email: 'phamthid@example.com',
    phone: '0978 234 567',
    status: 'Tiềm năng',
    lastContact: '10/07/2023',
    interests: ['Căn hộ'],
  },
  {
    id: 'KH005',
    name: 'Hoàng Văn Em',
    email: 'hoangvane@example.com',
    phone: '0932 876 543',
    status: 'Đang giao dịch',
    lastContact: '18/07/2023',
    interests: ['Nhà phố', 'Đất nền'],
  },
  {
    id: 'KH006',
    name: 'Ngô Thị Phương',
    email: 'ngothip@example.com',
    phone: '0918 345 678',
    status: 'Đã mua',
    lastContact: '05/07/2023',
    interests: ['Thương mại'],
  },
  {
    id: 'KH007',
    name: 'Đỗ Văn Giang',
    email: 'dovang@example.com',
    phone: '0965 432 109',
    status: 'Tiềm năng',
    lastContact: '12/07/2023',
    interests: ['Căn hộ', 'Đất nền'],
  },
  {
    id: 'KH008',
    name: 'Vũ Thị Hương',
    email: 'vuthih@example.com',
    phone: '0912 876 543',
    status: 'Đang giao dịch',
    lastContact: '22/07/2023',
    interests: ['Nhà phố'],
  },
  {
    id: 'KH009',
    name: 'Đinh Văn Ích',
    email: 'dinhvani@example.com',
    phone: '0934 567 890',
    status: 'Đã mua',
    lastContact: '01/07/2023',
    interests: ['Thương mại', 'Căn hộ'],
  },
  {
    id: 'KH010',
    name: 'Lý Thị Kim',
    email: 'lythik@example.com',
    phone: '0978 123 456',
    status: 'Tiềm năng',
    lastContact: '08/07/2023',
    interests: ['Đất nền'],
  },
];
import useScrollToTopOnMount from '@/hooks/use-scroll-top';

export default function CustomersPage() {
  useScrollToTopOnMount();
  const [activeRow, setActiveRow] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Tiềm năng':
        return (
          <Badge variant='outline' className='bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'>
            Tiềm năng
          </Badge>
        );
      case 'Đang giao dịch':
        return (
          <Badge variant='outline' className='bg-green-50 text-green-600 border-green-200 hover:bg-green-100'>
            Đang giao dịch
          </Badge>
        );
      case 'Đã mua':
        return (
          <Badge variant='outline' className='bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'>
            Đã mua
          </Badge>
        );
      default:
        return <Badge variant='outline'>{status}</Badge>;
    }
  };

  const getInterestBadge = (interest: string) => {
    switch (interest) {
      case 'Căn hộ':
        return (
          <Badge variant='outline' className='bg-purple-50 text-purple-600 border-purple-200 mr-1 text-[10px]'>
            Căn hộ
          </Badge>
        );
      case 'Nhà phố':
        return (
          <Badge variant='outline' className='bg-amber-50 text-amber-600 border-amber-200 mr-1 text-[10px]'>
            Nhà phố
          </Badge>
        );
      case 'Thương mại':
        return (
          <Badge variant='outline' className='bg-indigo-50 text-indigo-600 border-indigo-200 mr-1 text-[10px]'>
            Thương mại
          </Badge>
        );
      case 'Đất nền':
        return (
          <Badge variant='outline' className='bg-rose-50 text-rose-600 border-rose-200 mr-1 text-[10px]'>
            Đất nền
          </Badge>
        );
      default:
        return (
          <Badge variant='outline' className='mr-1 text-[10px]'>
            {interest}
          </Badge>
        );
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getAvatarColor = (id: string) => {
    const colors = [
      'bg-red-100 text-red-800',
      'bg-green-100 text-green-800',
      'bg-blue-100 text-blue-800',
      'bg-yellow-100 text-yellow-800',
      'bg-purple-100 text-purple-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-gray-100 text-gray-800',
    ];

    const index = Number.parseInt(id.replace('KH', '')) % colors.length;
    return colors[index];
  };

  return (
    <div className='container mx-auto py-8 px-4 max-w-[1380px]'>
      <div className='mb-6'>
        <h1 className='text-xl font-[600] text-gray-700'>Quản Lý Khách Hàng</h1>
        <p className='text-sm text-gray-500 mt-1'>Quản lý thông tin và theo dõi khách hàng tiềm năng</p>
      </div>
      <div className='rounded-md border border-gray-200 shadow-sm  '>
        <div className='overflow-x-auto'>
          <Table className='text-xs rounded-md'>
            <TableHeader className='bg-gray-50 '>
              <TableRow className='hover:bg-gray-50/80'>
                <TableHead className='w-[80px] font-medium'>Mã KH</TableHead>
                <TableHead className='w-[180px] font-medium'>Họ tên</TableHead>
                <TableHead className='w-[200px] font-medium'>Liên hệ</TableHead>
                <TableHead className='w-[120px] font-medium'>Trạng thái</TableHead>
                <TableHead className='w-[120px] font-medium'>Liên hệ gần nhất</TableHead>
                <TableHead className='w-[200px] font-medium'>Quan tâm</TableHead>
                <TableHead className='w-[80px] font-medium text-right'>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow
                  key={customer.id}
                  className={cn('h-14 hover:bg-gray-50/80', activeRow === customer.id && 'bg-blue-50/50')}
                >
                  <TableCell className='font-medium'>{customer.id}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Avatar className={cn('h-7 w-7', getAvatarColor(customer.id))}>
                        <AvatarFallback className='text-xs'>{getInitials(customer.name)}</AvatarFallback>
                      </Avatar>
                      <span>{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col'>
                      <span className='text-gray-700'>{customer.email}</span>
                      <span className='text-gray-500'>{customer.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell>{customer.lastContact}</TableCell>
                  <TableCell>
                    <div className='flex flex-wrap gap-1'>
                      {customer.interests.map((interest, index) => (
                        <span key={index}>{getInterestBadge(interest)}</span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className='text-right'>
                    <TooltipProvider>
                      <DropdownMenu>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild onClick={() => setActiveRow(customer.id)}>
                              <Button variant='ghost' className='h-8 w-8 p-0'>
                                <span className='sr-only'>Mở menu</span>
                                <MoreHorizontal className='h-4 w-4' />
                              </Button>
                            </DropdownMenuTrigger>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Thao tác</p>
                          </TooltipContent>
                        </Tooltip>
                        <DropdownMenuContent align='end' className='w-[180px]'>
                          <DropdownMenuItem className='text-xs'>
                            <FileText className='mr-2 h-3.5 w-3.5' />
                            <span>Xem hồ sơ</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className='text-xs'>
                            <Phone className='mr-2 h-3.5 w-3.5' />
                            <span>Liên hệ khách hàng</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className='text-xs'>
                            <Calendar className='mr-2 h-3.5 w-3.5' />
                            <span>Đặt lịch hẹn</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className='text-xs'>
                            <RefreshCw className='mr-2 h-3.5 w-3.5' />
                            <span>Cập nhật trạng thái</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-between px-4 py-3 border-t w-full '>
          <div className='text-xs text-gray-500'>Hiển thị 1 đến 10 trong tổng số 24 khách hàng</div>
          <Pagination className='w-auto'>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href='#' className='h-8 w-8 p-0 flex items-center justify-center'>
                  <ChevronFirst className='h-3.5 w-3.5' />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious href='#' className='h-8 px-2.5' />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#' isActive className='h-8 w-8 p-0 flex items-center justify-center'>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#' className='h-8 w-8 p-0 flex items-center justify-center'>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#' className='h-8 w-8 p-0 flex items-center justify-center'>
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' className='h-8 px-2.5' />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#' className='h-8 w-8 p-0 flex items-center justify-center'>
                  <ChevronLast className='h-3.5 w-3.5' />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
