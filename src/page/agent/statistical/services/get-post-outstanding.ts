import { data } from './../../../../constant/nav-agent';
import { handleApi } from "@/service";

export const getPostOutstanding = async () => {
  try {
    const response = await handleApi(`/post/getPostOutstanding`, null, 'GET');
    // console.log("response", response.data)
    // console.log("response", response.data.data)
    return response.data;
  } catch (error) {
    console.error('Error ', error);
    throw error;
  }
};