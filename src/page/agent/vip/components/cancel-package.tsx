import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCancelPricing } from '../hooks/use-cancel-pricing';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface CancelPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  packageId: string;
}

export const CancelPackageModal = ({ isOpen, onClose, packageName, packageId }: CancelPackageModalProps) => {
  const [error, setError] = useState<string | null>(null);
  const { mutate: cancel, isPending: isLoading } = useCancelPricing();

  const handleCancel = () => {
    setError(null);
    cancel(undefined, {
      onSuccess: (response) => {
        if (!response.success) {
          setError(response.message);
          return;
        }
        toast({
          title: 'Hủy gói thành công',
          description: response.message,
          variant: 'default',
        });
        onClose();
      },
      onError: () => {
        setError('Đã có lỗi xảy ra khi hủy gói. Vui lòng thử lại.');
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[14px] font-semibold">Hủy gói {packageName}</DialogTitle>
          <DialogDescription className="text-[14px]">
            Bạn có chắc muốn hủy gói {packageName}? Số tiền sẽ được hoàn lại nếu hủy trong vòng 3 ngày kể từ ngày mua.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="text-red-500 text-[14px] mt-2">{error}</div>
        )}
        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-[14px]"
            disabled={isLoading}
          >
            Đóng
          </Button>
          <Button
            onClick={handleCancel}
            className="text-[14px]"
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Xác nhận hủy'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};