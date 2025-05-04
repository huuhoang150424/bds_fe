import { handleApi } from '@/service';

export const buyPricing = async (pricingId: string) => {
  try {
    const response = await handleApi('/pricing/buyPricing', { pricingId }, 'POST');
    return response.data;
  } catch (error) {
    throw error;
  }
};
