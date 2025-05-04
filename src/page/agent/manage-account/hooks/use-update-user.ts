import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../service/update-user';

export const useUpdateUser = () => {
  const queryClient=useQueryClient()
  return useMutation({
    mutationFn: (data: { userId: string; formData: FormData }) => updateUser(data.userId, data.formData),
    onSuccess: ()=>{
      queryClient.invalidateQueries({ queryKey: ['profileUser'] });
    }
  });
};