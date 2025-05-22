import { z } from "zod";

export const ListingTypeSchema = z.object({
  listingType: z
    .string({ required_error: "Loại danh sách không được để trống" })
    .min(1, "Loại danh sách không được để trống")
    .refine((val) => val !== undefined && val !== null, {
      message: "Loại danh sách không được để trống",
    }),
});

export type ListingTypeFormData = z.infer<typeof ListingTypeSchema>;