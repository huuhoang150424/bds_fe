import { handleApi } from '@/service';

export const getPurchasedPackages = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await handleApi(`/pricing/getPurchased?page=${page}&limit=${limit}`, null, 'GET');
    return response.data;
  } catch (error) {
    throw error;
  }
};