import { handleApi } from '@/service';

export const getAllMessages = async (receiverId: string) => {
  try {
    console.log("gọi api")
    const response = await handleApi(`/chat/${receiverId}/getAllMessage`, null, 'GET');
    console.log(response.data)
    return response.data;

  } catch (error) {
    console.error('Error ', error);
    throw error;
  }
};
