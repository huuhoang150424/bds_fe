import { handleApi } from "@/service";  

export const getAllReport = async (page: number, limit: number) => {
  try {
    const response = await handleApi('/reports/getAllReports', null, 'GET', {
      page,
      limit,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

