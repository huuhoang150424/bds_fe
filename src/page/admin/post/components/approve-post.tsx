import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Post } from './columns';
import { useApprovePosts } from '../hooks/use-approve-post';
import { useSendNotification } from '../../notification/hooks/use-send-notification';

interface ApprovePostProps {
  post: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApprovePost({ post, open, onOpenChange }: ApprovePostProps) {
  const { mutate: approvePosts, isPending: isProcessing } = useApprovePosts();
  const { mutate: sendNotification, isPending: isSendingNotification } = useSendNotification();

  const handleApprove = () => {
    approvePosts(
      [post.id],
      {
        onSuccess: () => {
          const priorityMap: { [key: string]: number } = {
            low: 1,
            normal: 2,
            high: 3,
          };

          const notificationData = {
            userId: post.userId,
            message: `Bài đăng "${post.title}" của bạn đã được duyệt và hiện đang hiển thị công khai.`,
            priority: priorityMap['normal'],
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          };

          sendNotification(notificationData, {
            onSuccess: () => {
              onOpenChange(false);
            },
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[400px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-[15px] text-gray-700">Xác nhận duyệt bài đăng</DialogTitle>
          <DialogDescription className="text-[14px] text-gray-700">
            Bạn có chắc chắn muốn duyệt bài đăng "{post.title}"? Bài đăng sẽ được hiển thị công khai sau khi được duyệt.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            className="text-xs h-8 bg-white hover:bg-white text-gray-700"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing || isSendingNotification}
          >
            Hủy
          </Button>
          <Button
            variant="default"
            size="sm"
            className="text-xs h-8 bg-green-500 hover:bg-green-600 text-white"
            onClick={handleApprove}
            disabled={isProcessing || isSendingNotification}
          >
            {isProcessing || isSendingNotification ? 'Đang xử lý...' : 'Duyệt'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}