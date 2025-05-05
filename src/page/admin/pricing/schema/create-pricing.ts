import { z } from 'zod';

export const PricingSchema = z.object({
  name: z.string().min(1, 'Tên gói không được để trống'),
  description: z
    .string({ required_error: 'Mô tả không được để trống' })
    .min(1, 'Mô tả không được để trống'),
  price: z
    .number({ required_error: 'Giá không được để trống' })
    .min(0, 'Giá phải lớn hơn hoặc bằng 0'),
  discountPercent: z
    .number()
    .min(0, 'Phần trăm chiết khấu phải lớn hơn hoặc bằng 0')
    .max(100, 'Phần trăm chiết khấu không được vượt quá 100')
    .optional()
    .default(0),
  displayDay: z
    .number({ required_error: 'Số ngày hiển thị không được để trống' })
    .min(1, 'Số ngày hiển thị phải lớn hơn hoặc bằng 1'),
  hasReport: z.boolean().optional().default(false),
  maxPost: z
    .number()
    .min(0, 'Số bài đăng tối đa phải lớn hơn hoặc bằng 0')
    .optional()
    .default(0),
  boostDays: z
    .number()
    .min(0, 'Số ngày tăng tốc phải lớn hơn hoặc bằng 0')
    .optional()
    .default(0),
  expiredDay: z
    .number({ required_error: 'Số ngày hết hạn không được để trống' })
    .min(1, 'Số ngày hết hạn phải lớn hơn hoặc bằng 1'),
  isActive: z.boolean().optional().default(true),
});

export type PricingFormData = z.infer<typeof PricingSchema>;