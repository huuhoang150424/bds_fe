import { handleApi } from '@/service';

interface MonthlyStat {
  month: string;
  count: number;
}

export const fetchAppointmentStatisticalByMonth = async (year: number): Promise<MonthlyStat[]> => {
  try {
    const response = await handleApi('/appointment/getStatisticalByMonth', null, 'GET', { year });
    return response.data.data;
  } catch (error) {
    throw new Error('Không thể lấy thống kê lịch hẹn theo tháng');
  }
};
