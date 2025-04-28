import React from 'react';

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
export default function ListingTypeDelete({
  selectedListingType,
  deleteDialogOpen,
  setDeleteDialogOpen,
}: {
  selectedListingType: any;
  deleteDialogOpen: any;
  setDeleteDialogOpen: any;
}) {
  const handleDelete = () => {};
  const isPending = false;
  return (
    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogContent className='border-red-100 w-[35%] '>
        <DialogHeader>
          <DialogTitle className='text-base text-red-500'>Xóa loại danh sách</DialogTitle>
          <DialogDescription className='text-[14px] '>
            Bạn có chắc chắn muốn xóa loại danh sách này? Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        {selectedListingType && (
          <div className='my-2 rounded-md bg-red-50 p-3 border border-red-100'>
            <h4 className='text-[14px]  font-medium text-red-800 mb-1'>Bạn sắp xóa:</h4>
            <div className='flex items-center gap-2'>
              <Badge className='text-[12px] font-medium bg-red-100 text-red-700'>
                {selectedListingType.listingType}
              </Badge>
            </div>
            {selectedListingType.propertyCount && selectedListingType.propertyCount > 0 && (
              <div className='mt-2 p-2 bg-red-100 rounded text-[12px] text-red-800 mt-4'>
                <strong>Cảnh báo:</strong> Loại danh sách này hiện đang được sử dụng bởi{' '}
                {selectedListingType.propertyCount} bất động sản. Việc xóa có thể ảnh hưởng đến các bất động sản này.
              </div>
            )}
          </div>
        )}
        <DialogFooter>
          <Button className='h-8 text-[14px] '>Hủy</Button>
          <Button
            className='h-8 text-[14px]  bg-red-500 hover:bg-red-600 text-white'
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
