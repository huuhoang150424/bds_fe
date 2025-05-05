import { z } from "zod";

export const formCreateAppointment = z.object({
  postId: z.string().optional(),
  receiverId: z.string().optional(), // Added receiverId to the schema
  appointmentTime: z.string({
    required_error: 'Vui lòng chọn thời gian cuộc hẹn.',
  }),
  duration: z.number({
    invalid_type_error: "Thời lượng phải là số"
  }).default(30),
  message: z.string({
    required_error: 'Vui lòng để lời nhắn.',
  })
});

export type FormCreateAppointment = z.infer<typeof formCreateAppointment>;