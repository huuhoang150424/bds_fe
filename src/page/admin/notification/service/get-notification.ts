import {handleApi} from "@/service";

export const getAllNotification = async (page: number, limit: number) => {
  try {
    const response = await handleApi(`/notification/getAllNotificationAdmin?page=${page}&limit=${limit}`, null, 'GET');
    return response.data;
  } catch (error) {
    console.error('Error ', error);
    throw error;
  }
};