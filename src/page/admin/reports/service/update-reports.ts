import { handleApi } from '@/service';

export interface UpdateReportData {
  status: string;
  reason: string;
}


export const updateReport = async (reportId: string, data: UpdateReportData) => {
  try {
    const response = await handleApi(`/reports/${reportId}/updateReport`, data, 'PATCH');
    return response.data;
  } catch (error) {
    throw error;
  }
};