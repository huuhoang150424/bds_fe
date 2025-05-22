import React, { useState } from 'react';
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
import { Loader2 } from 'lucide-react';
import { ListingType } from './column';
import { useDeleteListingType } from '../hooks/use-delete-listingtype';
import { toast } from '@/hooks/use-toast';

interface ListingTypeDeleteProps {
  selectedListingType: ListingType;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
}

export default function ListingTypeDelete({
  selectedListingType,
  deleteDialogOpen,
  setDeleteDialogOpen,
}: ListingTypeDeleteProps) {
  const [error, setError] = useState<string | null>(null);
  const deleteMutation = useDeleteListingType();

  const handleDelete = async () => {
    try {
      setError(null); 
      await deleteMutation.mutateAsync(selectedListingType.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false); 
          toast({
            variant:'success',
            title:'Tạo mới danh mục thành công'
          })
        },
        onError: (err: any) => {
          setError(err.message || 'Không thể xóa loại danh sách');
        },
      });
    } catch (err) {
      setError('Đã xảy ra lỗi không mong muốn');
    }
  };

  return (
    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogContent className='border-red-100 w-[35%]'>
        <DialogHeader>
          <DialogTitle className='text-base text-red-500'>Xóa loại danh sách</DialogTitle>
          <DialogDescription className='text-[14px]'>
            Bạn có chắc chắn muốn xóa loại danh sách này? Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        {selectedListingType && (
          <div className='my-2 rounded-md bg-red-50 p-3 border border-red-100'>
            <h4 className='text-[14px] font-medium text-red-800 mb-1'>Bạn sắp xóa:</h4>
            <div className='flex items-center gap-2'>
              <Badge className='text-[12px] font-medium bg-red-100 text-red-700'>
                {selectedListingType.listingType}
              </Badge>
            </div>
            {selectedListingType.propertyCount && selectedListingType.propertyCount > 0 && (
              <div className='mt-2 p-2 bg-red-100 rounded text-[12px] text-red-800'>
                <strong>Cảnh báo:</strong> Loại danh sách này hiện đang được sử dụng bởi{' '}
                {selectedListingType.propertyCount} bất động sản. Việc xóa có thể ảnh hưởng đến các bất động sản này.
              </div>
            )}
            {error && (
              <div className='mt-2 p-2 bg-red-100 rounded text-[12px] text-red-800'>
                <strong>Lỗi:</strong> {error}
              </div>
            )}
          </div>
        )}
        <DialogFooter>
          <Button
            className='h-8 text-[14px]'
            variant='outline'
            onClick={() => {
              setDeleteDialogOpen(false);
              setError(null);
            }}
            disabled={deleteMutation.isPending}
          >
            Hủy
          </Button>
          <Button
            className='h-8 text-[14px] bg-red-500 hover:bg-red-600 text-white'
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? (
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