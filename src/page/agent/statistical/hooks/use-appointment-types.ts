import { useQuery } from '@tanstack/react-query';
import { fetchAppointmentTypesStats } from '../services/appointment-types';



export const useGetAppointmentTypesStats = (year: number) => {
  return useQuery({
    queryKey: ['appointmentTypesStats', year],
    queryFn: () => fetchAppointmentTypesStats(year),
  });
};