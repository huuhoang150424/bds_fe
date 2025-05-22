
import { handleApi } from '@/service';

interface TrendData {
  month: string;
  current: number;
  previous: number;
}

export const fetchAppointmentTrend = async (year: number, period: string): Promise<TrendData[]> => {
  try {
    const response = await handleApi('/appointment/getAppointmentTrend', null, 'GET', { year, period });
    return response.data.data;
  } catch (error) {
    throw new Error('Không thể lấy thống kê xu hướng lịch hẹn');
  }
};

