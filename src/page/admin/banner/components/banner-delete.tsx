import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDeleteBanner } from '../hooks/use-delete-banner';

export default function BannerDelete({
  selectedBanner,
  deleteDialogOpen,
  setDeleteDialogOpen,
}: {
  selectedBanner: {
    id: string;
    title: string;
    isActive: boolean;
    startDate: string;
    endDate: string;
    targetUrl: string;
    imageUrls: string[];
    displayOrder: number;
    createdAt: string;
    updatedAt: string;
  } | null;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
}) {
  const { mutate: deleteBanner, isPending } = useDeleteBanner();

  const handleDelete = () => {
    if (selectedBanner?.id) {
      deleteBanner(selectedBanner.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
        },
      });
    }
  };

  return (
    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogContent className='border-red-100 w-[35%]'>
        <DialogHeader>
          <DialogTitle className='text-base text-red-500'>Xóa Banner?</DialogTitle>
          <DialogDescription className='text-[14px]'>
            Bạn có chắc chắn muốn xóa banner này? Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        {selectedBanner && (
          <div className='my-2 rounded-md bg-red-50 p-3 border border-red-100'>
            <h4 className='text-[14px] font-medium text-red-800 mb-1'>Bạn sắp xóa:</h4>
            <div className='flex items-center gap-2'>
              <Badge className='text-[12px] font-medium bg-red-100 text-red-700'>
                {selectedBanner.title}
              </Badge>
              <span className='text-[12px] text-red-700'>
                {selectedBanner.isActive ? 'Đang hoạt động' : 'Không hoạt động'}
              </span>
            </div>
            <div className='mt-2 text-[12px] text-red-800'>
              <p><strong>Liên kết:</strong> {selectedBanner.targetUrl}</p>
              <p><strong>Ngày bắt đầu:</strong> {new Date(selectedBanner.startDate).toLocaleDateString()}</p>
              <p><strong>Ngày kết thúc:</strong> {new Date(selectedBanner.endDate).toLocaleDateString()}</p>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            variant={'outline'}
            className='h-8 text-[14px]'
            onClick={() => setDeleteDialogOpen(false)}
            disabled={isPending}
          >
            Hủy
          </Button>
          <Button
            className='h-8 text-[14px] bg-red-500 hover:bg-red-600 text-white'
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'Đang xóa...' : 'Xóa'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}