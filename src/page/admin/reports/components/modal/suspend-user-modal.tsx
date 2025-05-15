import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Ban } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useSendNotification } from '@/page/admin/notification/hooks/use-send-notification';
import { useToggleLockUser } from '@/page/admin/user/hooks/use-tonggle-lockuser';

interface SuspendUserModalProps {
  report: any;
}

export function SuspendUserModal({ report }: SuspendUserModalProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [duration, setDuration] = useState('7');
  const [isLoading, setIsLoading] = useState(false);
  const toggleLockUserMutation = useToggleLockUser();
  const sendNotificationMutation = useSendNotification();

  const handleSuspend = async () => {
    if (!reason.trim()) {
      toast({ title: 'Lỗi', description: 'Vui lòng nhập lý do khóa tài khoản.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      await toggleLockUserMutation.mutateAsync({ userId: report.user.id, action: 'LOCK' });
      
      const notificationData = {
        message: `Tài khoản của bạn đã bị khóa ${duration === 'permanent' ? 'vĩnh viễn' : `trong ${duration} ngày`} vì: ${reason}`,
        userId: report.user.id,
        endDate: new Date(Date.now() + (duration === 'permanent' ? 100 * 365 * 24 * 60 * 60 * 1000 : parseInt(duration) * 24 * 60 * 60 * 1000)).toISOString(),
        priority: 4,
      };
      
      await sendNotificationMutation.mutateAsync(notificationData);
      toast({ title: 'Thành công', description: 'Tài khoản đã bị khóa và thông báo đã được gửi.', variant: 'success' });
      setOpen(false);
      setReason('');
      setDuration('7');
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message || 'Không thể khóa tài khoản.',
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
          <Ban className="mr-2 h-4 w-4" />
          Khóa tài khoản
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[35%]">
        <DialogHeader>
          <DialogTitle>Khóa tài khoản người dùng</DialogTitle>
          <DialogDescription>Tạm thời hoặc vĩnh viễn khóa tài khoản người dùng này.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            placeholder="Lý do khóa tài khoản (sẽ được gửi đến người dùng)..."
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
            onClick={handleSuspend}
            disabled={isLoading || toggleLockUserMutation.isPending || sendNotificationMutation.isPending}
          >
            {isLoading ? 'Đang xử lý...' : 'Khóa tài khoản'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}