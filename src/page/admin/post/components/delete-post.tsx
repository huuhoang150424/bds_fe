import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import type { Post } from './columns';

interface DeletePostProps {
  post: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeletePost({
  post,
  open,
  onOpenChange
}: DeletePostProps) {
  const handleDelete = () => {
    // Add your delete logic here
    console.log("Deleting post:", post.id);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent 
          className="max-w-[400px]"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-[15px] text-gray-700">Xác nhận xóa bài đăng</DialogTitle>
            <DialogDescription className="text-[14px] text-gray-700">
              Bạn có chắc chắn muốn xóa bài đăng "{post.title}"? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="text-xs h-8 bg-white hover:bg-white text-gray-700"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="text-xs h-8 bg-red-500 hover:bg-red-600"
              onClick={handleDelete}
            >
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}