import {handleApi} from "@/service";

export const getTopUser = async () => {
  try {
    const response = await handleApi(`/statistical/getTopUsersByPost`, null, 'GET');
    return response.data.data;
  } catch (error) {
    console.error('Error ', error);
    throw error;
  }
};