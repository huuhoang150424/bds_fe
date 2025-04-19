import { z } from "zod";



export const formSchemaRegisterAgent = z.object({
  fullName: z.string().min(2, {
    message: 'Họ tên phải có ít nhất 2 ký tự.',
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
  expertise: z.array(z.string()).min(1, "Vui lòng chọn chuyên môn."), 
  selfIntroduction: z.string().min(10, {
    message: 'Giới thiệu phải có ít nhất 10 ký tự.',
  }),
  certificates: z.any()
});


export type FormRegisterAgent=z.infer<typeof formSchemaRegisterAgent>;