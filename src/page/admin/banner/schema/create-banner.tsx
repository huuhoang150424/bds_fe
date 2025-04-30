import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, {
    message: 'Tiêu đề phải có ít nhất 3 ký tự.',
  }),
  images: z
    .array(z.instanceof(File))
    .min(1, {
      message: 'Vui lòng chọn ít nhất một ảnh.',
    })
    .refine((files) => files.every((file) => file.type.startsWith('image/')), {
      message: 'Chỉ được phép tải lên file ảnh.',
    })
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: 'Kích thước mỗi ảnh không được vượt quá 5MB.',
    }),
  targetUrl: z.string().url({
    message: 'Vui lòng nhập URL mục tiêu hợp lệ.',
  }),
  displayOrder: z.coerce.number().int().positive({
    message: 'Thứ tự hiển thị phải là số dương.',
  }),
  isActive: z.boolean().default(true),
  startDate: z.date({
    required_error: 'Ngày bắt đầu là bắt buộc.',
  }),
  endDate: z
    .date({
      required_error: 'Ngày kết thúc là bắt buộc.',
    })
    .refine((date) => date > new Date(), {
      message: 'Ngày kết thúc phải ở tương lai.',
    }),
});

export type FormValues = z.infer<typeof formSchema>;