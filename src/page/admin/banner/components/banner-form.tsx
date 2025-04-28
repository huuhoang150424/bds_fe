import { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CalendarIcon, ImageIcon, Loader2, Link2, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const formSchema = z.object({
  title: z.string().min(3, {
    message: 'Tiêu đề phải có ít nhất 3 ký tự.',
  }),
  images: z
    .array(z.instanceof(File))
    .min(1, {
      message: 'Vui lòng chọn ít nhất một ảnh.',
    })
    .refine((files) => files.every((file) => file.type.startsWith('image/')), {
      message: 'Chỉ được phép tải lên file ảnh.',
    })
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: 'Kích thước mỗi ảnh không được vượt quá 5MB.',
    }),
  target_url: z.string().url({
    message: 'Vui lòng nhập URL mục tiêu hợp lệ.',
  }),
  display_order: z.coerce.number().int().positive({
    message: 'Thứ tự hiển thị phải là số dương.',
  }),
  is_active: z.boolean().default(true),
  start_date: z.date({
    required_error: 'Ngày bắt đầu là bắt buộc.',
  }),
  end_date: z
    .date({
      required_error: 'Ngày kết thúc là bắt buộc.',
    })
    .refine((date) => date > new Date(), {
      message: 'Ngày kết thúc phải ở tương lai.',
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function BannerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      images: [],
      target_url: '',
      display_order: 1,
      is_active: true,
      start_date: new Date(),
      end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...images, ...acceptedFiles];
      setImages(newFiles);
      form.setValue('images', newFiles, { shouldValidate: true });
    },
    [images, form]
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

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('target_url', values.target_url);
      formData.append('display_order', values.display_order.toString());
      formData.append('is_active', values.is_active.toString());
      formData.append('start_date', values.start_date.toISOString());
      formData.append('end_date', values.end_date.toISOString());
      values.images.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });

      console.log('FormData:', Object.fromEntries(formData));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="overflow-hidden border border-gray-200 rounded-[8px]">
      <CardContent className="p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-gray-700 font-[500]">Tiêu đề Banner</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tiêu đề banner"
                        {...field}
                        className="text-[14px] text-gray-700 px-[16px] py-[6px] outline-none"
                      />
                    </FormControl>
                    <FormDescription className="text-[11px]">
                      Tiêu đề mô tả để tham khảo nội bộ.
                    </FormDescription>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="display_order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-gray-700 font-[500]">Thứ tự hiển thị</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        className="text-[14px] text-gray-700 px-[16px] py-[6px] outline-none"
                      />
                    </FormControl>
                    <FormDescription className="text-[11px]">
                      Số nhỏ hơn sẽ hiển thị trước.
                    </FormDescription>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] text-gray-700 font-[500]">Ảnh Banner</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div
                        {...getRootProps()}
                        className={cn(
                          'border-2 border-dashed rounded-md p-4 text-center',
                          isDragActive ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        )}
                      >
                        <input {...getInputProps()} />
                        <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          {isDragActive
                            ? 'Thả ảnh vào đây...'
                            : 'Kéo và thả ảnh hoặc nhấp để chọn ảnh'}
                        </p>
                        <p className="text-xs text-gray-500">Hỗ trợ file ảnh, tối đa 5MB mỗi file.</p>
                      </div>

                      {images.length > 0 && (
                        <div className="space-y-2">
                          {images.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded-md border border-gray-200 "
                            >
                              <div className="flex items-center gap-2">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                  className="h-10 w-10 object-cover rounded"
                                />
                                <span className="text-sm text-gray-700 truncate max-w-[200px]">
                                  {file.name}
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeImage(index)}
                              >
                                <X className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription className="text-[11px]">
                    Tải lên các ảnh banner. Kích thước đề xuất: 1200×300px.
                  </FormDescription>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="target_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] text-gray-700 font-[500]">URL mục tiêu</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="https://example.com/trang-dich"
                        {...field}
                        className="text-[14px] text-gray-700 px-[16px] py-[6px] outline-none"
                      />
                      <Button type="button" variant="outline" size="icon" className="shrink-0 h-8 w-8">
                        <Link2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription className="text-[11px]">
                    URL mà người dùng sẽ được chuyển đến khi nhấp vào banner.
                  </FormDescription>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[14px] text-gray-700 font-[500]">Ngày bắt đầu</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'h-8 text-xs w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Chọn ngày</span>}
                            <CalendarIcon className="ml-auto h-3 w-3 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription className="text-[11px]">
                      Thời điểm banner bắt đầu hiển thị.
                    </FormDescription>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[14px] text-gray-700 font-[500]">Ngày kết thúc</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'h-8 text-xs w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Chọn ngày</span>}
                            <CalendarIcon className="ml-auto h-3 w-3 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription className="text-[11px]">
                      Thời điểm banner ngừng hiển thị.
                    </FormDescription>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-red-100 p-3">
                  <div className="space-y-0.5">
                    <FormLabel className="text-[14px] text-gray-700 font-[500]">
                      Trạng thái kích hoạt
                    </FormLabel>
                    <FormDescription className="text-[11px]">
                      Bật hoặc tắt banner này.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-red-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Separator className="bg-red-100" />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  setImages([]);
                }}
                className="h-8 text-xs"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                variant="outline"
                disabled={isSubmitting}
                className="h-8 text-xs bg-red-500 hover:bg-red-600 text-white"
              >
                {isSubmitting && <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />}
                {isSubmitting ? 'Đang xử lý...' : 'Tạo Banner mới'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}