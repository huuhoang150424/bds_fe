import { z } from 'zod';

const formSchemaLogin = z
  .object({
    email: z.string().email({message: "Vui lòng nhập email"}),
    password: z.string().min(6, {message: "Vui lòng nhập mật khẩu"}),
    })
    
export default formSchemaLogin;