import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown, Download, Edit, Pencil, Plus, Trash } from 'lucide-react';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';

export default function NewsManagement() {
  useScrollToTopOnMount();
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  // Mock news data
  const newsArticles = [
    {
      id: 'n7',
      title: 'Tuyển dụng vị trí Nhân viên Marketing',
      author: 'Admin',
      category: 'Tuyển dụng',
      createdDate: '2023-03-25',
    },
    {
      id: 'n6',
      title: 'Thông báo bảo trì hệ thống ngày 25/3/2023',
      author: 'Admin',
      category: 'Thông báo',
      createdDate: '2023-03-22',
    },
    {
      id: 'n3',
      title: 'Sự kiện ra mắt sản phẩm sẽ diễn ra vào ngày 20/4',
      author: 'Admin',
      category: 'Sự kiện',
      createdDate: '2023-03-15',
    },
    {
      id: 'n1',
      title: 'Ra mắt sản phẩm mới - Điện thoại XYZ Pro',
      author: 'Admin',
      category: 'Công nghệ',
      createdDate: '2023-03-10',
    },
    {
      id: 'n4',
      title: 'Hướng dẫn sử dụng tính năng mới trên ứng dụng',
      author: 'Admin',
      category: 'Hướng dẫn',
      createdDate: '2023-03-16',
    },
    {
      id: 'n2',
      title: 'Cập nhật chính sách bảo mật người dùng',
      author: 'Admin',
      category: 'Thông báo',
      createdDate: '2023-03-12',
    },
    {
      id: 'n5',
      title: 'Chương trình khuyến mãi tháng 4/2023',
      author: 'Admin',
      category: 'Khuyến mãi',
      createdDate: '2023-03-20',
    },
  ];

  // Filter news based on search term
  const filteredNews = newsArticles.filter(
    (news) =>
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Format date to display in DD-MM-YYYY format
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className='container mx-auto py-6 px-4'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Quản lý tin tức</h1>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className='gap-1'>
              <Plus className='h-4 w-4' /> Thêm tin tức
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[600px]'>
            <DialogHeader>
              <DialogTitle>Thêm tin tức mới</DialogTitle>
              <DialogDescription>Điền thông tin để thêm bài tin tức mới vào hệ thống.</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='space-y-2'>
                <Label htmlFor='title'>Tiêu đề</Label>
                <Input id='title' placeholder='Nhập tiêu đề tin tức' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='category'>Danh mục</Label>
                <Select>
                  <SelectTrigger id='category'>
                    <SelectValue placeholder='Chọn danh mục' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='tuyen-dung'>Tuyển dụng</SelectItem>
                    <SelectItem value='thong-bao'>Thông báo</SelectItem>
                    <SelectItem value='su-kien'>Sự kiện</SelectItem>
                    <SelectItem value='cong-nghe'>Công nghệ</SelectItem>
                    <SelectItem value='huong-dan'>Hướng dẫn</SelectItem>
                    <SelectItem value='khuyen-mai'>Khuyến mãi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='content'>Nội dung</Label>
                <Textarea id='content' placeholder='Nhập nội dung tin tức' rows={8} />
              </div>
            </div>
            <DialogFooter>
              <Button variant='outline' onClick={() => setOpenDialog(false)}>
                Hủy
              </Button>
              <Button onClick={() => setOpenDialog(false)}>Lưu tin tức</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className='bg-white '>
        <div className='flex flex-col space-y-4'>
          <div className='flex justify-between items-center'>
            <div>
              <h2 className='text-xl font-bold'>Danh sách tin tức</h2>
              <p className='text-muted-foreground'>Quản lý các bài tin tức trên hệ thống</p>
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
                      Tiêu đề
                      <ArrowUpDown className='h-3 w-3' />
                    </div>
                  </TableHead>
                  <TableHead>Tác giả</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead className='text-right'>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNews.map((news) => (
                  <TableRow key={news.id}>
                    <TableCell className='font-medium'>{news.id}</TableCell>
                    <TableCell>{news.title}</TableCell>
                    <TableCell>{news.author}</TableCell>
                    <TableCell>{news.category}</TableCell>
                    <TableCell>{formatDate(news.createdDate)}</TableCell>
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
                              <DialogTitle>Chi tiết tin tức</DialogTitle>
                              <DialogDescription>Xem và chỉnh sửa tin tức</DialogDescription>
                            </DialogHeader>
                            <div className='grid gap-4 py-4'>
                              <div>
                                <h3 className='font-medium'>{news.title}</h3>
                                <p className='text-sm text-muted-foreground'>Tác giả: {news.author}</p>
                                <p className='text-sm text-muted-foreground'>Danh mục: {news.category}</p>
                                <p className='text-sm text-muted-foreground'>Ngày tạo: {news.createdDate}</p>
                              </div>
                              <div className='border rounded-md p-4'>
                                <p>Nội dung tin tức sẽ hiển thị ở đây...</p>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant='outline' className='gap-1'>
                                <Edit className='h-4 w-4' /> Chỉnh sửa
                              </Button>
                              <Button variant='destructive' className='gap-1'>
                                <Trash className='h-4 w-4' /> Xóa
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button variant='outline' size='sm' className='px-2'>
                          <Pencil className='h-4 w-4' />
                        </Button>
                        <Button variant='outline' size='sm' className='px-2'>
                          <Trash className='h-4 w-4' />
                        </Button>
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
    </div>
  );
}
