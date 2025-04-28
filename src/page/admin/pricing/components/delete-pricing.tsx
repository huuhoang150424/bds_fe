import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatCurrency, PricingLevel } from './column';
import { Button } from '@/components/ui/button';

interface DeletePricingProps {
  selectedPricing: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
}

export default function DeletePricing({
  selectedPricing,
  open = false,
  onOpenChange,
  onConfirm,
}: DeletePricingProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='border-red-100 w-[35%]'>
        <DialogHeader>
          <DialogTitle className='text-[15px] text-red-500'>Xóa Gói Giá</DialogTitle>
          <DialogDescription className='text-[13px]'>
            Bạn có chắc chắn muốn xóa gói giá này không? Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        {selectedPricing && (
          <div className='my-2 rounded-md bg-red-50 p-3 border border-red-100'>
            <h4 className='text-[13px] font-medium text-red-800 mb-1'>Bạn sắp xóa:</h4>
            <div className='flex items-center gap-2'>
              <Badge
                className={`text-[13px] font-medium ${
                  selectedPricing.name === PricingLevel.FREE
                    ? 'bg-gray-100 text-gray-700'
                    : selectedPricing.name === PricingLevel.BASIC
                      ? 'bg-blue-100 text-blue-700'
                      : selectedPricing.name === PricingLevel.STANDARD
                        ? 'bg-green-100 text-green-700'
                        : selectedPricing.name === PricingLevel.PREMIUM
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-red-100 text-red-700'
                }`}
              >
                {selectedPricing.name}
              </Badge>
              <p className='text-[13px] text-red-700 font-medium'>{selectedPricing.description}</p>
            </div>
            <p className='text-[13px] text-red-600 mt-1'>
              Giá: {formatCurrency(selectedPricing.price)} | Mã: {selectedPricing.id}
            </p>
            {selectedPricing.userCount && selectedPricing.userCount > 0 && (
              <div className='mt-2 p-2 bg-red-100 rounded text-[13px] text-red-800'>
                <strong>Cảnh báo:</strong> Gói này đang được sử dụng bởi {selectedPricing.userCount} người dùng. Xóa gói có thể ảnh hưởng đến đăng ký của họ.
              </div>
            )}
          </div>
        )}
        <DialogFooter>
          <Button
            className='h-9 text-[13px]'
            variant={'outline'}
            onClick={() => onOpenChange && onOpenChange(false)}
          >
            Hủy
          </Button>
          <Button
            className='h-9 text-[13px] bg-red-500 hover:bg-red-600 text-white'
            onClick={onConfirm}
          >
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}