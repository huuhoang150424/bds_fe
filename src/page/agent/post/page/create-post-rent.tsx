import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
// import FileUploadDropzone from '../components/upload-image';
import Ckeditor from '../components/CKEditor';
import { formSchema } from '@/page/agent/post/schema';
import { useAddPost } from '../hooks/use-add-post';
import LocationSelector from '../components/tags';

export default function CreatePostPageRent() {
  const { mutate: addPost } = useAddPost();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      squareMeters: 0,
      bedrooms: 0,
      bathrooms: 0,
      address: '',
      propertyType: '',
      direction: '',
      status: '',
      isFurniture: false,
      tags: [],
      images: [],
      floor: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setIsSubmitting(true);
    
    // Thêm images vào form values để gửi đi
    const finalData = {
      ...values,
      images
    };
    
    // Thực hiện gọi API (hiện tại đang giả lập)
    setTimeout(() => {
      console.log(finalData);
      addPost(finalData);
      setIsSubmitting(false);
      form.reset();
      setImages([]);
      alert('Bài đăng đã được tạo thành công!');
    }, 1500);
  }

  // Handle image upload from FileUploadDropzone
  const handleImagesChange = (uploadedImages: string[]) => {
    setImages(uploadedImages);
    form.setValue('images', []);
  };



  //lỗi tag kìa  nó phải là ["như này","như này","là 1 mảng chuỗi string"]
  return ( 
    <div className='p-6 space-y-6 min-h-screen max-w-8xl'>
      <h1 className='text-2xl font-[500] mb-6'>Tạo mới bài đăng</h1>

      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <Card className='border border-gray-200 rounded-[10px]'>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
              <CardDescription>Nhập thông tin cơ bản về bất động sản của bạn</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập tiêu đề bài đăng'
                        {...field}
                        className='p-[5px]'
                      />
                    </FormControl>
                    <FormDescription>Tiêu đề nên ngắn gọn và hấp dẫn</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Ckeditor value={field.value} onChange={(value) => field.onChange(value)} />
                    </FormControl>
                    <FormDescription>Mô tả đầy đủ các đặc điểm nổi bật của bất động sản</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá (VNĐ/tháng)</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          min={0}
                          placeholder='Nhập giá'
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className='p-[5px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='squareMeters'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diện tích (m²)</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Nhập diện tích'
                          min={0}
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className='p-[5px]'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='bedrooms'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số phòng ngủ</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          min={0}
                          placeholder='Nhập số phòng ngủ'
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className='p-[5px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='bathrooms'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số phòng tắm</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          min={0}
                          placeholder='Nhập số phòng tắm'
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className='p-[5px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='floor'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số tầng</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          min={0}
                          placeholder='Nhập số tầng'
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className='p-[5px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='direction'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hướng nhà</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Chọn hướng nhà' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='north'>Bắc</SelectItem>
                            <SelectItem value='south'>Nam</SelectItem>
                            <SelectItem value='east'>Đông</SelectItem>
                            <SelectItem value='west'>Tây</SelectItem>
                            <SelectItem value='northeast'>Đông Bắc</SelectItem>
                            <SelectItem value='southeast'>Đông Nam</SelectItem>
                            <SelectItem value='northwest'>Tây Bắc</SelectItem>
                            <SelectItem value='southwest'>Tây Nam</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trạng thái</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Chọn trạng thái' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='available'>Còn trống</SelectItem>
                            <SelectItem value='negotiating'>Đang đàm phán</SelectItem>
                            <SelectItem value='transferred'>Đã bàn giao</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card className='border border-gray-200 rounded-[10px]'>
            <CardHeader>
              <CardTitle>Vị trí</CardTitle>
              <CardDescription>Nhập thông tin về vị trí bất động sản</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập địa chỉ đầy đủ'
                        {...field}
                        className='p-[5px]'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className='border border-gray-200 rounded-[10px]'>
            <CardHeader className='pb-[15px]'>
              <CardTitle>Tags</CardTitle>
              <CardDescription className='mt-[15px]'>Nhập các tag cho các bài đăng liên quan</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name='tags'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tỉnh/Thành phố</FormLabel>
                    <FormControl>
                      <LocationSelector 
                        value={field.value} 
                        onChange={(selectedTags) => field.onChange(selectedTags)} 
                      />
                    </FormControl>
                    <FormDescription>Chọn ít nhất 1 tỉnh/thành phố</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className='border border-gray-200 rounded-[10px]'>
            <CardHeader>
              <CardTitle>Phân loại</CardTitle>
              <CardDescription>Chọn loại bất động sản và các tùy chọn khác</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name='propertyType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại bất động sản</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn loại bất động sản' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='apartment'>Căn hộ</SelectItem>
                        <SelectItem value='house'>Nhà phố</SelectItem>
                        <SelectItem value='villa'>Biệt thự</SelectItem>
                        <SelectItem value='land'>Đất nền</SelectItem>
                        <SelectItem value='office'>Văn phòng</SelectItem>
                        <SelectItem value='retail'>Mặt bằng kinh doanh</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isFeatured'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Bài đăng nổi bật</FormLabel>
                      <FormDescription>Bài đăng sẽ được hiển thị ở vị trí nổi bật trên trang chủ</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className='border border-gray-200 rounded-[10px]'>
            <CardHeader>
              <CardTitle>Hình ảnh</CardTitle>
              <CardDescription>Tải lên hình ảnh của bất động sản</CardDescription>
            </CardHeader>
            <CardContent>
              {/* <FileUploadDropzone 
                value={form.watch('images') as unknown as File[]}
                onChange={(files) => {
                  // Convert File[] to string[] using URL.createObjectURL
                  const fileUrls = files.map(file => URL.createObjectURL(file));
                  handleImagesChange(fileUrls);
                }}
              /> */}
              <p className='text-sm text-muted-foreground mt-[10px]'>Tối đa 10 hình ảnh, mỗi hình không quá 5MB</p>
            </CardContent>
          </Card>

          <div className='flex justify-end'>
            <Button type='submit' disabled={isSubmitting} className='min-w-32'>
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Đang xử lý
                </>
              ) : (
                'Tạo bài đăng'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}