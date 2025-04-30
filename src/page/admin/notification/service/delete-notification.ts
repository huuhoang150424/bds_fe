import {handleApi} from "@/service";

export const deleteNotification = async (notificationId: string) => {
  try {
    const response = await handleApi(`/notification/getAllNotificationAdmin/${notificationId}`, null, 'DELETE');
    return response.data;
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};