import { handleApi } from "@/service";

export const getNewsDetail = async (slug: string) => {
    try {
      console.log('slug:', slug);
      const url = `/new/${slug}/getNews`;
      const res = await handleApi(url, null, 'GET');
      console.log('Raw response from handleApi:', res);
      console.log('Type of res:', typeof res);
      console.log('res.data:', res.data);
      console.log('Type of res.data:', typeof res.data);
      console.log('Type of res.data.data:', typeof res.data.data);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching news detail:', error);
      throw error;
    }
  };