import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { updatePhone } from '../service/update-phone';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { updatePhoneStore } from '@/redux/authReducer';
import { useAuthModal } from '@/context/auth-modal';

export const useUpdatePhone = () => {
  const { closeModal } = useAuthModal();
  const dispatch = useDispatch<AppDispatch>();

  return useMutation({
    mutationFn: updatePhone,
    onSuccess: (data) => {
      toast({
        title: 'Cập nhật số điện thoại thành công',
        description: 'Bạn có thể đăng tin ngay bây giờ',
      });
      closeModal();
      dispatch(updatePhoneStore({ phone: data?.data?.newPhone }));
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Lỗi xác thực',
        description: error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật số điện thoại',
      });
    },
  });
};
