import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  description: z.string().min(1, "Mô tả không được để trống"),
  price: z
    .number({ invalid_type_error: "Giá phải là số" })
    .gt(0, "Giá phải lớn hơn 0"),
  squareMeters: z
    .number({ invalid_type_error: "Diện tích phải là số" })
    .gt(0, "Diện tích phải lớn hơn 0"),
  bedroom: z
    .number({ invalid_type_error: "Phòng ngủ phải là số" })
    .min(0, "Phòng ngủ phải ≥ 0")
    .optional(),
  bathroom: z
    .number({ invalid_type_error: "Phòng tắm phải là số" })
    .min(0, "Phòng tắm phải ≥ 0")
    .optional(),
  floor: z
    .number({ invalid_type_error: "Số tầng phải là số" })
    .int("Số tầng phải là số nguyên")
    .min(1, "Số tầng phải ≥ 1")
    .optional(),
  address: z.string().min(1, "Địa chỉ không được để trống"),
  propertyType: z.string().min(1, "Loại bất động sản không được để trống"),
  direction: z.string().min(1, "Hướng nhà không được để trống"),
  status: z.string().min(1, "Trạng thái không được để trống"),
  isFurniture: z.boolean(),
  tags: z.array(z.string()).min(1, "Phải có ít nhất một thẻ"),
  images: z.array(z.any()).min(1, "Phải tải lên ít nhất một hình ảnh"),
  listingType: z.string().min(1, "Loại tin đăng không được để trống"),
});



export type FormUploadPost=z.infer<typeof formSchema>;