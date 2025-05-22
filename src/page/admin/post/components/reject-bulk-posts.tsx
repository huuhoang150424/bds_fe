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
import { useRejectPosts } from '../hooks/use-reject-post';

interface ConfirmBatchRejectDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  totalPosts: number;
  postIds: string[];
  resetSelection: () => void;
}

export default function ConfirmBatchRejectDialog({
  open,
  setOpen,
  totalPosts,
  postIds,
  resetSelection,
}: ConfirmBatchRejectDialogProps) {
  const [reason, setReason] = useState('');
  const { mutate: rejectPosts, isPending: isProcessing } = useRejectPosts();

  const handleConfirm = () => {
    if (postIds.length === 0 || !reason.trim()) return;

    rejectPosts(
      { postIds, reason },
      {
        onSuccess: () => {
          setOpen(false);
          resetSelection();
          setReason('');
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(open) => { setOpen(open); if (!open) setReason(''); }}>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-[15px] text-gray-700">Xác nhận từ chối bài đăng</DialogTitle>
          <DialogDescription className="text-[14px] text-gray-700">
            Bạn có chắc muốn từ chối {totalPosts} bài đăng đã chọn? Vui lòng nhập lý do từ chối.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="Nhập lý do từ chối..."
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
            onClick={() => { setOpen(false); setReason(''); }}
            disabled={isProcessing}
          >
            Hủy
          </Button>
          <Button
            className="text-xs h-8 bg-red-500 hover:bg-red-600 text-white"
            onClick={handleConfirm}
            disabled={isProcessing || !reason.trim()}
          >
            {isProcessing ? 'Đang từ chối...' : 'Từ chối'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}