"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { MultiImageUpload } from "../components/upload-image";
import Ckeditor from "../components/CKEditor";
import { formSchema } from "@/page/agent/post/schema";
import { useAddPost } from "../hooks/use-add-post";
import { useToast } from "@/hooks/use-toast";
import TagSelector from "../components/tags";

export default function CreatePostPageSell() {
  const { mutate: addPost } = useAddPost();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      squareMeters: 0,
      bedroom: 0,
      bathroom: 0,
      address: "",
      propertyType: "",
      direction: "",
      status: "",
      isFurniture: false,
      tags: [],
      images: [],
      floor: 0,
      listingType: "4b386eb5-03c2-44ae-b585-39a2871feb5f",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      console.log("check123", values);

      // Validate images
      if (values.images.length === 0) {
        toast({
          title: "Lỗi",
          description: "Vui lòng thêm ít nhất một hình ảnh",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Validate tags
      if (!Array.isArray(values.tags) || values.tags.length === 0) {
        toast({
          title: "Lỗi",
          description: "Vui lòng chọn ít nhất một tag",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Create FormData
      const formData = new FormData();

      // Append basic fields
      formData.append("title", values.title);
      formData.append("squareMeters", values.squareMeters.toString());
      formData.append("description", values.description);
      formData.append("floor", values.floor.toString());
      formData.append("bedroom", values.bedroom.toString());
      formData.append("bathroom", values.bathroom.toString());
      formData.append("isFurniture", values.isFurniture.toString());
      formData.append("direction", values.direction);
      formData.append("propertyType", values.propertyType);
      formData.append("status", values.status);
      formData.append("price", values.price.toString());
      formData.append("address", values.address);
      formData.append("listingType", values.listingType);
      formData.append("tags", JSON.stringify(values.tags)); // Serialize tags array

      formData.append(`images`, values.images);



      // Call API
      addPost(formData, {
        onSuccess: (data) => {
          toast({
            title: "Thành công",
            description: "Bài đăng đã được tạo thành công!",
          });
          form.reset();
          setIsSubmitting(false);
        },
        onError: (error: any) => {
          const errorMessage = error.message || "Đã xảy ra lỗi không xác định.";
          console.error("Lỗi từ API:", error);
          toast({
            title: "Lỗi",
            description: `Có lỗi khi tạo bài đăng: ${errorMessage}`,
            variant: "destructive",
          });
          setIsSubmitting(false);
        },
      });
    } catch (error) {
      console.error("Lỗi khi xử lý form:", error);
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi không xác định khi xử lý form.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-6 space-y-6 min-h-screen max-w-8xl">
      <h1 className="text-2xl font-[500] mb-6">Tạo mới bài đăng</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="border border-gray-200 rounded-[10px]">
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
              <CardDescription>Nhập thông tin cơ bản về bất động sản của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tiêu đề bài đăng" {...field} className="p-[5px]" />
                    </FormControl>
                    <FormDescription>Tiêu đề nên ngắn gọn và hấp dẫn</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Ckeditor value={field.value || ""} onChange={field.onChange} />
                    </FormControl>
                    <FormDescription>Mô tả đầy đủ các đặc điểm nổi bật của bất động sản</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá (VNĐ)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Nhập giá"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="p-[5px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="squareMeters"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diện tích (m²)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Nhập diện tích"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="p-[5px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bedroom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số phòng ngủ</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Nhập số phòng ngủ"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="p-[5px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bathroom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số phòng tắm</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Nhập số phòng tắm"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="p-[5px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="floor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số tầng</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Nhập số tầng"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="p-[5px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="direction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hướng nhà</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn hướng nhà" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Bắc">Bắc</SelectItem>
                            <SelectItem value="Nam">Nam</SelectItem>
                            <SelectItem value="Đông">Đông</SelectItem>
                            <SelectItem value="Tây">Tây</SelectItem>
                            <SelectItem value="Đông Bắc">Đông Bắc</SelectItem>
                            <SelectItem value="Đông Nam">Đông Nam</SelectItem>
                            <SelectItem value="Tây Bắc">Tây Bắc</SelectItem>
                            <SelectItem value="Tây Nam">Tây Nam</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trạng thái</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn trạng thái" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Còn trống">Còn trống</SelectItem>
                            <SelectItem value="Đang đàm phán">Đang đàm phán</SelectItem>
                            <SelectItem value="Đã bàn giao">Đã bàn giao</SelectItem>
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

          <Card className="border border-gray-200 rounded-[10px]">
            <CardHeader>
              <CardTitle>Vị trí</CardTitle>
              <CardDescription>Nhập thông tin về vị trí bất động sản</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập địa chỉ đầy đủ" {...field} className="p-[5px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-[10px]">
            <CardHeader className="pb-[15px]">
              <CardTitle>Tags</CardTitle>
              <CardDescription className="mt-[15px]">Nhập các tag cho các bài đăng liên quan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <TagSelector value={field.value || []} onChange={field.onChange} />
                    </FormControl>
                    <FormDescription>Chọn ít nhất 1 tag</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
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
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại bất động sản</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại bất động sản" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Căn hộ">Căn hộ</SelectItem>
                          <SelectItem value="Nhà phố">Nhà phố</SelectItem>
                          <SelectItem value="Biệt thự">Biệt thự</SelectItem>
                          <SelectItem value="Đất nền">Đất nền</SelectItem>
                          <SelectItem value="Văn phòng">Văn phòng</SelectItem>
                          <SelectItem value="Mặt bằng kinh doanh">Mặt bằng kinh doanh</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isFurniture"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Có nội thất</FormLabel>
                      <FormDescription>Bất động sản có bao gồm nội thất hay không</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-[10px]">
            <CardHeader>
              <CardTitle>Hình ảnh</CardTitle>
              <CardDescription>Tải lên hình ảnh của bất động sản</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MultiImageUpload
                        onImagesSelect={field.onChange}
                        maxFiles={10}
                        maxSizeMB={5}
                      />
                    </FormControl>
                    <FormDescription>Tối đa 10 hình ảnh, mỗi hình không quá 5MB</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (window.confirm("Bạn có chắc muốn hủy? Dữ liệu sẽ không được lưu.")) {
                  form.reset();
                }
              }}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-32">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý
                </>
              ) : (
                "Tạo bài đăng"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}