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
import { ListingTypes } from './column';
interface ListingTypeCreateDialogProps {
  trigger?: React.ReactNode;
  onListingTypeCreated?: (listingType: any) => void;
}

export function ListingTypeCreateDialog({ trigger, onListingTypeCreated }: ListingTypeCreateDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listingTypeData, setListingTypeData] = useState({
    listingType: '' as ListingTypes,
    slug: '',
  });
  const generateSlug = (type: string) => {
    return type
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  };
  const handleListingTypeChange = (value: ListingTypes) => {
    const slug = generateSlug(value);
    setListingTypeData({
      listingType: value,
      slug: slug,
    });
  };
  const handleSubmit = async () => {};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size='sm' className='h-8 text-[13px]  bg-red-500 hover:bg-red-600 text-white '>
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
          <DialogDescription className='text-[13px] '>Tạo loại danh sách mới cho bất động sản.</DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-2'>
          <div className='space-y-2'>
            <Label htmlFor='listingType' className='text-[13px]  font-medium'>
              Loại danh sách <span className='text-red-500'>*</span>
            </Label>
            <Select
              value={listingTypeData.listingType}
              onValueChange={(value: ListingTypes) => handleListingTypeChange(value)}
            >
              <SelectTrigger id='listingType' className='text-[13px]  h-8'>
                <SelectValue placeholder='Chọn loại danh sách' />
              </SelectTrigger>
              <SelectContent className='z-[99999] '>
                {Object.values(ListingTypes).map((type) => (
                  <SelectItem key={type} value={type} className='text-[13px] '>
                    <div className='flex items-center gap-2'>
                      <Badge className='text-[12px] font-medium bg-red-100 text-red-700'>{type}</Badge>
                      <span>{type}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='slug' className='text-[13px]  font-medium'>
              Slug
            </Label>
            <Input id='slug' className='text-[13px] pl-[12px] h-8 font-mono' value={listingTypeData.slug} disabled readOnly />
            <p className='text-[12px] text-muted-foreground'>Slug được tạo tự động từ loại danh sách.</p>
          </div>
        </div>

        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='h-8 text-[13px] '
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            Hủy
          </Button>
          <Button type='button' size='sm' className='h-8 text-[13px]  bg-red-500 hover:bg-red-600 text-white ' onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
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
