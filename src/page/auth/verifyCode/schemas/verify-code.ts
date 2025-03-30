import { z } from "zod";

export const formSchemaVerification = z.object({
  code: z
    .string()
    .length(4, "Mã xác thực phải có 4 chữ số")
    .regex(/^\d{4}$/, "Mã xác thực chỉ được chứa số"),
})

export type FormVerifyCode=z.infer<typeof formSchemaVerification>;