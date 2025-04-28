import { handleApi } from '@/service';
import type { FormPayment } from '../schema/create-payment';

export const createPayment = async (data: FormPayment) => {
  try {
    const response = await handleApi('/transaction/create',data, 'POST');
    return response.data;
  } catch (error) {
    console.error('Error deleting wishlist:', error);
    throw error;
  }
};
