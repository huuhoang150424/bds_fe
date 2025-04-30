import { handleApi } from "@/service";
import { FormValues } from "../schema/create-banner";

export const editBanner = async (data:FormValues,bannerId:string) => {
  try {
    const response = await handleApi(`banner/${bannerId}/updateBanner`, data, 'PUT');
    return response.data;
  } catch (error) {
    throw error;
  }
};