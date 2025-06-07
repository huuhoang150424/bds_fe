import { handleApi } from '@/service';

export const cancelPricing = async (packageId: string) => {
  try {
    const response = await handleApi('/pricing/cancelPricing', null, 'POST');
    return response.data;
  } catch (error) {
    console.error('Error canceling pricing package:', error);
    throw error;
  }
};