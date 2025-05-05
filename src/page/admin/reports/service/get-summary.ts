import {handleApi} from "@/service";

export const getSummary = async () => {
  try {
    const response = await handleApi(`/reports/getSummary`, null, 'GET');
    return response.data;
  } catch (error) {
    throw error;
  }
};