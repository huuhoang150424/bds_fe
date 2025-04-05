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
import FileUploadDropzone from '../components/upload-image';
import Ckeditor from '../components/CKEditor';
import Tags from '../components/tags';
import { formSchema } from '@/page/agent/post/schema'


export default function CreatePostPage ()
{
  const [ isSubmitting, setIsSubmitting ] = useState( false );
  const [ images, setImages ] = useState<string[]>( [] );

  const form = useForm<z.infer<typeof formSchema>>( {
    resolver: zodResolver( formSchema ),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      area: 0,
      bedrooms: 0,
      bathrooms: 0,
      address: '',
      provinces: [ 'hochiminh' ], // Giá trị mặc định hợp lệ
      propertyType: '',
      isFeatured: false,
    },
  } );

  function onSubmit ( values: z.infer<typeof formSchema> )
  {
    setIsSubmitting( true );
    setTimeout( () =>
    {
      console.log( { ...values, images } ); // Bao gồm images trong dữ liệu
      setIsSubmitting( false );
      form.reset();
      setImages( [] );
      alert( 'Bài đăng đã được tạo thành công!' );
    }, 1500 );
  }

  return (
    <div className="p-[60px] max-w-[1850px] mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tạo mới bài đăng</h1>

      <Form { ...form }>
        <form onSubmit={ form.handleSubmit( onSubmit ) } className="space-y-8">
          <Card className="border border-gray-200 rounded-[10px]">
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
              <CardDescription>Nhập thông tin cơ bản về bất động sản của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={ form.control }
                name="title"
                render={ ( { field } ) => (
                  <FormItem>
                    <FormLabel>Tiêu đề</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tiêu đề bài đăng" { ...field } className="p-[5px]" />
                    </FormControl>
                    <FormDescription>Tiêu đề nên ngắn gọn và hấp dẫn</FormDescription>
                    <FormMessage />
                  </FormItem>
                ) }
              />
              <FormField
                control={ form.control }
                name="description"
                render={ ( { field } ) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Ckeditor value={ field.value } onChange={ field.onChange } />
                    </FormControl>
                    <FormDescription>Mô tả đầy đủ các đặc điểm nổi bật của bất động sản</FormDescription>
                    <FormMessage />
                  </FormItem>
                ) }
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={ form.control }
                  name="price"
                  render={ ( { field } ) => (
                    <FormItem>
                      <FormLabel>Giá (VNĐ)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={ 0 }
                          placeholder="Nhập giá"
                          { ...field }
                          value={ field.value || '' }
                          onChange={ ( e ) => field.onChange( e.target.value ? Number( e.target.value ) : '' ) }
                          className="p-[5px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  ) }
                />
                <FormField
                  control={ form.control }
                  name="area"
                  render={ ( { field } ) => (
                    <FormItem>
                      <FormLabel>Diện tích (m²)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập diện tích"
                          { ...field }
                          value={ field.value || '' }
                          onChange={ ( e ) => field.onChange( e.target.value ? Number( e.target.value ) : '' ) }
                          className="p-[5px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  ) }
                />
                <FormField
                  control={ form.control }
                  name="bedrooms"
                  render={ ( { field } ) => (
                    <FormItem>
                      <FormLabel>Số phòng ngủ</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={ 0 }
                          placeholder="Nhập số phòng ngủ"
                          { ...field }
                          value={ field.value || '' }
                          onChange={ ( e ) => field.onChange( e.target.value ? Number( e.target.value ) : '' ) }
                          className="p-[5px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  ) }
                />
                <FormField
                  control={ form.control }
                  name="bathrooms"
                  render={ ( { field } ) => (
                    <FormItem>
                      <FormLabel>Số phòng tắm</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={ 0 }
                          placeholder="Nhập số phòng tắm"
                          { ...field }
                          value={ field.value || '' }
                          onChange={ ( e ) => field.onChange( e.target.value ? Number( e.target.value ) : '' ) }
                          className="p-[5px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  ) }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-[10px]">
            <CardHeader>
              <CardTitle>Vị trí</CardTitle>
              <CardDescription>Nhập thông tin về vị trí bất động sản</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={ form.control }
                name="address"
                render={ ( { field } ) => (
                  <FormItem>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập địa chỉ đầy đủ" { ...field } className="p-[5px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                ) }
              />
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-[10px]">
            <CardHeader className="pb-[15px]">
              <CardTitle>Tags</CardTitle>
              <CardDescription>Nhập thông tin về các vị trí liên quan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={ form.control }
                name="provinces"
                render={ ( { field } ) => (
                  <FormItem>
                    <FormLabel>Tỉnh/Thành phố</FormLabel>
                    <FormControl>
                      <Tags />
                    </FormControl>
                    <FormDescription>Chọn ít nhất 1 tỉnh/thành phố</FormDescription>
                    <FormMessage />
                  </FormItem>
                ) }
              />
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-[10px]">
            <CardHeader>
              <CardTitle>Phân loại</CardTitle>
              <CardDescription>Chọn loại bất động sản và các tùy chọn khác</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={ form.control }
                name="propertyType"
                render={ ( { field } ) => (
                  <FormItem>
                    <FormLabel>Loại bất động sản</FormLabel>
                    <Select onValueChange={ field.onChange } defaultValue={ field.value }>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại bất động sản" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="apartment">Căn hộ</SelectItem>
                        <SelectItem value="house">Nhà phố</SelectItem>
                        <SelectItem value="villa">Biệt thự</SelectItem>
                        <SelectItem value="land">Đất nền</SelectItem>
                        <SelectItem value="office">Văn phòng</SelectItem>
                        <SelectItem value="retail">Mặt bằng kinh doanh</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                ) }
              />
              <FormField
                control={ form.control }
                name="isFeatured"
                render={ ( { field } ) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={ field.value } onCheckedChange={ field.onChange } />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Bài đăng nổi bật</FormLabel>
                      <FormDescription>Bài đăng sẽ được hiển thị ở vị trí nổi bật trên trang chủ</FormDescription>
                    </div>
                  </FormItem>
                ) }
              />
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-[10px]">
            <CardHeader>
              <CardTitle>Hình ảnh</CardTitle>
              <CardDescription>Tải lên hình ảnh của bất động sản</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploadDropzone />
              <p className="text-sm text-muted-foreground mt-[10px]">Tối đa 10 hình ảnh, mỗi hình không quá 5MB</p>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={ isSubmitting } className="min-w-32">
              { isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý
                </>
              ) : (
                'Tạo bài đăng'
              ) }
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}