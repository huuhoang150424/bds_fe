
import { handleApi } from '@/service';

interface SummaryResult {
  totalAppointments: number;
  growthRate: string;
  averageDaily: string;
  completionRate: string;
}

export const fetchAppointmentSummary = async (year: number): Promise<SummaryResult> => {
  try {
    const response = await handleApi('/appointment/getSummary', null, 'GET', { year });
    return response.data.data;
  } catch (error) {
    throw new Error('Không thể lấy thống kê lịch hẹn');
  }
};
