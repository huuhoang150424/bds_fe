import { z } from "zod";


export const formSchemaPhone = z.object({
  phone: z
    .string()
    .min(10, "Số điện thoại phải có 10 chữ số")
    .max(10, "Số điện thoại phải có 10 chữ số")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
    .refine((val) => val.startsWith("0"), {
      message: "Số điện thoại phải bắt đầu bằng số 0",
    }),
})

export type FormUpdatePhone=z.infer<typeof formSchemaPhone>;