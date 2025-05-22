import { handleApi } from "@/service";

export const getAllNews = async (limit: number, lastCreatedAt: string = "") => {
  try {
    const url = `/new/getAllNew?limit=${limit}&lastCreatedAt=${encodeURIComponent(lastCreatedAt)}`;
    
    const response = await handleApi(url, undefined, "GET");
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};