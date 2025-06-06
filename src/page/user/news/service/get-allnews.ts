import { handleApi } from "@/service";



export const getAllNews = async (limit: number, lastCreatedAt: string) => {
  try {
    const url = `/new/getAllNew?limit=${limit}&lastCreatedAt=${encodeURI(lastCreatedAt)}`;

    const response = await handleApi(url, undefined, "GET");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};