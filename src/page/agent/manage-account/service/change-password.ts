import { handleApi } from '@/service';

export const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  try {
    const response = await handleApi('/auth/changePassword', data, 'PATCH');
    return response.data;
  } catch (error) {
    throw error;
  }
};
