import { useQuery } from '@tanstack/react-query';
import { handleApi } from '@/service';
import { fetchAppointmentSummary } from '../services/appointment-summary';

export const useGetAppointmentSummary = (year: number) => {
  return useQuery({
    queryKey: ['appointmentSummary', year],
    queryFn: () => fetchAppointmentSummary(year),
  });
};