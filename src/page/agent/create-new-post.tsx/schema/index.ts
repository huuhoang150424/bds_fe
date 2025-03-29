import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(10, { message: 'Tiêu đề phải có ít nhất 10 ký tự' }),
  description: z.string().min(50, { message: 'Mô tả phải có ít nhất 50 ký tự' }),
  price: z.coerce.number().min(1, { message: 'Vui lòng nhập giá' }),
  area: z.coerce.number().min(1, { message: 'Vui lòng nhập diện tích' }),
  bedrooms: z.coerce.number().min(1, { message: 'Vui lòng nhập số phòng ngủ' }),
  bathrooms: z.coerce.number().min(1, { message: 'Vui lòng nhập số phòng tắm' }),
  address: z.string().min(10, { message: 'Địa chỉ phải có ít nhất 10 ký tự' }),
  provinces: z.array(z.string()).min(1, { message: 'Vui lòng chọn ít nhất một tỉnh/thành' }),
  propertyType: z.string({ required_error: 'Vui lòng chọn loại bất động sản' }),
  isFeatured: z.boolean().default(false),
});