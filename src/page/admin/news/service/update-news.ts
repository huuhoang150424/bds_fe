import { handleApi } from '@/service';
import { FormCreateNews } from '../schema/create-news';

export const updateNews = async (newsId: string, data: FormCreateNews) => {
  try {
    const response = await handleApi(`/new/${newsId}/update`, data, 'PUT');
    return response.data;
  } catch (error) {
    throw error;
  }
};