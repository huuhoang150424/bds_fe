import { handleApi } from "@/service";

export const getTopUsersByPost = async () => {
  try {
    const response = await handleApi('/statisticalAdmin/getTopUsersByPost', null, 'GET');
    return response.data;
  } catch (error) {
    throw error;
  }
};