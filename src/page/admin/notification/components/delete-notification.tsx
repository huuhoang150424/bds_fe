import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { type Notification } from "./column";

interface NotificationDeleteDialogProps {
  notification: Notification | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (id: string) => void;
}

export function NotificationDeleteDialog({
  notification,
  open,
  onOpenChange,
  onConfirm,
}: NotificationDeleteDialogProps) {
  if (!notification) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-[15px] text-gray-700">Xác nhận xóa thông báo</DialogTitle>
          <DialogDescription className="text-[14px] text-gray-700">
            Bạn có chắc chắn muốn xóa thông báo này? Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button asChild>
            <Button
              variant={'outline'}
              className="text-xs h-8 bg-white hover:bg-white text-gray-700"
            >
              Hủy
            </Button>
          </Button>
          <Button asChild>
            <Button
              variant="destructive"
              size="sm"
              className="text-xs h-8 bg-red-500 hover:bg-red-600"
              onClick={() => onConfirm(notification.id)}
            >
              Xóa
            </Button>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}