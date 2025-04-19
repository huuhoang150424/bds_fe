import { handleApi } from "@/service";

export const registerBroker = async (data:any) => {
  try {
    const response = await handleApi('/user/registerBroker', data, 'PATCH');
    return response.data;
  } catch (error) {
    throw error;
  }
}