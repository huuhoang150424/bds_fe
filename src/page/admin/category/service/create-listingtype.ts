import { handleApi } from "@/service";
import { ListingTypeFormData, ListingTypeSchema } from "../schema/create-listingtype";

export const createListingType = async (data: ListingTypeFormData) => {
  try {
    // Validate data before sending
    const validatedData = ListingTypeSchema.parse(data);
    const response = await handleApi("/post/createListingType", validatedData, "POST");
    return response.data;
  } catch (error) {
    console.error("Error creating listing type:", error);
    throw error;
  }
};