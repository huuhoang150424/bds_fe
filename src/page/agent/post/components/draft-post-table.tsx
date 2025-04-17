import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Edit, MoreVertical, Trash, Upload, Check, X } from 'lucide-react';
import type { DraftPost } from '@/constant/const-draft-post';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { formatPrice, getStatusColor } from '@/constant/const-draft-post';

interface DraftPostsTableProps {
  posts: DraftPost[];
  onDelete: (id: number) => void;
  onPublish: (id: number) => void;
}

export function DraftPostsTable({ posts, onDelete, onPublish }: DraftPostsTableProps) {
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [postToPublish, setPostToPublish] = useState<number | null>(null);

  const handleDelete = () => {
    if (postToDelete !== null) {
      onDelete(postToDelete);
      setPostToDelete(null);
    }
  };

  const handlePublish = () => {
    if (postToPublish !== null) {
      onPublish(postToPublish);
      setPostToPublish(null);
    }
  };

  return (
    <div className='rounded-md border'>
      <div className='overflow-auto max-h-[600px]'>
        <Table>
          <TableHeader className='sticky top-0 bg-background z-10'>
            <TableRow>
              <TableHead className='min-w-[250px]'>Tiêu đề</TableHead>
              <TableHead className='min-w-[150px]'>Giá</TableHead>
              <TableHead className='min-w-[100px]'>Diện tích</TableHead>
              <TableHead className='min-w-[100px]'>Phòng ngủ</TableHead>
              <TableHead className='min-w-[100px]'>Nội thất</TableHead>
              <TableHead className='min-w-[120px]'>Trạng thái</TableHead>
              <TableHead className='min-w-[150px]'>Ngày hết hạn</TableHead>
              <TableHead className='min-w-[100px]'>Cập nhật</TableHead>
              <TableHead className='text-right min-w-[100px]'>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.draft_id}>
                <TableCell className='font-medium'>
                  <div>
                    <div className='font-medium'>{post.title}</div>
                    <div className='text-sm text-muted-foreground line-clamp-1'>{post.address}</div>
                  </div>
                </TableCell>
                <TableCell>{formatPrice(post.price)}</TableCell>
                <TableCell>{post.square_meters} m²</TableCell>
                <TableCell>
                  {post.bedroom} PN / {post.bathroom} WC
                </TableCell>
                <TableCell>
                  {post.isFurniture ? (
                    <Check className='h-4 w-4 text-green-500' />
                  ) : (
                    <X className='h-4 w-4 text-red-500' />
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(post.status)}>
                    {post.status === 'draft'
                      ? 'Nháp'
                      : post.status === 'pending'
                        ? 'Đang chờ'
                        : post.status === 'published'
                          ? 'Đã đăng'
                          : post.status === 'rejected'
                            ? 'Từ chối'
                            : 'Hết hạn'}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(post.expiredDate).toLocaleDateString('vi-VN')}</TableCell>
                <TableCell>{formatDistanceToNow(new Date(post.updated_at), { addSuffix: true, locale: vi })}</TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <MoreVertical className='h-4 w-4' />
                        <span className='sr-only'>Tùy chọn</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem onClick={() => (window.location.href = `/edit/${post.draft_id}`)}>
                        <Edit className='mr-2 h-4 w-4' />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setPostToPublish(post.draft_id)}>
                        <Upload className='mr-2 h-4 w-4' />
                        Xuất bản
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setPostToDelete(post.draft_id)} className='text-destructive'>
                        <Trash className='mr-2 h-4 w-4' />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={postToDelete !== null} onOpenChange={(open) => !open && setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Bài đăng nháp này sẽ bị xóa vĩnh viễn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPostToDelete(null)}>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className='bg-destructive text-destructive-foreground'>
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={postToPublish !== null} onOpenChange={(open) => !open && setPostToPublish(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xuất bản bài đăng này?</AlertDialogTitle>
            <AlertDialogDescription>Bài đăng này sẽ được xuất bản và hiển thị công khai.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPostToPublish(null)}>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handlePublish}>Xuất bản</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
