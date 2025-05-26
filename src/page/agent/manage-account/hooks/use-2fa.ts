import { useMutation, useQuery } from '@tanstack/react-query';
import { get2FASecret, enable2FA, disable2FA } from '../service/2fa';

export const useGet2FASecret = () => {
  return useQuery({
    queryKey: ['2FASecret'],
    queryFn: get2FASecret,
    enabled: false, 
  });
};

export const useEnable2FA = () => {
  return useMutation({
    mutationFn: enable2FA,
    mutationKey: ['enable2FA'],
  });
};

export const useDisable2FA = () => {
  return useMutation({
    mutationFn: disable2FA,
    mutationKey: ['disable2FA'],
  });
};