import { handleApi } from "@/service";

export const deleteNews = async (newsId:string) => {
  try {
    const response = await handleApi(`/new/${newsId}/delete`, null, "DELETE");
    return response.data;
  } catch (error: any) {
    throw error;
  }
};