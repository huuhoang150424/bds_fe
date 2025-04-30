import { handleApi } from "@/service";

export const deleteBanner = async (bannerId:string) => {
  try {
    const response = await handleApi(`banner/${bannerId}/deleteBanner`, null, 'DELETE');
    return response.data;
  } catch (error) {
    throw error;
  }
};