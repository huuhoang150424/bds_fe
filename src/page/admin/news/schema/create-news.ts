import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters.',
  }),
  content: z.string().min(50, {
    message: 'Content must be at least 50 characters.',
  }),
  origin_post: z.string().min(10, {
    message: 'Origin post must be at least 10 characters.',
  }),
  category: z.string().min(6, {
    message: 'Danh mục phải trên 6 ký tự',
  }),
  readingtime: z.number(),
  image: z.any()
});


export type FormCreateNews= z.infer<typeof formSchema>;