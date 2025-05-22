import { useQuery } from '@tanstack/react-query';

import { fetchAppointmentStatisticalByMonth } from '../services/appointment-mount';


export const useGetAppointmentStatisticalByMonth = (year: number) => {
  return useQuery({
    queryKey: ['appointmentStatsByMonth', year],
    queryFn: () => fetchAppointmentStatisticalByMonth(year),
  });
};