import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/redux/authReducer';
import { getAllNotifications } from '../services/get-all-notification';

export const useGetAllNotification = () => {
  const isAuthenticated=useSelector(selectIsAuthenticated)
  return useQuery({
    queryKey: ['notifications'],
    queryFn: getAllNotifications,
    enabled: isAuthenticated
  });
};
