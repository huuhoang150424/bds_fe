import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Edit } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useSendNotification } from '@/page/admin/notification/hooks/use-send-notification';

interface RequestEditModalProps {
  report: any;
}

export function RequestEditModal({ report }: RequestEditModalProps) {
  const [open, setOpen] = useState(false);
  const [editRequest, setEditRequest] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const sendNotificationMutation = useSendNotification();

  const handleSendRequest = async () => {
    if (!editRequest.trim()) {
      toast({ title: 'Lỗi', description: 'Vui lòng nhập yêu cầu chỉnh sửa.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      const notificationData = {
        message: `Yêu cầu chỉnh sửa bài viết "${report.post.title}": ${editRequest}`,
        userId: report.post.userId,
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 2,
      };
      await sendNotificationMutation.mutateAsync(notificationData);
      toast({ title: 'Thành công', description: 'Yêu cầu chỉnh sửa đã được gửi.', variant: 'success' });
      setOpen(false);
      setEditRequest('');
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message || 'Không thể gửi yêu cầu chỉnh sửa.',
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
          <Edit className="mr-2 h-4 w-4" />
          Yêu cầu chỉnh sửa
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[35%]">
        <DialogHeader>
          <DialogTitle>Yêu cầu chỉnh sửa bài viết</DialogTitle>
          <DialogDescription>
            Yêu cầu tác giả chỉnh sửa bài viết để tuân thủ quy định.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            placeholder="Giải thích những gì cần thay đổi và lý do..."
            value={editRequest}
            onChange={(e) => setEditRequest(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button
            variant="outline"
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={handleSendRequest}
            disabled={isLoading || sendNotificationMutation.isPending}
          >
            {isLoading ? 'Đang xử lý...' : 'Gửi yêu cầu'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}