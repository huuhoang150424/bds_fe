import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  description: z.string().min(1, "Mô tả không được để trống"),
  price: z.number().min(0, "Giá phải lớn hơn hoặc bằng 0"),
  squareMeters: z.number().min(0, "Diện tích phải lớn hơn hoặc bằng 0"),
  bedroom: z.number().min(0, "Số phòng ngủ phải lớn hơn hoặc bằng 0"),
  bathroom: z.number().min(0, "Số phòng tắm phải lớn hơn hoặc bằng 0"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
  propertyType: z.string().min(1, "Loại bất động sản không được để trống"),
  direction: z.string().min(1, "Hướng nhà không được để trống"),
  status: z.string().min(1, "Trạng thái không được để trống"),
  isFurniture: z.boolean(),
  tags: z.array(z.string()).min(1, "Phải có ít nhất một thẻ"),
  images: z
    .array(z.instanceof(File, { message: "Hình ảnh không hợp lệ" }))
    .min(1, "Phải tải lên ít nhất một hình ảnh"),
  floor: z.number().min(0, "Số tầng phải lớn hơn hoặc bằng 0"),
  listingType: z.string().min(1, "Loại tin đăng không được để trống"),
});



export type FormUploadPost=z.infer<typeof formSchema>;