import { handleApi } from '@/service';

export const markNotification = async ({notificationId}: {notificationId:string}) => {
  try {
    const url = `/notification/${notificationId}/readNotification`;
    const response = await handleApi(url, null, 'PATCH');
    return response.data;
  } catch (error) {
    throw error;
  }
};
