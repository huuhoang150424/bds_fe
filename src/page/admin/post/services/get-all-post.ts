import { handleApi } from "@/service";

export const getAllPost = async (page: number, limit: number) => {
  try {
    const response = await handleApi('/post/getAllPosts', null, 'GET', {
      page,
      limit,
    });
    return response.data.data.data;
  } catch (error) {
    throw error;
  }
};