import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useDeleteNotification } from '../hooks/use-delete-notification';

interface NotificationDeleteDialogProps {
  notificationId: string | '';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationDeleteDialog({ notificationId, open, onOpenChange }: NotificationDeleteDialogProps) {
  const { mutate: deleteNotification, isPending } = useDeleteNotification();

  if (!notificationId) return null;

  const handleDelete = () => {
    deleteNotification(notificationId, {
      onSuccess: () => {
        onOpenChange(false); 
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-[400px]'>
        <DialogHeader>
          <DialogTitle className='text-[15px] text-gray-700'>Xác nhận xóa thông báo</DialogTitle>
          <DialogDescription className='text-[14px] text-gray-700'>
            Bạn có chắc chắn muốn xóa thông báo. Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant='outline'
            size='sm'
            className='text-xs h-8 bg-white hover:bg-gray-100 text-gray-700'
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Hủy
          </Button>
          <Button
            variant='destructive'
            size='sm'
            className='text-xs h-8 bg-red-500 hover:bg-red-600'
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className='mr-1.5 h-3 w-3 animate-spin' />
                Đang xóa...
              </>
            ) : (
              'Xóa'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
