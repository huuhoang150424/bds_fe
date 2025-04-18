import {handleApi} from "@/service";

export const getAllUser = async (page: number, limit: number) => {
  try {
    const response = await handleApi(`/user/getAllUser?page=${page}&limit=${limit}`, null, 'GET');
    return response.data.data;
  } catch (error) {
    console.error('Error ', error);
    throw error;
  }
};