import {handleApi} from "@/service";

export const getAllPricings = async (page: number, limit: number) => {
  try {
    const response = await handleApi(`/pricing/getAllPricing?page=${page}&limit=${limit}`, null, 'GET');
    return response.data;
  } catch (error) {
    console.error('Error ', error);
    throw error;
  }
};