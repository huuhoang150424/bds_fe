import { handleApi } from "@/service";

export const getMyPosts = async (type:string,page:number,pageSize:number) => {
  try {
    const response = await handleApi(`/post/myPost/${type}`, null, 'GET',{
      page,
      limit: pageSize
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}