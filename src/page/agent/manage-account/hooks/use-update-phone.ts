import { useMutation } from '@tanstack/react-query';
import { updatePhone } from '../service/update-phone';

export const useUpdatePhone = () => {
  return useMutation({
    mutationFn: updatePhone,
    mutationKey: ['updatePhone'],
  });
};