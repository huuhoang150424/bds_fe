import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppointment } from "../service/update-appointment";

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ appointmentId, updatedData }: {
      appointmentId: string;
      updatedData: any;
    }) => updateAppointment(appointmentId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myAppointments'] });
    },
  });
};