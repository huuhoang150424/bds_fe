import { useQuery } from '@tanstack/react-query';
import { getUserDemographicStats } from '../service/get-user-demographic';

export const useGetUserDemographicStats = () => {
  return useQuery({
    queryKey: ['userDemographicStats'],
    queryFn: getUserDemographicStats,
  });
};