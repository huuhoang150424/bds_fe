'use client';

import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function RecentListings() {
  return (
    <div className='my-8'>
      <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-bold'>Tin đăng gần đây</h2>
            <Button variant='outline' size='sm'>
              Xem tất cả
            </Button>
          </div>
      <Card className='border border-gray-200 rounded-[10px] '>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Địa chỉ</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày đăng</TableHead>
              <TableHead className='text-right'>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentListings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell className='font-medium'>{listing.title}</TableCell>
                <TableCell>{listing.type}</TableCell>
                <TableCell>{listing.price}</TableCell>
                <TableCell className='max-w-[200px] truncate'>{listing.address}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      listing.status === 'Đang bán' ? 'default' : listing.status === 'Đã bán' ? 'secondary' : 'outline'
                    }
                  >
                    {listing.status}
                  </Badge>
                </TableCell>
                <TableCell>{listing.date}</TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='icon'>
                        <Settings className='h-4 w-4' />
                        <span className='sr-only'>Mở menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
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

// Sample Data
const recentListings = [
  {
    id: 1,
    title: 'Căn hộ cao cấp Vinhomes Central Park',
    type: 'Căn hộ',
    price: '5.2 tỷ',
    address: '208 Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, TP.HCM',
    status: 'Đang bán',
    date: '15/03/2025',
  },
  {
    id: 2,
    title: 'Nhà phố Thảo Điền',
    type: 'Nhà phố',
    price: '12 tỷ',
    address: 'Đường Nguyễn Văn Hưởng, Phường Thảo Điền, Quận 2, TP.HCM',
    status: 'Đang bán',
    date: '12/03/2025',
  },
  {
    id: 3,
    title: 'Biệt thự Phú Mỹ Hưng',
    type: 'Biệt thự',
    price: '25 tỷ',
    address: 'Đường Nguyễn Lương Bằng, Phú Mỹ Hưng, Quận 7, TP.HCM',
    status: 'Đã bán',
    date: '10/03/2025',
  },
  {
    id: 4,
    title: 'Đất nền Bình Chánh',
    type: 'Đất nền',
    price: '2.5 tỷ',
    address: 'Xã Bình Hưng, Huyện Bình Chánh, TP.HCM',
    status: 'Đang bán',
    date: '08/03/2025',
  },
  {
    id: 5,
    title: 'Căn hộ Masteri An Phú',
    type: 'Căn hộ',
    price: '3.8 tỷ',
    address: '179 Xa Lộ Hà Nội, Phường Thảo Điền, Quận 2, TP.HCM',
    status: 'Đang bán',
    date: '05/03/2025',
  },
];
