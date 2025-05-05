import { handleApi } from "@/service";

export const getAllBanner = async (page: number, limit: number) => {
  try {
    const response = await handleApi('/banner/getAllBanners', null, 'GET', {
      page,
      limit,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};