import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useSendNotification } from '@/page/admin/notification/hooks/use-send-notification';

interface WarnUserModalProps {
  report: any;
}

export function WarnUserModal({ report }: WarnUserModalProps) {
  const [open, setOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const sendNotificationMutation = useSendNotification();

  const handleSendWarning = async () => {
    if (!warningMessage.trim()) {
      toast({ title: 'Lỗi', description: 'Vui lòng nhập nội dung cảnh báo.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      const notificationData = {
        message: `Cảnh báo: ${warningMessage}`,
        userId: report.user.id,
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 3,
      };
      await sendNotificationMutation.mutateAsync(notificationData);
      toast({ title: 'Thành công', description: 'Cảnh báo đã được gửi đến người dùng.', variant: 'success' });
      setOpen(false);
      setWarningMessage('');
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message || 'Không thể gửi cảnh báo.',
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
          <AlertCircle className="mr-2 h-4 w-4" />
          Cảnh báo người dùng
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[35%]">
        <DialogHeader>
          <DialogTitle>Gửi cảnh báo</DialogTitle>
          <DialogDescription>Gửi cảnh báo đến người dùng về nội dung của họ.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            placeholder="Nội dung cảnh báo gửi đến người dùng..."
            value={warningMessage}
            onChange={(e) => setWarningMessage(e.target.value)}
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
            onClick={handleSendWarning}
            disabled={isLoading || sendNotificationMutation.isPending}
          >
            {isLoading ? 'Đang xử lý...' : 'Gửi cảnh báo'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}