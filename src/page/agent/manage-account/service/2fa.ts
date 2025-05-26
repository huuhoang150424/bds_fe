import { handleApi } from '@/service';

export const get2FASecret = async () => {
  try {
    const response = await handleApi('/auth/2faSecret', null, 'GET');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const enable2FA = async (data: { token: string }) => {
  try {
    const response = await handleApi('/auth/enable2fa', data, 'POST');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const disable2FA = async (data: { token: string }) => {
  try {
    const response = await handleApi('/auth/disable2fa', data, 'POST');
    return response.data;
  } catch (error) {
    throw error;
  }
};