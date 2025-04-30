import { z } from 'zod';

export const sendNotificationSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  priority: z.number().int().min(1).max(5).optional(),
  endDate: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    { message: 'Invalid endDate format' }
  ),
  userId: z.union([z.string(), z.array(z.string())]).optional(),
});


export type SendNotificationFormData = z.infer<typeof sendNotificationSchema>;
