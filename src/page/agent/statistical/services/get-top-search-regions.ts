import {handleApi} from "@/service";

export const getToSearchRegions = async () => {
  try {
    const response = await handleApi(`/statistical/getTopSearchRegionsWithGrowth`, null, 'GET');
    return response.data.data;
  } catch (error) {
    console.error('Error ', error);
    throw error;
  }
};