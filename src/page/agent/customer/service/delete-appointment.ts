import { handleApi } from "@/service";

export const deleteAppointment = async (appointmentId: string) => {
  try {
    const response = await handleApi(`/appointment/${appointmentId}/deleteAppointment`, null, 'DELETE');
    return response.data;
  } catch (error) {
    throw error;
  }
};