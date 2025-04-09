import { z } from 'zod';

const formSchema = z
  .object({
    email: z.string().email({ message: 'Email không hợp lệ' }),
    fullname: z.string().min(1, { message: 'Tên ít nhất 1 ký tự' }),
    password: z.string().min(6, { message: 'Mật khẩu ít nhất 6 ký tự' }),
    confirmPassword: z.string().min(6, { message: 'Mật khẩu ít nhất 6 ký tự' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });

export type FormRegister=z.infer<typeof formSchema>;
export default formSchema;