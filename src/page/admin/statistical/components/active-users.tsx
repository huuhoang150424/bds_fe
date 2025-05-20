import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetTopUsersByPost } from '../hook/use-get-top-users';

interface User {
  id: string;
  fullname: string;
  email: string;
  avatar: string;
  postCount: number;
}

export default function ActiveUsersTable() {
  const { data: users, isLoading, error } = useGetTopUsersByPost();
  console.log(users?.data)
  return (
    <Card className=' '>
      <CardHeader>
        <CardTitle className='text-xs'>Người Dùng Hoạt Động Tích Cực Nhất</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className='text-xs'>Đang tải...</p>
        ) : error ? (
          <p className='text-xs text-red-500'>Lỗi khi tải dữ liệu</p>
        ) : users.length === 0 ? (
          <p className='text-xs'>Không có dữ liệu</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[50px] text-xs'>ID</TableHead>
                <TableHead className='text-xs'>Tên</TableHead>
                <TableHead className='text-right text-xs'>Số Bài Đăng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.data?.map((user: User, index: number) => (
                <TableRow key={user.id}>
                  <TableCell className='text-xs'>{index + 1}</TableCell>
                  <TableCell className='text-xs'>{user?.fullname}</TableCell>
                  <TableCell className='text-right text-xs'>{user?.postCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}