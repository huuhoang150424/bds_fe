import { handleApi } from "@/service";

export const getAllNews = async (page:number,pageSize:number) => {
  try {
    const response = await handleApi('new/getAllNew', null, 'GET',{
      page,
      limit: pageSize
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}