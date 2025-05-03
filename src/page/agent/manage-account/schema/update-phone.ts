import { z } from 'zod';

export const updatePhoneSchema = z.object({
  phone: z
    .string()
    .min(1, 'Số điện thoại là bắt buộc')
    .regex(/^\d{10}$/, 'Số điện thoại phải có đúng 10 chữ số'),
});

export type FormUpdatePhone = z.infer<typeof updatePhoneSchema>;