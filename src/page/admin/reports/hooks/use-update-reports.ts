import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { updateReport, type UpdateReportData } from '../service/update-reports';

export const useUpdateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reportId, data }: { reportId: string; data: UpdateReportData }) => updateReport(reportId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      // toast({
      //   title: 'Thành công',
      //   description: 'Cập nhật báo cáo thành công',
      //   variant: 'success',
      // });
    },
    onError: (error: any) => {
      toast({
        title: 'Lỗi',
        description: error?.response?.data?.message || 'Không thể cập nhật báo cáo',
        variant: 'destructive',
      });
    },
  });
};