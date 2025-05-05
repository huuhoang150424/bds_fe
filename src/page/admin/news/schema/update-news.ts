import { z } from 'zod';
import { CategoryNew } from '../components/columns';



export const updateNewsSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: 'Tiêu đề phải có ít nhất 5 ký tự.',
    })
    .optional(),
  content: z
    .string()
    .min(50, {
      message: 'Nội dung phải có ít nhất 50 ký tự.',
    })
    .optional(),
  origin_post: z
    .string()
    .min(10, {
      message: 'Link gốc phải có ít nhất 10 ký tự.',
    })
    .optional()
    .or(z.literal('')),
  category: z
  .string()
  .min(5, {
    message: 'Nội dung phải có ít nhất 50 ký tự.',
  })
    .optional(),
  readingtime: z
    .number()
    .min(0, {
      message: 'Thời gian đọc phải lớn hơn hoặc bằng 0.',
    })
    .optional(),
  image: z
    .instanceof(File)
    .optional()
    .nullable()
    .or(z.string().url('Ảnh phải là URL hợp lệ').optional()),
  removedImageUrl: z.string().optional(),
});

export type UpdateNewsForm = z.infer<typeof updateNewsSchema>;