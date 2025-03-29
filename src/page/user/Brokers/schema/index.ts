import { z } from 'zod';

const formSendEmail = z.object({
  title: z.string().min(1, { message: "Vui lòng nhập tiêu đề" }),
  name: z.string().min(1, { message: "Vui lòng nhập tên liên hệ" }),
  email: z.string().email({ message: "Vui lòng nhập email hợp lệ" }),
  content: z.string().min(1, { message: "Vui lòng nhập nội dung" }).max(2000),
});

export default formSendEmail;
