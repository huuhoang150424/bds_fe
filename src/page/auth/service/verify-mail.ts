import { handleApi } from '@/service';

export const verifyMail = async ({ token, email }: { token: string; email: string }) => {
  try {
    const response = await handleApi(`auth/verifyMail?token=${token}&email=${email}`, null, 'GET');
    return response.data;
  } catch (error) {
    throw error;
  }
};