import { useQuery } from '@tanstack/react-query';
import { getWishlist } from '../services/get-wishlist';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/redux/authReducer';

export const useGetWishlist = () => {
  const isAuthenticated=useSelector(selectIsAuthenticated)
  return useQuery({
    queryKey: ['getWishlist'],
    queryFn: getWishlist,
    enabled: isAuthenticated
  });
};
