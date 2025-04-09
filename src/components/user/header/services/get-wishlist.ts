import { handleApi } from '@/service';

export const getWishlist = async () => {
  try {
    const url = '/wishlist/getUserWishlist';
    const response = await handleApi(url, null, 'GET');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};
