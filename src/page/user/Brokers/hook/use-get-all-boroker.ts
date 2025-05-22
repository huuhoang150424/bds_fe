import { useQuery } from '@tanstack/react-query';
import { getProfessionalAgents } from '../service/get-all-boroker';

export const useGetProfessionalAgents = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ['professionalAgents', page, limit],
    queryFn: () => getProfessionalAgents(page, limit),
  });
};