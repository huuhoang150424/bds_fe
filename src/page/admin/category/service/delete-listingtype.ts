import { handleApi } from "@/service";

export const deleteListingType = async (id: string): Promise<void> => {
  try {
    await handleApi(`/post/${id}/deleteListingType`, null, "DELETE");
  } catch (error) {
    throw error;
  }
};