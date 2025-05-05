import { handleApi } from "@/service";
import { ListingTypeFormData, ListingTypeSchema } from "../schema/create-listingtype";

export const updateListingType = async (id: string, data: ListingTypeFormData): Promise<void> => {
  try {
    const validatedData = ListingTypeSchema.parse(data);
    await handleApi(`/post/${id}/updateListingType`, validatedData, "PUT");
  } catch (error) {
    console.error("Error updating listing type:", error);
    throw error;
  }
};