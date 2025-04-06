import { useQuery } from '@tanstack/react-query';
import { getConversations } from '../service/get-all-conversation';

export const useGetAllConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn:  getConversations,
  });
};
