'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ArrowUpDown, Download, Lock, Unlock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLocked, setIsLocked] = useState(false); // State to track lock status

  // Mock user data
  const users = [
    {
      id: 'u1',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      status: 'active',
      registrationDate: '2023-01-15',
    },
    { id: 'u2', name: 'Trần Thị B', email: 'tranthib@example.com', status: 'active', registrationDate: '2023-01-20' },
    { id: 'u3', name: 'Lê Văn C', email: 'levanc@example.com', status: 'locked', registrationDate: '2023-01-25' },
    { id: 'u4', name: 'Phạm Thị D', email: 'phamthid@example.com', status: 'active', registrationDate: '2023-02-01' },
    { id: 'u5', name: 'Hoàng Văn E', email: 'hoangvane@example.com', status: 'active', registrationDate: '2023-02-05' },
    { id: 'u6', name: 'Ngô Thị F', email: 'ngothif@example.com', status: 'locked', registrationDate: '2023-02-10' },
    { id: 'u7', name: 'Đỗ Văn G', email: 'dovang@example.com', status: 'active', registrationDate: '2023-02-15' },
    { id: 'u8', name: 'Vũ Thị H', email: 'vuthih@example.com', status: 'active', registrationDate: '2023-02-20' },
    { id: 'u9', name: 'Bùi Văn I', email: 'buivani@example.com', status: 'active', registrationDate: '2023-02-25' },
    { id: 'u10', name: 'Lý Thị K', email: 'lythik@example.com', status: 'locked', registrationDate: '2023-03-01' },
  ];

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Format date to display in DD-MM-YYYY format
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className='  mx-auto py-6 px-4'>
      <div className='flex flex-col space-y-4'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-2xl font-bold'>Danh sách người dùng</h1>
            <p className='text-muted-foreground'>Quản lý tài khoản người dùng</p>
          </div>
          <Button variant='outline' className='flex items-center gap-2'>
            <Download className='h-4 w-4' />
            Xuất dữ liệu
          </Button>
        </div>

        <div className='flex items-center py-4'>
          <Input
            placeholder='Tìm kiếm...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='max-w-sm p-[5px]'
          />
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[80px]'>ID</TableHead>
                <TableHead>
                  <div className='flex items-center gap-1'>
                    Tên
                    <ArrowUpDown className='h-3 w-3' />
                  </div>
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày đăng ký</TableHead>
                <TableHead className='text-right'>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className='font-medium'>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === 'active' ? 'default' : 'destructive'}
                      className={
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800 hover:bg-green-100'
                          : 'bg-red-100 text-red-800 hover:bg-red-100'
                      }
                    >
                      {user.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.registrationDate)}</TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant='outline' size='sm'>
                            Xem
                          </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[625px]'>
                          <DialogHeader>
                            <DialogTitle>Thông tin người dùng</DialogTitle>
                            <DialogDescription>Chi tiết tài khoản người dùng</DialogDescription>
                          </DialogHeader>
                          <div className='grid gap-4 py-4'>
                            <div>
                              <h3 className='font-medium'>{user.name}</h3>
                              <p className='text-sm text-muted-foreground'>Email: {user.email}</p>
                              <p className='text-sm text-muted-foreground'>Ngày đăng ký: {user.registrationDate}</p>
                              <p className='text-sm text-muted-foreground'>
                                Trạng thái: {user.status === 'active' ? 'Đang hoạt động' : 'Đã khóa'}
                              </p>
                            </div>
                            <div className='border rounded-md p-4'>
                              <h4 className='text-sm font-medium mb-2'>Hoạt động gần đây:</h4>
                              <ul className='text-sm space-y-1'>
                                <li>Đăng nhập lúc: 10:30 AM, 15/03/2023</li>
                                <li>Đăng bài lúc: 11:45 AM, 14/03/2023</li>
                                <li>Bình luận lúc: 09:15 AM, 14/03/2023</li>
                              </ul>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant='outline'>Đóng</Button>
                            {isLocked ? (
                              <Button className='gap-1'>
                                <Unlock className='h-4 w-4' /> Mở khóa tài khoản
                              </Button>
                            ) : (
                              <Button variant='destructive' className='gap-1'>
                                <Lock className='h-4 w-4' /> Khóa tài khoản
                              </Button>
                            )}
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      {user.status === 'active' ? (
                        <div>
                          <Button variant='outline' size='sm' className='px-2'>
                        <Unlock className='h-4 w-4' />
                      </Button>
                        </div>
                      ): (
                        <div>
                          <Button variant='outline' size='sm' className='px-2'>
                            <Lock className='h-4 w-4' />
                          </Button>
                        </div>
                      )}
                      
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className='flex items-center justify-end space-x-2 py-4'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href='#' aria-disabled='true'>
                  Trước
                </PaginationPrevious>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#'>Sau</PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
