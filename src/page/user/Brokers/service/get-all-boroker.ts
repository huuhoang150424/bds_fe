import { handleApi } from '@/service';

export const getProfessionalAgents = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await handleApi(`/user/getProfessionalAgents?page=${page}&limit=${limit}`, null, 'GET');
    return response.data;
  } catch (error) {
    throw error;
  }
};