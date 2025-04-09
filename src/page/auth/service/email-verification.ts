import { handleApi } from '@/service';

export const sendVerificationEmail = async (data: { email: string }) => {
  try {
    const response = await handleApi('/auth/verifyAccount', data, 'POST');
    return response.data;
  } catch (error) {
    throw error;
  }
};
