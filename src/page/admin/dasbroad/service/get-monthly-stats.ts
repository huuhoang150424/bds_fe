import { handleApi } from '@/service';

export const getMonthlyStats = async () => {
  try {
    const response = await handleApi('/statisticalAdmin/getMonthlyStats', null, 'GET');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
