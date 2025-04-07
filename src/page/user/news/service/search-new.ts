import { handleApi } from "@/service";

export const getNewBySearch = async (keyWord: string) => {
  try {
    // `pageParam` là `lastCreatedAt` trong trường hợp này
    const url = `/new/findNews?keyword=${keyWord}`;
    const response = await handleApi(url, undefined, "GET");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching news by search:", error);
    throw error;
  }
};
