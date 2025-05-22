import { useQuery } from '@tanstack/react-query';
import { fetchAppointmentTrend } from '../services/appointment-trend';



export const useGetAppointmentTrend = (year: number, period: string) => {
  return useQuery({
    queryKey: ['appointmentTrend', year, period],
    queryFn: () => fetchAppointmentTrend(year, period),
  });
};