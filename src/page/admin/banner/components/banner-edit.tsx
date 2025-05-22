import { useState, useCallback, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CalendarIcon, ImageIcon, Loader2, Link2, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { formSchema, FormValues } from '../schema/create-banner';
import { useEditBanner } from '../hooks/use-edit-banner';

interface BannerEditDialogProps {
  banner: any; 
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BannerEditDialog({ banner, open, onOpenChange }: BannerEditDialogProps) {
  const [images, setImages] = useState<File[]>([]);
  const [deletedImageUrls, setDeletedImageUrls] = useState<string[]>([]);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      images: [],
      targetUrl: '',
      displayOrder: 1,
      isActive: true,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    },
  });

  const resetForm = useCallback(() => {
    if (banner) {
      form.reset({
        title: banner.title || '',
        images: [], 
        targetUrl: banner.targetUrl || '',
        displayOrder: banner.displayOrder || 1,
        isActive: banner.isActive || false,
        startDate: new Date(banner.startDate) || new Date(),
        endDate: new Date(banner.endDate) || new Date(new Date().setMonth(new Date().getMonth() + 1)),
      });
      setImages([]);
    }
  }, [form, banner]);

  useEffect(() => {
    if (open && banner) {
      resetForm();
    }
  }, [open, banner, resetForm]);

  const { mutate, isPending } = useEditBanner(() => {
    resetForm();
    onOpenChange(false);
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...images, ...acceptedFiles];
      setImages(newFiles);
      form.setValue('images', newFiles, { shouldValidate: true });
    },
    [images, form],
  );

  const removeImage = (index: number) => {
    const newFiles = images.filter((_, i) => i !== index);
    setImages(newFiles);
    form.setValue('images', newFiles, { shouldValidate: true });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxSize: 5 * 1024 * 1024,
  });


  const removeExistingImage = (url: string) => {
    setDeletedImageUrls((prev) => [...prev, url]); 
  };
  async function onSubmit(values: FormValues) {
    const formData:any = new FormData();
    formData.append('title', values.title);
    formData.append('targetUrl', values.targetUrl);
    formData.append('displayOrder', values.displayOrder.toString());
    formData.append('isActive', values.isActive.toString());
    formData.append('startDate', values.startDate.toISOString());
    formData.append('endDate', values.endDate.toISOString());
    images.forEach((file) => formData.append('images', file)); // New images as files
    deletedImageUrls.forEach((url) => formData.append('deletedImageUrls[]', url)); // URLs to delete
    mutate({ data: formData, bannerId: banner.id });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle className='text-lg font-medium'>Chỉnh sửa Banner</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <div className='grid gap-5 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[14px] text-gray-700 font-[500]'>Tiêu đề Banner</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập tiêu đề banner'
                        {...field}
                        className='text-[14px] text-gray-700 px-[16px] py-[6px] outline-none'
                      />
                    </FormControl>
                    <FormDescription className='text-[11px]'>Tiêu đề mô tả để tham khảo nội bộ.</FormDescription>
                    <FormMessage className='text-[11px]' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='displayOrder'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[14px] text-gray-700 font-[500]'>Thứ tự hiển thị</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={1}
                        {...field}
                        className='text-[14px] text-gray-700 px-[16px] py-[6px] outline-none'
                      />
                    </FormControl>
                    <FormDescription className='text-[11px]'>Số nhỏ hơn sẽ hiển thị trước.</FormDescription>
                    <FormMessage className='text-[11px]' />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='images'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[14px] text-gray-700 font-[500]'>Ảnh Banner</FormLabel>
                  <FormControl>
                    <div className='space-y-4'>
                      <div
                        {...getRootProps()}
                        className={cn(
                          'border-2 border-dashed rounded-md p-4 text-center',
                          isDragActive ? 'border-red-500 bg-red-50' : 'border-gray-300',
                        )}
                      >
                        <input {...getInputProps()} />
                        <ImageIcon className='mx-auto h-8 w-8 text-gray-400' />
                        <p className='mt-2 text-sm text-gray-600'>
                          {isDragActive ? 'Thả ảnh vào đây...' : 'Kéo và thả ảnh hoặc nhấp để chọn ảnh'}
                        </p>
                        <p className='text-xs text-gray-500'>Hỗ trợ file ảnh, tối đa 5MB mỗi file.</p>
                      </div>

                      {JSON.parse(banner?.imageUrls)?.length > 0 && (
                        <div className='space-y-2'>
                          {JSON.parse(banner?.imageUrls)?.map((url: string, index: number) => (
                            !deletedImageUrls.includes(url) && ( // Only show images not marked for deletion
                              <div
                                key={`existing-${index}`}
                                className='flex items-center justify-between p-2 bg-gray-50 rounded-md border border-gray-200'
                              >
                                <div className='flex items-center gap-2'>
                                  <img src={url} alt={`Existing image ${index}`} className='h-10 w-10 object-cover rounded' />
                                  <span className='text-sm text-gray-700 truncate max-w-[200px]'>Existing Image</span>
                                </div>
                                <Button
                                  type='button'
                                  variant='ghost'
                                  size='icon'
                                  onClick={() => removeExistingImage(url)}
                                >
                                  <X className='h-4 w-4 text-red-500' />
                                </Button>
                              </div>
                            )
                          ))}
                        </div>
                      )}

                      {images.length > 0 && (
                        <div className='space-y-2'>
                          {images.map((file, index) => (
                            <div
                              key={`new-${index}`}
                              className='flex items-center justify-between p-2 bg-gray-50 rounded-md border border-gray-200'
                            >
                              <div className='flex items-center gap-2'>
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                  className='h-10 w-10 object-cover rounded'
                                />
                                <span className='text-sm text-gray-700 truncate max-w-[200px]'>{file.name}</span>
                              </div>
                              <Button type='button' variant='ghost' size='icon' onClick={() => removeImage(index)}>
                                <X className='h-4 w-4 text-red-500' />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription className='text-[11px]'>
                    Tải lên các ảnh banner mới. Kích thước đề xuất: 1200×300px.
                  </FormDescription>
                  <FormMessage className='text-[11px]' />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name='targetUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[14px] text-gray-700 font-[500]'>URL mục tiêu</FormLabel>
                  <FormControl>
                    <div className='flex items-center gap-2'>
                      <Input
                        placeholder='https://example.com/trang-dich'
                        {...field}
                        className='text-[14px] text-gray-700 px-[16px] py-[6px] outline-none'
                      />
                      <Button type='button' variant='outline' size='icon' className='shrink-0 h-8 w-8'>
                        <Link2 className='h-3 w-3' />
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription className='text-[11px]'>
                    URL mà người dùng sẽ được chuyển đến khi nhấp vào banner.
                  </FormDescription>
                  <FormMessage className='text-[11px]' />
                </FormItem>
              )}
            />

            <div className='grid gap-5 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel className='text-[14px] text-gray-700 font-[500]'>Ngày bắt đầu</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'h-8 text-xs w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Chọn ngày</span>}
                            <CalendarIcon className='ml-auto h-3 w-3 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription className='text-[11px]'>Thời điểm banner bắt đầu hiển thị.</FormDescription>
                    <FormMessage className='text-[11px]' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='endDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel className='text-[14px] text-gray-700 font-[500]'>Ngày kết thúc</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'h-8 text-xs w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Chọn ngày</span>}
                            <CalendarIcon className='ml-auto h-3 w-3 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription className='text-[11px]'>Thời điểm banner ngừng hiển thị.</FormDescription>
                    <FormMessage className='text-[11px]' />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='isActive'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border border-red-100 p-3'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-[14px] text-gray-700 font-[500]'>Trạng thái kích hoạt</FormLabel>
                    <FormDescription className='text-[11px]'>Bật hoặc tắt banner này.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className='data-[state=checked]:bg-red-500'
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Separator className='bg-red-100' />

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
                className='h-8 text-xs'
              >
                Hủy
              </Button>
              <Button
                type='submit'
                variant='outline'
                disabled={isPending}
                className='h-8 text-xs bg-red-500 hover:bg-red-600 text-white'
              >
                {isPending && <Loader2 className='mr-1.5 h-3 w-3 animate-spin' />}
                {isPending ? 'Đang xử lý...' : 'Cập nhật Banner'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}