import { handleApi } from "@/service";

export const getUserDemographicStats = async () => {
  try {
    const response = await handleApi('/statisticalAdmin/getUserDemographicStats', null, 'GET');
    return response.data;
  } catch (error) {
    throw error;
  }
};
