import { z } from "zod";

const baseSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  description: z.string(),
  price: z.number({ invalid_type_error: "Giá phải là số" }),
  squareMeters: z.number({ invalid_type_error: "Diện tích phải là số" }),
  bedroom: z.number({ invalid_type_error: "Phòng ngủ phải là số" }).optional(),
  bathroom: z.number({ invalid_type_error: "Phòng tắm phải là số" }).optional(),
  floor: z.number({ invalid_type_error: "Số tầng phải là số" }).optional(),
  address: z.string(),
  propertyType: z.string(),
  direction: z.string(),
  isFurniture: z.boolean().default(false),
  tags: z.array(z.string()),
  images: z.array(z.any()),
  listingType: z.string(),
});

export const postSchema = baseSchema.extend({
  description: z.string().min(1, "Mô tả không được để trống"),
  price: z.number({ invalid_type_error: "Giá phải là số" }).gt(0, "Giá phải lớn hơn 0"),
  squareMeters: z.number({ invalid_type_error: "Diện tích phải là số" }).gt(0, "Diện tích phải lớn hơn 0"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
  propertyType: z.string().min(1, "Loại bất động sản không được để trống"),
  direction: z.string().min(1, "Hướng nhà không được để trống"),
  status: z.string().min(1, "Trạng thái không được để trống"),
  tags: z.array(z.string()).min(1, "Phải có ít nhất một thẻ"),
  images: z.array(z.any()).min(1, "Phải tải lên ít nhất một hình ảnh"),
  listingType: z.string().min(1, "Loại tin đăng không được để trống"),
});

export const draftSchema = baseSchema;

export type FormUploadPost = z.infer<typeof postSchema>;
export type FormUploadDraft = z.infer<typeof draftSchema>;