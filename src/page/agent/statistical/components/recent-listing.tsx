
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, 
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetRecentNews } from '../hooks/use-get-recent-news';
import { Link } from 'react-router-dom';

interface Author {
  id: string;
  fullname: string;
  avatar: string;
}
interface recentNews {
  id: string;
  title: string;
  imageUrl: string;
  created_at: string;
  slug: string;
  category: string;
  view: number;
  author: Author;
}
export function RecentListings() {
  const { data, isLoading, isError } = useGetRecentNews();
  return (
    <div className='my-8'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold'>Tin đăng gần đây</h2>
        <Button variant='outline' size='sm'>
          <Link to={'/new'}>
          Xem tất cả
        </Link>
        </Button>
      </div>
      <Card className='border border-gray-200 rounded-[10px] '>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Loại</TableHead>
              {/* <TableHead>Giá</TableHead> */}
              <TableHead>Lượt xem</TableHead>
              <TableHead>Tác giả</TableHead>
              <TableHead>Ngày đăng</TableHead>
              <TableHead className='text-right'>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.recentNews.map((recentNews: recentNews) => (
              <TableRow key={recentNews.id}>
                <TableCell className='font-medium'>{recentNews.title}</TableCell>
                <TableCell>{recentNews.category}</TableCell>
                <TableCell className='max-w-[200px] truncate'>{recentNews.view}</TableCell>
                <TableCell>
                  {recentNews.author.fullname}
                </TableCell>
                <TableCell>{new Date(recentNews.created_at).toLocaleDateString('vi-VN')}</TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='icon'>
                        <Settings className='h-4 w-4' />
                        <span className='sr-only'>Mở menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem>
                        <Link to={`/new/${recentNews.slug}`}>Xem chi tiết</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                      <DropdownMenuItem className='text-destructive'>Xóa</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

