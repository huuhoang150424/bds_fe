import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLockUser } from '../service/tonggle-lockuser';

export const useToggleLockUser=() =>{
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, action }: { userId: string; action: 'LOCK' | 'UNLOCK' }) => toggleLockUser(userId, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}