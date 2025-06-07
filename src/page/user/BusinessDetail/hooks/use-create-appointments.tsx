import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAppointments } from "../service/create-appointment";
import { toast } from "@/hooks/use-toast";

export const useCreateAppointments = ( ) => {
  const queryClient=useQueryClient()
  return useMutation({
    mutationFn: (data:any)=>createAppointments(data),
    onSuccess: (data)=>{
      toast({
        title: 'Lịch hẹn của bạn đã được đặt thành công. Bạn sẽ nhận được xác nhận sớm.',
        variant: 'success'
      })
      queryClient.invalidateQueries({ queryKey: ['myAppointments'] });
    },
    onError: (error)=>{
      toast({
        title: 'Đặt lịch hẹn thất bại',
        variant: 'destructive'
      })
    }
  })
}