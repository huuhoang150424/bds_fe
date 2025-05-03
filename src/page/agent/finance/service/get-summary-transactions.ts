import { handleApi } from "@/service";

export const getFinancialSummary = async () => {
  try {
    const response = await handleApi('/transaction/getSummary', null, 'GET');
    return response.data;
  } catch (error) {
    throw error;
  }
};