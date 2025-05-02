import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useApprovePosts } from '../hooks/use-approve-post';

interface ConfirmBatchVerifyDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  totalPosts: number;
  postIds: string[];
  resetSelection: () => void;
}

export default function ConfirmBatchVerifyDialog({
  open,
  setOpen,
  totalPosts,
  postIds,
  resetSelection,
}: ConfirmBatchVerifyDialogProps) {
  const { mutate: approvePosts, isPending: isProcessing } = useApprovePosts();

  const handleConfirm = () => {
    if (postIds.length === 0) return;

    approvePosts(postIds, {
      onSuccess: () => {
        setOpen(false);
        resetSelection();
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-[15px] text-gray-700">Xác nhận duyệt bài đăng</DialogTitle>
          <DialogDescription className="text-[14px] text-gray-700">
            Bạn có chắc muốn duyệt {totalPosts} bài đăng đã chọn? Các bài đăng sẽ được hiển thị công khai sau khi duyệt.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            className="text-xs h-8 bg-white hover:bg-white text-gray-700"
            onClick={() => setOpen(false)}
            disabled={isProcessing}
          >
            Hủy
          </Button>
          <Button
            className="text-xs h-8 bg-green-500 hover:bg-green-600 text-white"
            onClick={handleConfirm}
            disabled={isProcessing}
          >
            {isProcessing ? 'Đang duyệt...' : 'Duyệt'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}