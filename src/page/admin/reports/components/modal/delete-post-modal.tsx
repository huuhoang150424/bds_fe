import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { useSendNotification } from '@/page/admin/notification/hooks/use-send-notification';
import { useDeletePosts } from '@/page/admin/post/hooks/use-delete-posts';

interface DeletePostModalProps {
  report: any;
}

export function DeletePostModal({ report }: DeletePostModalProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const deletePostsMutation = useDeletePosts();
  const sendNotificationMutation = useSendNotification();

  const handleDelete = async () => {
    if (!reason.trim()) {
      toast({ title: 'Lỗi', description: 'Vui lòng nhập lý do xóa.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      await deletePostsMutation.mutateAsync({ postIds: [report.post.id], reason });
      const notificationData = {
        message: `Bài viết "${report.post.title}" của bạn đã bị xóa vì: ${reason}`,
        userId: report.post.userId,
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 3,
      };
      await sendNotificationMutation.mutateAsync(notificationData);
      toast({ title: 'Thành công', description: 'Bài viết và báo cáo đã được xóa.', variant: 'success' });
      setOpen(false);
      setReason('');
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message || 'Không thể xóa bài viết.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Xóa bài viết
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[35%]">
        <DialogHeader>
          <DialogTitle>Xóa bài viết</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="rounded-md bg-red-50 p-4 text-[14px] text-red-800">
            <div className="flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4" />
              <p>Điều này sẽ xóa vĩnh viễn bài viết và thông báo cho tác giả.</p>
            </div>
          </div>
          <Textarea
            placeholder="Lý do xóa (sẽ được gửi đến tác giả)..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading || deletePostsMutation.isPending || sendNotificationMutation.isPending}
          >
            {isLoading ? 'Đang xử lý...' : 'Xóa bài viết'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}