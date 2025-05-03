import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment } from "../service/delete-appointment";

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (appointmentId: string) => deleteAppointment(appointmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myAppointments'] });
    },
  });
};