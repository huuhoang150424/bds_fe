import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { ListingType } from './column';
import { ListingTypeFormData, ListingTypeSchema } from '../schema/create-listingtype';
import { useUpdateListingType } from '../hooks/use-update-listingtype';
import { toast } from '@/hooks/use-toast';

interface ListingTypeEditProps {
  selectedListingType: ListingType;
  editDialogOpen: boolean;
  setEditDialogOpen: (open: boolean) => void;
}

export default function ListingTypeUpdate({
  selectedListingType,
  editDialogOpen,
  setEditDialogOpen,
}: ListingTypeEditProps) {
  const [formData, setFormData] = useState<ListingTypeFormData>({
    listingType: selectedListingType.listingType,
  });
  const [error, setError] = useState<string | null>(null);
  const updateMutation = useUpdateListingType();
  useEffect(() => {
    setFormData({ listingType: selectedListingType.listingType });
    setError(null);
  }, [selectedListingType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ listingType: e.target.value });
    setError(null); 
  };

  const handleSubmit = async () => {
    try {
      const validatedData = ListingTypeSchema.parse(formData);
      console.log("Submitting update for listingType ID:", selectedListingType.id, "data:", validatedData); 

      await updateMutation.mutateAsync(
        { id: selectedListingType.id, listingType: validatedData },
        {
          onSuccess: () => {
            setEditDialogOpen(false); 
            setError(null); 
            toast({
              variant:'success',
              title:'cập nhật danh mục thành công'
            })
          },
          onError: (err: any) => {
            setError(err.message || 'Không thể cập nhật loại danh sách');
          },
        }
      );
    } catch (error:any) {
      setError( 'Không thể cập nhất loại danh sách');
    } 
  };

  return (
    <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
      <DialogContent className='border-red-100 w-[35%]'>
        <DialogHeader>
          <DialogTitle className='text-base text-red-500'>Chỉnh sửa loại danh sách</DialogTitle>
          <DialogDescription className='text-[14px]'>
            Cập nhật loại danh sách cho bất động sản.
          </DialogDescription>
        </DialogHeader>
        <div className='my-2 space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='listingType' className='text-[14px] font-medium'>
              Loại danh sách <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='listingType'
              value={formData.listingType}
              onChange={handleInputChange}
              placeholder='Nhập loại danh sách'
              className='text-[14px] h-8 outline-none px-[12px] '
            />
            {error && (
              <p className='text-red-500 text-[12px]'>{error}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            className='h-8 text-[14px]'
            variant='outline'
            onClick={() => {
              setEditDialogOpen(false);
              setFormData({ listingType: selectedListingType.listingType });
              setError(null);
            }}
            disabled={updateMutation.isPending}
          >
            Hủy
          </Button>
          <Button
            className='h-8 text-[14px] bg-red-500 hover:bg-red-600 text-white'
            onClick={handleSubmit}
            disabled={updateMutation.isPending || !formData.listingType}
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className='mr-1.5 h-3 w-3 animate-spin' />
                Đang cập nhật...
              </>
            ) : (
              'Cập nhật'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}