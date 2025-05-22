import { useMutation } from '@tanstack/react-query';
import { registerProfessionalAgent } from '../service/register-professional';

export const useRegisterProfessionalAgent = () => {
  return useMutation({
    mutationFn: registerProfessionalAgent,
    mutationKey: ['registerProfessionalAgent'],
  });
};