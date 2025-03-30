import { handleApi } from '@/service';
import type { FormResetPassword } from '../schema/reset-password';

export const resetPassword = async (data:FormResetPassword) => {
  try {
    const response = await handleApi('/auth/resetPassword', data, 'PATCH');
    return response.data;
  } catch (error) {
    throw error;
  }
};
