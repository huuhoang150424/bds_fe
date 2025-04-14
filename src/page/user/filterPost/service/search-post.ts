import { handleApi } from "@/service";

export const SearchPost = async (addresses: string[]) => {
    try {
      const params = new URLSearchParams();
      addresses.forEach((item) => params.append("addresses", item));
  
      const url = `/post/searchPost?${params.toString()}`;
      const response = await handleApi(url, null, 'GET');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching search post:', error);
      throw error;
    }
  };
  