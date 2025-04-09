// services/post.ts
import { handleApi } from '@/service';

interface FillPostParams {
    keyword?: string[];
  bathrooms?: number;
  bedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  minSquareMeters?: number;
  maxSquareMeters?: number;
  floor?: number;
  direction?: string;
}

export const fillPost = async ({
  keyword,
  bathrooms,
  bedrooms,
  minPrice,
  maxPrice,
  minSquareMeters,
  maxSquareMeters,
  floor,
  direction,
}: FillPostParams) => {
  try {
    const params = new URLSearchParams();
    
    // Thêm từng tham số riêng lẻ vào params
    if (keyword && keyword.length > 0) {
        keyword.forEach(key => params.append('keyword', key));
    }
    if (bathrooms !== undefined) params.append('bathrooms', bathrooms.toString());
    if (bedrooms !== undefined) params.append('bedrooms', bedrooms.toString());
    if (minPrice !== undefined) params.append('minPrice', minPrice.toString());
    if (maxPrice !== undefined) params.append('maxPrice', maxPrice.toString());
    if (minSquareMeters !== undefined) params.append('minSquareMeters', minSquareMeters.toString());
    if (maxSquareMeters !== undefined) params.append('maxSquareMeters', maxSquareMeters.toString());
    if (floor !== undefined) params.append('floor', floor.toString());
    if (direction !== undefined) params.append('direction', direction);

    // Log URL để debug
    const url = `/post/filterPost?${params.toString()}`;
    console.log('Requesting API with URL:', url);

    const response = await handleApi(
      url,
      null,
      'GET',
    );

    return response.data.data; // Giả định response.data.data chứa danh sách bài viết đã lọc
  } catch (error) {
    console.error('Error filtering posts:', error);
    throw error;
  }
};