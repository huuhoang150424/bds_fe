import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { useDeletePosts } from '../hooks/use-delete-posts';
import type { Post } from './columns';

interface DeletePostProps {
  post: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeletePost({ post, open, onOpenChange }: DeletePostProps) {
  const [reason, setReason] = useState('');
  const { mutate: deletePosts, isPending: isProcessing } = useDeletePosts();

  const handleDelete = () => {
    if (!reason.trim()) {
      toast({
        variant: 'destructive',
        title: 'Lỗi',
        description: 'Vui lòng nhập lý do xóa bài đăng.',
      });
      return;
    }

    deletePosts(
      { postIds: [post.id], reason },
      {
        onSuccess: (response) => {
          toast({
            variant: 'success',
            title: response.message || 'Xóa bài đăng thành công',
          });
          onOpenChange(false);
          setReason('');
        },
        onError: (error: any) => {
          toast({
            variant: 'destructive',
            title: 'Lỗi',
            description: error.message || 'Không thể xóa bài đăng',
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-[15px] text-gray-700">Xác nhận xóa bài đăng</DialogTitle>
          <DialogDescription className="text-[14px] text-gray-700">
            Bạn có chắc chắn muốn xóa bài đăng "{post.title}"? Vui lòng nhập lý do xóa để thông báo đến người dùng.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4">
          <Textarea
            placeholder="Nhập lý do xóa (ví dụ: Vi phạm chính sách, nội dung không phù hợp, v.v.)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[100px]"
            disabled={isProcessing}
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            className="text-xs h-8 bg-white hover:bg-white text-gray-700"
            onClick={() => {
              onOpenChange(false);
              setReason('');
            }}
            disabled={isProcessing}
          >
            Hủy
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="text-xs h-8 bg-red-500 hover:bg-red-600"
            onClick={handleDelete}
            disabled={isProcessing}
          >
            {isProcessing ? 'Đang xóa...' : 'Xóa'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}