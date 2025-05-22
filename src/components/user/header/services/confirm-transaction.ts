import { handleApi } from '@/service';

export const confirmTransaction = async (orderCode: string) => {
  try {
    const response = await handleApi(`/transaction/success?orderCode=${orderCode}`, null, 'GET');
    return response.data;
  } catch (error) {
    console.error('Error confirming transaction:', error);
    throw error;
  }
};

export const cancelTransaction = async (orderCode: string, status?: string) => {
  try {
    const query = status ? `/transaction/cancel?orderCode=${orderCode}&status=${status}` : `/transaction/cancel?orderCode=${orderCode}`;
    const response = await handleApi(query, null, 'GET');
    return response.data;
  } catch (error) {
    console.error('Error cancelling transaction:', error);
    throw error;
  }
};