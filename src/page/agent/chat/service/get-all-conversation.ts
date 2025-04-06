import { handleApi } from '@/service';

export const getConversations = async () => {
  try {
    const response = await handleApi(`/chat/getAllConversation`, null, 'GET');
    return response.data;
  } catch (error) {
    console.error('Error ', error);
    throw error;
  }
};
