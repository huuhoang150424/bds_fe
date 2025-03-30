import { z } from "zod";


export const formSchemaForgotPassword = z.object( {
  email: z.string().email( "Email không hợp lệ" ),
} )


export type FormForgotPassword=z.infer<typeof formSchemaForgotPassword>;