import { handleApi } from '@/service';
import { PricingFormData } from '../schema/create-pricing';

export const editPricing = async (id: string, pricingData: PricingFormData): Promise<any> => {
  try {
    const response = await handleApi(`/pricing/${id}/editPricing`, pricingData, 'PUT');
    return response.data;
  } catch (error) {
    console.error('Error editing pricing:', error);
    throw error;
  }
};