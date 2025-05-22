import { handleApi } from "@/service";

export const getPostOutstanding = async () => {
  try {
    const response = await handleApi(`/post/getPostOutstanding`, null, 'GET');
    return response.data;
  } catch (error) {
    console.error('Error ', error);
    throw error;
  }
};