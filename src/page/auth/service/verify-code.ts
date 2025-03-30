import { handleApi } from '@/service';
import type { FormVerifyCode } from '../schema/verify-code';

export const verifyCode = async (data:FormVerifyCode) => {
  try {
    const response = await handleApi('/auth/verifyCode', data, 'POST');
    return response.data;
  } catch (error) {
    throw error;
  }
};
