import { handleApi } from "@/service";

export const confirmAppointment = async (appointmentId: string, status: string, changeReason?: string ) => {
  try {
    const response = await handleApi(`/appointment/${appointmentId}/confirmAppointment`, {status:status,changeReason:changeReason}, 'PUT');
    return response.data;
  } catch (error) {
    throw error;
  }
};