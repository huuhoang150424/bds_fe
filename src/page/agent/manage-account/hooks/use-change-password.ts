import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../service/change-password';

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    mutationKey: ['changePassword'],
  });
};