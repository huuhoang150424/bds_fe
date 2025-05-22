import { handleApi } from "@/service";
import { FormValues } from "../schema/create-banner";

export const createBanner = async (data:FormValues) => {
  try {
    const response = await handleApi('/banner/createBanner', data, 'POST');
    return response.data;
  } catch (error) {
    throw error;
  }
};