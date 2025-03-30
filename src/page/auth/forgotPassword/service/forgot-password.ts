import { handleApi } from '@/service';
import { FormForgotPassword } from '../schema/forgot-password';

export const forgotPassword = async (data:FormForgotPassword) => {
  try {
    const response = await handleApi('/auth/forgotPassword', data, 'POST');
    return response.data;
  } catch (error) {
    throw error;
  }
};
