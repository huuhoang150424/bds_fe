import { handleApi } from "@/service";

export interface PostItem {
  id: string;
  title: string;
  slug: string;
  price: number;
  priceUnit: string;
  address: string;
  squareMeters: number;
  description: string;
  createdAt: string;
  floor: number | null;
  bedroom: number | null;
  bathroom: number | null;
  priority: number;
  isFurniture: boolean;
  isRejected: boolean;
  direction: string;
  verified: boolean;
  expiredDate: string;
  status: string;
  userId: string;
  interactionCount: number;
  user: {
    id: string;
    fullname: string;
    email: string;
    phone: string;
    avatar: string;
  };
  images: {
    id: string;
    image_url: string;
  }[];
  tagPosts: {
    id: string;
    tag: {
      id: string;
      tag_name: string;
    };
  }[];
}

export const getTopPosts = async (): Promise<PostItem[]> => {
  try {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const url = `/post/topPostsByMonth?year=${year}&month=${month}`;
    const response = await handleApi(url, null, "GET");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};