import { handleApi } from "@/service";

interface TypeStat {
  name: string;
  value: number;
}

export const fetchAppointmentTypesStats = async (year: number): Promise<TypeStat[]> => {
  try {
    const response = await handleApi('/appointment/getAppointmentTypesStats', null, 'GET', { year });
    return response.data.data;
  } catch (error) {
    throw new Error('Không thể lấy thống kê phân loại lịch hẹn');
  }
};
