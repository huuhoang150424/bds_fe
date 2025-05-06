import { handleApi } from "@/service";

export interface SendAllNotificationFormData {
  message: string;
  priority?: number;
  endDate: string;
}


export const sendAllNotification = async (data: SendAllNotificationFormData) => {
  try {
    const response = await handleApi('/notification/sendNotificationAllUser', data, 'POST');
    return response.data;
  } catch (error) {
    console.error('Error sending notification to all users:', error);
    throw error;
  }
};