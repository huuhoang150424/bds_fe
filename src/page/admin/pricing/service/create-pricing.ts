import { handleApi } from '@/service';
import { PricingFormData, PricingSchema } from '../schema/create-pricing';

export const createPricing = async (data: PricingFormData): Promise<void> => {
  try {
    const validatedData = PricingSchema.parse(data);
    await handleApi('/pricing/createPricing', validatedData, 'POST');
  } catch (error) {
    console.error('Error creating pricing:', error);
    throw error;
  }
};