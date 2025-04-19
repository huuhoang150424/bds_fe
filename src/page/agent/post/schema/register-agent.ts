import { z } from "zod";



export const formSchemaRegisterAgent = z.object({
  fullName: z.string().min(2, {
    message: 'Họ tên phải có ít nhất 2 ký tự.',
  }),
  email: z.string().email({
    message: 'Email không hợp lệ.',
  }),
  phone: z.string().min(10, {
    message: 'Số điện thoại không hợp lệ.',
  }),
  address: z.string().min(5, {
    message: 'Địa chỉ phải có ít nhất 5 ký tự.',
  }),
  experience: z.string({
    required_error: 'Vui lòng chọn kinh nghiệm.',
  }),
  specialization: z.string({
    required_error: 'Vui lòng chọn chuyên môn.',
  }),
  bio: z.string().min(10, {
    message: 'Giới thiệu phải có ít nhất 10 ký tự.',
  }),
});


export type FormRegisterAgent=z.infer<typeof formSchemaRegisterAgent>;