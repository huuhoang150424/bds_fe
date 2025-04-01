// service/verify-code.ts
import { handleApi } from '@/service';

export const verifyCode = async (data: { email: string; otpCode: string }) => {
  try {
    const response = await handleApi('/auth/verifyCode', data, 'POST');
    return response.data;
  } catch (error) {
    throw error;
  }
};