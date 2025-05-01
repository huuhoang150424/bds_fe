import { handleApi } from '@/service';

export const deletePricing = async (id: string) => {
  try {
    await handleApi(`/pricing/${id}/deletePricing`, null, 'DELETE');
  } catch (error) {
    console.error('Error deleting pricing:', error);
    throw error;
  }
};