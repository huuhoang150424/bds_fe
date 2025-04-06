import { handleApi } from '@/service';

export const sendMessages = async (data: any) => {
  try {
    const response = await handleApi(`/chat/send`, data, 'POST');
    console.log("check")
    return response.data;
  } catch (error) {
    console.error('Error ', error);
    throw error;
  }
};
