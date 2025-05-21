import {handleApi} from "@/service";

export const getTopUser = async () => {
  try {
    const response = await handleApi(`/statisticalAdmin/getTopUsersByPost`, null, 'GET');
    return response.data.data;
  } catch (error) {
    console.error('Error ', error);
    throw error;
  }
};