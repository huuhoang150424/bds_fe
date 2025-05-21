import { handleApi } from "@/service";

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  createdAt: string;
  category: string;
  readingTime?: number;
  view: number;

  content:string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

export const getLatestNews = async (): Promise<NewsItem[]> => {
  try {
    const url = "/new/latestNews";
    const response = await handleApi(url, undefined, "GET");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};