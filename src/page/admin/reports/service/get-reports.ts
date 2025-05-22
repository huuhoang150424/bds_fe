import {handleApi} from "@/service";

export const getAllReports = async (page: number, limit: number) => {
  try {
    const response = await handleApi(`/reports/getAllReports?page=${page}&limit=${limit}`, null, 'GET');
    return response.data;
  } catch (error) {
    throw error;
  }
};