import { useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CalendarIcon, Loader2, Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Ckeditor from '@/page/agent/post/components/CKEditor';
import { formSchema, type FormCreateNews } from '../schema/create-news';
import { useCreateNews } from '../hooks/use-create-news';

const CategoryNew = {
  POLITICS: 'Chính trị',
  BUSINESS: 'Kinh doanh',
  TECHNOLOGY: 'Công nghệ',
  HEALTH: 'Sức khỏe',
  ENTERTAINMENT: 'Giải trí',
  SPORTS: 'Thể thao',
  SCIENCE: 'Khoa học',
  EDUCATION: 'Giáo dục',
};

export default function NewsForm() {
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<FormCreateNews>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      origin_post: '',
      category: undefined,
      readingtime: 0,
      image: null,
    },
  });

  const resetForm = () => {
    form.reset();
    setImagePreview(null);
  };

  const createNewsMutation = useCreateNews(resetForm);
  const isSubmitting = createNewsMutation.isPending;

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  async function onSubmit(values: FormCreateNews) {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('content', values.content);
      formData.append('origin_post', values.origin_post);
      formData.append('category', values.category || '');
      
      // Calculate and add reading time
      const readingTime = calculateReadingTime(values.content);
      formData.append('readingtime', String(readingTime));
      form.setValue('readingtime', readingTime);
      
      if (values.image) {
        formData.append('image', values.image);
      }
      
      // Call mutation to send data to API
      createNewsMutation.mutate({ data: formData });
      
    } catch (error) {
      console.error('Error preparing form data:', error);
    }
  }

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
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleContentChange = (newContent: string) => {
    form.setValue('content', newContent);
    const readingTime = calculateReadingTime(newContent);
    form.setValue('readingtime', readingTime);
  };

  return (
    <Card className="overflow-hidden border border-gray-200 rounded-[8px]">
      <CardContent className="p-[20px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-gray-700 font-[500]">Tiêu đề bài viết</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter news title"
                        {...field}
                        className="text-[14px] text-gray-700 px-[16px] py-[6px] outline-none"
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
                    <FormLabel className="text-[14px] text-gray-700 font-[500]">Danh mục bài viết</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-[14px] text-gray-700 px-[16px] py-[6px] outline-none">
                          <SelectValue placeholder="lựa chọn 1 danh mục" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(CategoryNew).map(([key, value]) => (
                          <SelectItem key={key} value={value} className="text-xs">
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-[11px]">
                      Lựa chọn 1 danh mục dành cho bài viết của bạn
                    </FormDescription>
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
                  <FormLabel className="text-[14px] text-gray-700 font-[500]">Ảnh</FormLabel>
                  <FormControl>
                    <div>
                      <div
                        className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
                          isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/70'
                        }`}
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
                            <Upload className="mb-2 h-10 w-10 text-gray-400" />
                            <h3 className="mb-1 text-lg font-medium">Kéo thả hoặc nhấp để tải lên</h3>
                            <p className="text-sm text-gray-500">
                              Hỗ trợ JPG, PNG, GIF (Tối đa 1 hình, mỗi hình không quá 5MB)
                            </p>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-4"
                              onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                              }}
                            >
                              <Plus className="mr-1 h-4 w-4" /> Chọn hình ảnh
                            </Button>
                          </div>
                        ) : (
                          <div className="relative h-full w-full">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="mx-auto max-h-48 w-auto object-contain"
                            />
                            <div className="mt-4 flex justify-center">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setImagePreview(null);
                                  form.setValue('image', null);
                                }}
                                className="text-xs"
                              >
                                Xóa ảnh
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="ml-2 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  fileInputRef.current?.click();
                                }}
                              >
                                Thay đổi ảnh
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription className="text-[11px]">Thêm ảnh dành cho bài viết</FormDescription>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="origin_post"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] text-gray-700 font-[500]">Link gốc bài viết</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập link gốc bài biết"
                      {...field}
                      className="min-h-16 text-xs resize-none"
                    />
                  </FormControl>
                  <FormDescription className="text-[11px]">Cung cấp link gốc cho bài viết</FormDescription>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] text-gray-700 font-[500]">Nội dung bài viết</FormLabel>
                  <FormControl>
                    <Ckeditor 
                      value={field.value || ''} 
                      onChange={(value) => {
                        handleContentChange(value);
                      }} 
                    />
                  </FormControl>
                  <div className="flex items-center justify-between mt-1.5">
                    <FormDescription className="text-[11px]">Viết mô tả bài viết dành cho bạn.</FormDescription>
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
                <input type="hidden" {...field} value={field.value} />
              )}
            />

            <Separator className="bg-red-100" />

            <div className="flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline" 
                className="text-xs"
                onClick={resetForm}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="outline"
                className="bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in-out text-xs text-white"
              >
                {isSubmitting && <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />}
                {isSubmitting ? 'Đang xử lý...' : 'Tạo mới'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}