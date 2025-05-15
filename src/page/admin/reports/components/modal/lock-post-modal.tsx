import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface LockPostModalProps {
  report: any;
}

export function LockPostModal({ report }: LockPostModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Lock className="mr-2 h-4 w-4" />
          Khóa bài viết
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[35%]">
        <DialogHeader>
          <DialogTitle>Khóa bài viết</DialogTitle>
          <DialogDescription>Tạm thời khóa bài viết này trong quá trình điều tra.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button
            variant="outline"
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={() => {}}
          >
            Khóa bài viết
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}