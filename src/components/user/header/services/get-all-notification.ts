import { handleApi } from '@/service';

export const getAllNotifications = async () => {
  try {
    const url = '/notification/getAllNotification';
    const response = await handleApi(url, null, 'GET');
    return response.data;
  } catch (error) {
    throw error;
  }
};
