import { useRef, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CalendarIcon, Loader2, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Ckeditor from '@/page/agent/post/components/CKEditor';
import { useUpdateNews } from '../hooks/use-update-news';
import { CategoryNew } from './columns';
import { UpdateNewsForm, updateNewsSchema } from '../schema/update-news';
import { toast } from '@/hooks/use-toast';

interface NewsEditDialogProps {
  news: any;
  trigger?: React.ReactNode;
}

export function NewsEditDialog({ news, trigger }: NewsEditDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(news.imageUrl || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateNewsMutation = useUpdateNews();

  const form = useForm<UpdateNewsForm>({
    resolver: zodResolver(updateNewsSchema),
    defaultValues: {
      title: news.title,
      content: news.content,
      origin_post: news.origin_post || '',
      category: news.category,
      readingtime: news.readingTime,
      image: null,
      removedImageUrl: '',
    },
  });

  useEffect(() => {
    form.reset({
      title: news.title,
      content: news.content,
      origin_post: news.origin_post || '',
      category: news.category,
      readingtime: news.readingTime,
      image: null,
      removedImageUrl: '',
    });
    setImagePreview(news.imageUrl || null);
    setError(null);
  }, [news, form]);

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelected(file);
    }
  };

  const handleFileSelected = (file: File) => {
    form.setValue('image', file);
    form.setValue('removedImageUrl', '');
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    if (imagePreview && !imagePreview.startsWith('data:')) {
      form.setValue('removedImageUrl', imagePreview);
    }
    form.setValue('image', null);
    setImagePreview(null);
  };

  const handleContentChange = (newContent: string) => {
    form.setValue('content', newContent);
    const readingTime = calculateReadingTime(newContent);
    form.setValue('readingtime', readingTime);
  };

  async function onSubmit(values: UpdateNewsForm) {
    try {
      setError(null);
      const formData :any= new FormData();
      if (values.title) formData.append('title', values.title);
      if (values.content) formData.append('content', values.content);
      if (values.origin_post !== undefined) formData.append('origin_post', values.origin_post);
      if (values.category) formData.append('category', values.category);
      if (values.readingtime !== undefined) formData.append('readingtime', String(values.readingtime));

      if (values.image instanceof File) {
        formData.append('image', values.image);
      } else if (values.image) {
        formData.append('image', values.image);
      }

      if (values.removedImageUrl) {
        formData.append('removedImageUrl', values.removedImageUrl);
      }

      await updateNewsMutation.mutateAsync(
        { newsId: news.id, data: formData },
        {
          onSuccess: () => {
            toast({
              variant: 'success',
              title: 'Cập nhật tin tức thành công',
            });
            setOpen(false);
          },
          onError: (err: any) => {
            setError(err.message || 'Không thể cập nhật tin tức');
          },
        }
      );
    } catch (error) {
      setError('Đã xảy ra lỗi không mong muốn');
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="text-xs">
            Sửa
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto overflow-x-hidden border-red-100 box-border "
        style={{ boxSizing: 'border-box' }}
      >
        <DialogHeader>
          <DialogTitle className="text-[15px] text-red-500">Cập nhật Tin Tức</DialogTitle>
        </DialogHeader>
        {error && (
          <div className="my-2 p-2 bg-red-100 rounded text-[12px] text-red-800">
            <strong>Lỗi:</strong> {error}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[13px] text-gray-700 font-medium">Tiêu đề bài viết</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tiêu đề bài viết"
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="text-[13px] text-gray-700 px-4 py-2 outline-none w-full "
                      />
                    </FormControl>
                    <FormDescription className="text-[11px]">Tiêu đề dành cho bài viết của bạn.</FormDescription>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[13px] text-gray-700 font-medium">Danh mục bài viết</FormLabel>
                    <Select onValueChange={(value) => field.onChange(value || undefined)} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-[13px] text-gray-700 px-4 py-2 outline-none w-full">
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='z-[9999] '>
                        {Object.values(CategoryNew).map((category) => (
                          <SelectItem key={category} value={category} className="text-[12px]">
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-[11px]">Chọn danh mục cho bài viết.</FormDescription>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[13px] text-gray-700 font-medium">Ảnh</FormLabel>
                  <FormControl>
                    <div className="w-full">
                      <div
                        className={`relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors ${
                          isDragging ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-300'
                        } w-full box-border`}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              handleFileSelected(e.target.files[0]);
                            }
                          }}
                          accept="image/*"
                          className="hidden"
                        />
                        {!imagePreview ? (
                          <div className="flex flex-col items-center text-center">
                            <Upload className="mb-2 h-8 w-8 text-gray-400" />
                            <h3 className="mb-1 text-sm font-medium">Kéo thả hoặc nhấp để tải lên</h3>
                            <p className="text-[11px] text-gray-500">Hỗ trợ JPG, PNG, GIF (Tối đa 5MB)</p>
                          </div>
                        ) : (
                          <div className="relative w-full text-center">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="mx-auto max-h-32 w-auto max-w-full object-contain"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute top-0 right-0 h-6 w-6 bg-red-500 text-white rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveImage();
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2 text-[11px]"
                              onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                              }}
                            >
                              Thay đổi ảnh
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription className="text-[11px]">Thêm hoặc thay đổi ảnh bài viết.</FormDescription>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="origin_post"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[13px] text-gray-700 font-medium">Link gốc bài viết</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập link gốc bài viết"
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(e.target.value || undefined)}
                      className="min-h-[60px] text-[13px] resize-none w-full"
                    />
                  </FormControl>
                  <FormDescription className="text-[11px]">Cung cấp link gốc cho bài viết (nếu có).</FormDescription>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[13px] text-gray-700 font-medium">Nội dung bài viết</FormLabel>
                  <FormControl>
                    <div className="w-full">
                      <Ckeditor
                        value={field.value || ''}
                        onChange={(value) => handleContentChange(value)}
                      />
                    </div>
                  </FormControl>
                  <div className="flex items-center justify-between mt-1">
                    <FormDescription className="text-[11px]">Viết nội dung bài viết.</FormDescription>
                    <div className="flex items-center text-[11px] text-muted-foreground">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      <span>{calculateReadingTime(field.value || '')} min read</span>
                    </div>
                  </div>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="readingtime"
              render={({ field }) => (
                <input
                  type="hidden"
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              )}
            />
            <FormField
              control={form.control}
              name="removedImageUrl"
              render={({ field }) => (
                <input type="hidden" {...field} value={field.value ?? ''} />
              )}
            />
            <Separator className="bg-red-100" />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="text-[12px]"
                onClick={() => setOpen(false)}
                disabled={updateNewsMutation.isPending}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                variant="outline"
                className="bg-red-500 hover:bg-red-600 text-white text-[12px]"
                disabled={updateNewsMutation.isPending}
              >
                {updateNewsMutation.isPending ? (
                  <>
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    Đang cập nhật...
                  </>
                ) : (
                  'Cập nhật'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}