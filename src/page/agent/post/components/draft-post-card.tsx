import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

import {
  Bed,
  Bath,
  ArrowRightIcon as ArrowsOutCardinal,
  Calendar,
  Edit,
  MoreVertical,
  Trash,
  Upload,
  MapPin,
  Building2,
} from 'lucide-react';
import type { DraftPost } from '@/constant/const-draft-post';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
import { formatPrice, getStatusColor, getUserById } from '@/constant/const-draft-post';
import { CustomImage } from '@/components/common';

interface DraftPostCardProps {
  post: DraftPost;
  onDelete: (id: number) => void;
  onPublish: (id: number) => void;
}

export function DraftPostCard({ post, onDelete, onPublish }: DraftPostCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const user = getUserById(post.user_id);

  const handleDelete = () => {
    onDelete(post.draft_id);
    setShowDeleteDialog(false);
  };

  const handlePublish = () => {
    onPublish(post.draft_id);
    setShowPublishDialog(false);
  };

  return (
    <Card className='overflow-hidden border border-gray-200 rounded-[10px]'>
      <div className='relative h-48'>
        <CustomImage
          src={post.image || '/placeholder.svg?height=192&width=384'}
          alt={post.title}
          width={'auto'}
          height={200}
          className='object-cover'
        />
        <div className='absolute top-2 right-2'>
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
        </div>
      </div>
      <CardContent className='p-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold line-clamp-1'>{post.title}</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' className='h-8 w-8'>
                <MoreVertical className='h-4 w-4' />
                <span className='sr-only'>Tùy chọn</span>
              </Button>
            </DropdownMenuTrigger>
            q bun add @tanstack/react-query-devtools@4
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => (window.location.href = `/edit/${post.draft_id}`)}>
                <Edit className='mr-2 h-4 w-4' />
                Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowPublishDialog(true)}>
                <Upload className='mr-2 h-4 w-4' />
                Xuất bản
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className='text-destructive'>
                <Trash className='mr-2 h-4 w-4' />
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='mt-2 text-xl font-bold text-primary'>{formatPrice(post.price)}</div>

        <div className='mt-1 flex items-center text-sm text-muted-foreground'>
          <MapPin className='mr-1 h-3.5 w-3.5' />
          <span className='line-clamp-1'>{post.address}</span>
        </div>

        <div className='mt-3 grid grid-cols-3 gap-2'>
          <div className='flex items-center text-sm'>
            <ArrowsOutCardinal className='mr-1 h-3.5 w-3.5 text-muted-foreground' />
            <span>{post.square_meters} m²</span>
          </div>
          <div className='flex items-center text-sm'>
            <Bed className='mr-1 h-3.5 w-3.5 text-muted-foreground' />
            <span>{post.bedroom} PN</span>
          </div>
          <div className='flex items-center text-sm'>
            <Bath className='mr-1 h-3.5 w-3.5 text-muted-foreground' />
            <span>{post.bathroom} WC</span>
          </div>
        </div>

        <p className='mt-2 text-muted-foreground line-clamp-2'>{post.description}</p>
      </CardContent>
      <CardFooter className='p-4 pt-0 flex items-center justify-between text-sm text-muted-foreground'>
        <div className='flex items-center'>
          <Building2 className='mr-1 h-3.5 w-3.5' />
          <span>
            Tầng {post.floor} • {post.direction}
          </span>
        </div>
        <div className='flex items-center'>
          <Calendar className='mr-1 h-3.5 w-3.5' />
          <span>{formatDistanceToNow(new Date(post.updated_at), { addSuffix: true, locale: vi })}</span>
        </div>
      </CardFooter>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Bài đăng nháp này sẽ bị xóa vĩnh viễn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className='bg-destructive text-destructive-foreground'>
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xuất bản bài đăng này?</AlertDialogTitle>
            <AlertDialogDescription>Bài đăng này sẽ được xuất bản và hiển thị công khai.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handlePublish}>Xuất bản</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
