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
  propertyTypeIds?: string[];
  listingTypeIds?: string[];
  page?: number;
  limit?: number;
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
  propertyTypeIds,
  listingTypeIds,
  page = 1,
  limit = 10
}: FillPostParams) => {
  try {
    const params = new URLSearchParams();
    
    if (keyword && keyword.length > 0) {
      keyword.forEach(key => params.append('keyword', key));
    }
    
    if (bathrooms !== undefined && bathrooms > 0) params.append('bathrooms', bathrooms.toString());
    if (bedrooms !== undefined && bedrooms > 0) params.append('bedrooms', bedrooms.toString());
    if (minPrice !== undefined && minPrice > 0) params.append('minPrice', minPrice.toString());
    if (maxPrice !== undefined && maxPrice > 0) params.append('maxPrice', maxPrice.toString());
    if (minSquareMeters !== undefined && minSquareMeters > 0) params.append('minSquareMeters', minSquareMeters.toString());
    if (maxSquareMeters !== undefined && maxSquareMeters > 0) params.append('maxSquareMeters', maxSquareMeters.toString());
    if (floor !== undefined && floor > 0) params.append('floor', floor.toString());
    if (direction !== undefined && direction !== '') params.append('direction', direction);
    
    if (propertyTypeIds && propertyTypeIds.length > 0) {
      propertyTypeIds.forEach(id => params.append('propertyTypeIds', id));
    }
    
    if (listingTypeIds && listingTypeIds.length > 0) {
      listingTypeIds.forEach(id => params.append('listingTypeIds', id));
    }
    
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    const url = `/post/filterPost?${params.toString()}`;
    const response = await handleApi(
      url,
      null,
      'GET',
    );
    return response.data;
  } catch (error) {
    console.error('Error filtering posts:', error);
    throw error;
  }
};