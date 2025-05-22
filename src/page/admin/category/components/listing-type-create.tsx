import type React from 'react';
import { useState } from 'react';
import { Plus, Loader2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ListingTypes } from './column';
import { z } from 'zod';
import { ListingTypeFormData, ListingTypeSchema } from '../schema/create-listingtype';
import { useCreateListingType } from '../hooks/use-create-listingtype';
import { toast } from '@/hooks/use-toast';

interface ListingTypeCreateDialogProps {
  trigger?: React.ReactNode;
}

export function ListingTypeCreateDialog({ trigger }: ListingTypeCreateDialogProps) {
  const [open, setOpen] = useState(false);
  const [listingTypeData, setListingTypeData] = useState<ListingTypeFormData>({
    listingType: '',
  });
  const [inputMode, setInputMode] = useState<'select' | 'custom'>('select');
  const [error, setError] = useState<string | null>(null);

  const createMutation = useCreateListingType();

  const handleListingTypeChange = (value: ListingTypes | string) => {
    setListingTypeData({
      listingType: value,
    });
    setError(null); 
  };

  const handleSubmit = async () => {
    try {
      ListingTypeSchema.parse(listingTypeData);

      await createMutation.mutateAsync(listingTypeData, {
        onSuccess: () => {
          setOpen(false); 
          setListingTypeData({ listingType: '' });
          setInputMode('select');
          setError(null); 
          toast({
            variant:'success',
            title:'Tạo mới danh mục thành công'
          })
        },
        onError: (err: any) => {
          setError(err.message || 'Không thể tạo loại danh sách');
        },
      });
    } catch (err) {
      setError('Đã xảy ra lỗi không mong muốn');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size='sm' className='h-8 text-[13px] bg-red-500 hover:bg-red-600 text-white'>
            <Plus className='mr-1.5 h-3 w-3' />
            Tạo loại danh sách
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-md border-red-100'>
        <DialogHeader>
          <DialogTitle className='text-base flex items-center gap-2'>
            <Tag className='h-4 w-4 text-red-500' />
            Tạo loại danh sách
          </DialogTitle>
          <DialogDescription className='text-[13px]'>
            Tạo loại danh sách mới cho bất động sản.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-2'>
          <div className='space-y-2'>
            <Label className='text-[13px] font-medium'>
              Chọn phương thức nhập <span className='text-red-500'>*</span>
            </Label>
            <RadioGroup
              value={inputMode}
              onValueChange={(value: 'select' | 'custom') => {
                setInputMode(value);
                setListingTypeData({ listingType: '' }); 
                setError(null); 
              }}
              className='flex gap-4'
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='select' id='select' />
                <Label htmlFor='select' className='text-[13px]'>
                  Chọn từ danh sách
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='custom' id='custom' />
                <Label htmlFor='custom' className='text-[13px]'>
                  Nhập tùy chỉnh
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='listingType' className='text-[13px] font-medium'>
              Loại danh sách <span className='text-red-500'>*</span>
            </Label>
            {inputMode === 'select' ? (
              <Select
                value={listingTypeData.listingType}
                onValueChange={(value: ListingTypes) => handleListingTypeChange(value)}
              >
                <SelectTrigger id='listingType' className='text-[13px] h-8'>
                  <SelectValue placeholder='Chọn loại danh sách' />
                </SelectTrigger>
                <SelectContent className='z-[99999]'>
                  {Object.values(ListingTypes).map((type) => (
                    <SelectItem key={type} value={type} className='text-[13px]'>
                      <div className='flex items-center gap-2'>
                        <Badge className='text-[12px] font-medium bg-red-100 text-red-700'>{type}</Badge>
                        <span>{type}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id='listingType'
                value={listingTypeData.listingType}
                onChange={(e) => handleListingTypeChange(e.target.value)}
                placeholder='Nhập loại danh sách'
                className='text-[13px] h-8 px-[12px] outline-none '
              />
            )}
            {error && <p className='text-red-500 text-[12px]'>{error}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='h-8 text-[13px]'
            onClick={() => {
              setOpen(false);
              setError(null);
              setListingTypeData({ listingType: '' });
              setInputMode('select');
            }}
            disabled={createMutation.isPending}
          >
            Hủy
          </Button>
          <Button
            type='button'
            size='sm'
            className='h-8 text-[13px] bg-red-500 hover:bg-red-600 text-white'
            onClick={handleSubmit}
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? (
              <>
                <Loader2 className='mr-1.5 h-3 w-3 animate-spin' />
                Đang tạo...
              </>
            ) : (
              <>
                <Plus className='mr-1.5 h-3 w-3' />
                Tạo loại danh sách
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}