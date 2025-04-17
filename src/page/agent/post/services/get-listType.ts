import { handleApi } from "@/service";

export const getListType = async () => {
  try {
    const response = await handleApi('/post/getListingTypes', null, 'GET');
    return response.data.data;
  } catch (error) {
    console.error('Error ', error);
    throw error;
  }
}