import { handleApi } from "@/service";
import { SendNotificationFormData } from "../schema/send-notification";


export const sendNotification = async (data: SendNotificationFormData) => {
  try {
    const response = await handleApi('/notification/sendNotificationAll', data, 'POST');
    return response.data;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};