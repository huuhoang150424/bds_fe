import { handleApi } from '@/service';

export const getAllTransactions = async (params: {
  page: number;
  limit: number;
  type: 'income' | 'expense';
}) => {
  try {
    const { page, limit, type } = params;
    const queryParams = { page, limit };
    const response = await handleApi(`/transaction/getAllTransaction/${type}`, null, 'GET', queryParams);
    return response.data;
  } catch (error) {
    throw error;
  }
};