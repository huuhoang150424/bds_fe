import { handleApi } from "@/service";

export const createNews = async (data:any) => {
  try {
    const response = await handleApi('/new/createNew', data, "POST");
    return response.data;
  } catch (error: any) {
    throw error;
  }
};