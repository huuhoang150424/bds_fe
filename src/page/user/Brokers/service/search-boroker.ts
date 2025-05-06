import { handleApi } from "@/service";

export const searchProfessionalAgents = async (query: string, page: number = 1, limit: number = 10) => {
  try {
    const response = await handleApi(`/user/findUser/${encodeURIComponent(query)}?page=${page}&limit=${limit}`, null, 'GET');
    return response.data;
  } catch (error) {
    throw error;
  }
};