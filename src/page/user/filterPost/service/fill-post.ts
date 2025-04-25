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
  directions?: string;
  propertyTypeIds?: string[];
  listingTypeIds?: string[];
  page?: number;
  limit?: number;
  isProfessional?: boolean;
  ratings?: number[];
  status?: string[];
  tags?:string[];
  isFurniture?:boolean
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
  directions,
  propertyTypeIds,
  listingTypeIds,
  isProfessional,
  ratings,
  status,
  tags,
  isFurniture,
  page = 1,
  limit = 10
}: FillPostParams) => {
  try {
    const params = new URLSearchParams();
    if (keyword && keyword.length > 0) {
      keyword.forEach(key => params.append('keyword', key));
    }
    if (typeof bathrooms === 'number' && bathrooms > 0) {
      params.append('bathrooms', bathrooms.toString());
    }
    if (typeof bedrooms === 'number' && bedrooms > 0) {
      params.append('bedrooms', bedrooms.toString());
    }
    if (typeof minPrice === 'number' && minPrice > 0) {
      params.append('minPrice', minPrice.toString());
    }
    if (typeof maxPrice === 'number' && maxPrice > 0) {
      params.append('maxPrice', maxPrice.toString());
    }
    if (typeof minSquareMeters === 'number' && minSquareMeters > 0) {
      params.append('minSquareMeters', minSquareMeters.toString());
    }
    if (typeof maxSquareMeters === 'number' && maxSquareMeters > 0) {
      params.append('maxSquareMeters', maxSquareMeters.toString());
    }
    if (typeof floor === 'number' && floor > 0) {
      params.append('floor', floor.toString());
    }
    if (directions && directions.trim() !== '') {
      params.append('directions', directions);
    }
    if (propertyTypeIds && propertyTypeIds.length > 0) {
      propertyTypeIds.forEach(id => params.append('propertyTypeIds', id));
    }
    if (listingTypeIds && listingTypeIds.length > 0) {
      listingTypeIds.forEach(id => params.append('listingTypeIds', id));
    }
    if (typeof isProfessional === 'boolean' && isProfessional) {
      params.append('isProfessional', isProfessional.toString());
    }
    if (ratings && ratings.length > 0) {
      ratings.forEach(rating => params.append('ratings', rating.toString()));
    }
    if (status && status.length > 0) {
      status.forEach(s => params.append('status', s));
    }
    if (tags && tags.length > 0) {
      tags.forEach(tag => params.append('tagIds', tag));
    }
    if (typeof isFurniture === 'boolean') {
      params.append('isFurniture', isFurniture.toString());
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