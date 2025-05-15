import { handleApi } from "@/service";

export const getPostsByMapBounds = async (
  page: number,
  limit: number,
  address?: string
) => {
  try {
    const response = await handleApi(`/post/postsByMapBounds/${address}`, null, 'GET', {
      page,
      limit
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};