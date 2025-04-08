import { handleApi } from '@/service';

export const markAllNotification = async () => {
  try {
    const url = '/notification/readAllNotification';
    const response = await handleApi(url, null, 'PATCH');
    return response.data;
  } catch (error) {
    throw error;
  }
};
