import { handleApi } from '@/service';

export const registerProfessionalAgent = async () => {
  try {
    const response = await handleApi('/user/registerProfessionalAgent', {}, 'POST');
    return response.data;
  } catch (error) {
    throw error;
  }
};