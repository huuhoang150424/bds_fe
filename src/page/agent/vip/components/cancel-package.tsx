
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
    cancel(packageId, {
      onSuccess: (response) => {
        if (!response.success) {
          setError(response.message || 'Hủy gói không thành công. Vui lòng thử lại.');
          return;
        }
        toast({
          title: 'Hủy gói thành công',
          description: `Bạn đã hủy gói ${packageName}. Số tiền hoàn lại: ${response.data.refundAmount.toLocaleString()}đ`,
          variant: 'success',
        });
        onClose();
      },
      onError: (error: any) => {
        setError(error.message || 'Đã có lỗi xảy ra khi hủy gói. Vui lòng thử lại.');
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
            className="text-[14px] bg-red-500 hover:bg-red-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Đang xử lý...
              </span>
            ) : (
              'Xác nhận hủy'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};