import { z } from "zod";

export const paymentSchema = z.object({
  amount: z
    .number({ invalid_type_error: 'Số tiền phải là một số' })
    .min(1000, 'Số tiền phải ít nhất 1,000 VNĐ')
    .positive('Số tiền phải lớn hơn 0'),
  description: z.string().optional(),
});



export type FormPayment= z.infer<typeof paymentSchema>;