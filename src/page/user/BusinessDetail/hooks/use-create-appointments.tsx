import { useMutation, useQuery } from "@tanstack/react-query";
import { createAppointments } from "../service/create-appointment";
import { toast } from "@/hooks/use-toast";

export const useCreateAppointments = ( ) => {
  return useMutation({
    mutationFn: (data:any)=>createAppointments(data),
    onSuccess: (data)=>{
      toast({
        title: 'Đặt lịch hẹn thành công',
        variant: 'success'
      })
    },
    onError: (error)=>{
      toast({
        title: 'Đặt lịch hẹn thất bại',
        variant: 'destructive'
      })
    }
  })
}