import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateNews } from '../service/update-news';
import { FormCreateNews } from '../schema/create-news';

export const useUpdateNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ newsId, data }: { newsId: string; data: FormCreateNews }) => updateNews(newsId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsAdmin'] });
    },
  });
};