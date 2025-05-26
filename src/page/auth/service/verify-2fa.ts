import { handleApi } from '@/service';

export const verify2FA = async (data: { userId: string; token: string }) => {
  try {
    const response = await handleApi('/auth/verify2fa', data, 'POST');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const googleLogin = async (data: { email: string; displayName: string; photoUrl: string }) => {
  try {
    const response = await handleApi('/auth/loginGoogle', data, 'POST');
    return response.data;
  } catch (error) {
    throw error;
  }
};