import { useQuery } from '@tanstack/react-query';
import { getAllMessages } from '../service/get-all-message';

export const useGetAllMessage = (receiverId: string) => {
  return useQuery<any[], Error>({
    queryKey: ['messages', receiverId],
    queryFn: () => getAllMessages(receiverId),
    enabled: !!receiverId,
    staleTime: 0,
    gcTime: 0,
  });
};
