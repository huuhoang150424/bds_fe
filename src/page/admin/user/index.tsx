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
import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { useGetAllUser } from './hooks/use-get-all-user';

export default function UserManagement() {
  useScrollToTopOnMount();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLocked, setIsLocked] = useState(false); // State to track lock status

  // Format date to display in DD-MM-YYYY format
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };
  const { data, isLoading, isError } = useGetAllUser(1, 10);
  console.log('data', data?.data);

  return (
    <div className='  py-6 px-4'>
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
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Giới tính</TableHead>
                <TableHead>Ngày sinh</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày đăng ký</TableHead>
                <TableHead>Điểm</TableHead>
                <TableHead className='text-right'>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell className='font-medium'>{user.id}</TableCell>
                  <TableCell>{user.fullname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>
                    {user.gender === "Male" ? "Nam" : user.gender === "Female" ? "Nữ" : "Khác"}
                  </TableCell>
                  <TableCell>{new Date(user.dateOfBirth).toLocaleDateString('vi-VN')}</TableCell>
                  <TableCell>
                    <Badge
                      variant={!user.isLock ? 'default' : 'destructive'}
                      className={
                        !user.isLock 
                          ? 'bg-green-100 text-green-800 hover:bg-green-100'
                          : 'bg-red-100 text-red-800 hover:bg-red-100'
                      }
                    >
                      {!user.isLock  ? 'Đang hoạt động' : 'không hoạt động'}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>{(user.score)}</TableCell>
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
                              <p className='text-sm text-muted-foreground'>Ngày đăng ký: {formatDate(user.createdAt)}</p>
                              <p className='text-sm text-muted-foreground'>
                                Trạng thái: {user.active === true ? 'Đang hoạt động' : 'không hoạt động'}
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
                            {user.isLock ? (
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
                      {user.isLock === true ? (
                        <div>
                          <Button variant='outline' size='sm' className='px-2'>
                            <Unlock className='h-4 w-4' />
                          </Button>
                        </div>
                      ) : (
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
