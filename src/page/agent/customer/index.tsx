import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Phone,
  Search,
  Star,
  User,
  UserPlus,
} from 'lucide-react';
import { customers } from '@/constant/const-agent-customer-infor';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'potential':
      return (
        <Badge variant='outline' className='text-blue-500 border-blue-500'>
          Tiềm năng
        </Badge>
      );
    case 'active':
      return <Badge className='bg-green-500'>Đang giao dịch</Badge>;
    case 'purchased':
      return <Badge variant='secondary'>Đã mua</Badge>;
    default:
      return <Badge variant='outline'>{status}</Badge>;
  }
};

export default function CustomersPage() {
  useScrollToTopOnMount();
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;
  const totalPages = Math.ceil(customers.length / customersPerPage);
  const getCurrentPageCustomers = () => {
    const startIndex = (currentPage - 1) * customersPerPage;
    const endIndex = startIndex + customersPerPage;
    return customers.slice(startIndex, endIndex);
  };

  // Xử lý chuyển trang
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Tạo mảng các số trang để hiển thị
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Hiển thị tất cả các trang nếu tổng số trang ít hơn hoặc bằng maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Hiển thị một phần các trang với trang hiện tại ở giữa
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = startPage + maxPagesToShow - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className='flex flex-col p-6 space-y-6  min-h-screen max-w-8xl'>
      <header className='sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6'>
        <div className='flex-1'>
          <h1 className='text-2xl font-[500]'>Quản Lý Khách Hàng</h1>
        </div>
      </header>
      <main className='flex-1 p-4 sm:p-6'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
            <div className='relative w-full sm:w-72'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Tìm kiếm khách hàng...'
                className='w-full pl-8 py-[5px] flex items-center '
              />
            </div>
            <div className='flex gap-2 w-full sm:w-auto'></div>
          </div>

          <Tabs defaultValue='all'>
            <TabsList>
              <TabsTrigger value='all'>Tất cả khách hàng</TabsTrigger>
              <TabsTrigger value='potential'>Khách tiềm năng</TabsTrigger>
              <TabsTrigger value='active'>Khách đang giao dịch</TabsTrigger>
              <TabsTrigger value='purchased'>Khách đã mua</TabsTrigger>
            </TabsList>
            <TabsContent value='all' className='mt-2'>
              <Card>
                <CardContent className='p-0'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã KH</TableHead>
                        <TableHead>Họ tên</TableHead>
                        <TableHead>Liên hệ</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Liên hệ gần nhất</TableHead>
                        <TableHead>Quan tâm</TableHead>

                        <TableHead className='text-right'>Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getCurrentPageCustomers().map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell className='font-medium'>{customer.id}</TableCell>
                          <TableCell>{customer.name}</TableCell>
                          <TableCell>
                            <div>{customer.email}</div>
                            <div className='text-sm text-muted-foreground'>{customer.phone}</div>
                          </TableCell>
                          <TableCell>{getStatusBadge(customer.status)}</TableCell>
                          <TableCell>{customer.lastContact}</TableCell>
                          <TableCell>
                            <div className='flex flex-wrap gap-1'>
                              {customer.interests.map((interest) => (
                                <Badge key={interest} variant='outline'>
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>

                          <TableCell className='text-right'>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant='ghost' size='icon'>
                                  <MoreHorizontal className='h-4 w-4' />
                                  <span className='sr-only'>Mở menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align='end'>
                                <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <User className='mr-2 h-4 w-4' />
                                  Xem hồ sơ
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Phone className='mr-2 h-4 w-4' />
                                  Liên hệ khách hàng
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Calendar className='mr-2 h-4 w-4' />
                                  Đặt lịch hẹn
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Star className='mr-2 h-4 w-4' />
                                  Cập nhật trạng thái
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Phân trang */}
                  <div className='flex items-center justify-between px-4 py-4 border-t'>
                    <div className='text-sm text-muted-foreground'>
                      Hiển thị {(currentPage - 1) * customersPerPage + 1} đến{' '}
                      {Math.min(currentPage * customersPerPage, customers.length)} trong tổng số {customers.length}{' '}
                      khách hàng
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Button variant='outline' size='icon' onClick={goToFirstPage} disabled={currentPage === 1}>
                        <ChevronsLeft className='h-4 w-4' />
                        <span className='sr-only'>Trang đầu</span>
                      </Button>
                      <Button variant='outline' size='icon' onClick={goToPreviousPage} disabled={currentPage === 1}>
                        <ChevronLeft className='h-4 w-4' />
                        <span className='sr-only'>Trang trước</span>
                      </Button>

                      {getPageNumbers().map((pageNumber) => (
                        <Button
                          key={pageNumber}
                          variant={currentPage === pageNumber ? 'default' : 'outline'}
                          size='icon'
                          onClick={() => goToPage(pageNumber)}
                        >
                          {pageNumber}
                        </Button>
                      ))}

                      <Button
                        variant='outline'
                        size='icon'
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className='h-4 w-4' />
                        <span className='sr-only'>Trang sau</span>
                      </Button>
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={goToLastPage}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronsRight className='h-4 w-4' />
                        <span className='sr-only'>Trang cuối</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='potential' className='mt-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Khách hàng tiềm năng</CardTitle>
                  <CardDescription>Khách hàng đã thể hiện sự quan tâm nhưng chưa mua</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    
                    <Table>
                      <thead>
                        <TableRow>
                          <TableHead>Mã KH</TableHead>
                          <TableHead>Họ tên</TableHead>
                          <TableHead>Liên hệ</TableHead>
                          <TableHead>Liên hệ gần nhất</TableHead>
                          <TableHead>Quan tâm</TableHead>
                        </TableRow>
                      </thead>
                      <TableBody>
                        {customers
                          .filter((customer) => customer.status === 'potential')
                          .map((customer) => (
                            <TableRow key={customer.id}>
                              <TableCell className='font-medium'>{customer.id}</TableCell>
                              <TableCell className='font-medium'>{customer.name}</TableCell>
                              <TableCell>
                                <div>{customer.email}</div>
                                <div className='text-sm '>{customer.phone}</div>
                              </TableCell>
                              <TableCell>{customer.lastContact || 'Chưa có'}</TableCell>
                              <TableCell>
                                <div className='flex flex-wrap gap-1'>
                                  {customer.interests && customer.interests.length > 0
                                    ? customer.interests.map((interest) => (
                                        <Badge key={interest} variant='outline'>
                                          {interest}
                                        </Badge>
                                      ))
                                    : 'Chưa có'}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='active' className='mt-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Khách hàng đang giao dịch</CardTitle>
                  <CardDescription>Khách hàng đang tích cực tìm kiếm để mua</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <thead>
                      <TableRow>
                        <TableHead>Mã khách hàng</TableHead>
                        <TableHead>Tên khách hàng</TableHead>
                        <TableHead>Liên hệ</TableHead>
                        <TableHead>Quan tâm</TableHead>
                        <TableHead className='text-right'>Hành động</TableHead>
                      </TableRow>
                    </thead>
                    <TableBody>
                      {customers
                        .filter((customer) => customer.status === 'active')
                        .map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell className='font-medium '>{customer.id}</TableCell>
                            <TableCell className='font-medium '>{customer.name}</TableCell>
                            <TableCell>
                              <div className='text-sm '>{customer.email}</div>
                              <div className='text-sm '>{customer.phone}</div>
                            </TableCell>
                            <TableCell>
                              <div className='flex flex-wrap gap-1 '>
                                {customer.interests.map((interest) => (
                                  <Badge key={interest} variant='outline'>
                                    {interest}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className='text-right'>
                              <Button size='sm'>Xem bất động sản</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='purchased' className='mt-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Khách hàng đã mua</CardTitle>
                  <CardDescription>Khách hàng đã mua bất động sản</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <thead>
                      <TableRow>
                        <TableHead>Mã khách hàng</TableHead>
                        <TableHead>Tên khách hàng</TableHead>
                        <TableHead>Liên hệ</TableHead>
                        <TableHead>Quan tâm</TableHead>
                        <TableHead className='text-right'>Hành động</TableHead>
                      </TableRow>
                    </thead>
                    <TableBody>
                      {customers
                        .filter((customer) => customer.status === 'active')
                        .map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell className='font-medium'>{customer.id}</TableCell>
                            <TableCell className='font-medium'>{customer.name}</TableCell>
                            <TableCell>
                              <div className='text-sm '>{customer.email}</div>
                              <div className='text-sm '>{customer.phone}</div>
                            </TableCell>
                            <TableCell>
                              <div className='flex flex-wrap gap-1'>
                                {customer.interests.map((interest) => (
                                  <Badge key={interest} variant='outline'>
                                    {interest}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className='text-right'>
                              <Button size='sm'>Xem bất động sản</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
