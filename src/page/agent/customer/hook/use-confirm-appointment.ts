import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmAppointment } from "../service/confirm-appointment";

export const useConfirmAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ appointmentId, status ,changeReason}: {
      appointmentId: string;
      status: string; changeReason?: string ;
    }) => confirmAppointment(appointmentId, status ,changeReason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myAppointments'] });
    },
  });
};