import { z } from 'zod';

const formSchema = z
  .object({
    email: z.string().email({ message: 'Email không hợp lệ' }),
    fullName: z.string().min(1, { message: 'Tên ít nhất 1 ký tự' }),
    passWord: z.string().min(6, { message: 'Mật khẩu ít nhất 6 ký tự' }),
    confirmPassword: z.string().min(6, { message: 'Mật khẩu ít nhất 6 ký tự' }),
  })
  .refine((data) => data.passWord === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });

export default formSchema;