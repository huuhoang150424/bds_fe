import {useMutation} from '@tanstack/react-query';
import {addReport} from '../services/add-report';

export const useAddReport = () => {
  return useMutation({
    mutationFn: addReport,
    onSuccess: () => {
      console.log('Báo cáo bài viết thành công');
    },
    onError: (error) => {
      console.error('Failed to add report:', error);
    },
  });
};