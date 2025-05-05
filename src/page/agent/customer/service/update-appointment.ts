import { handleApi } from "@/service";

export const updateAppointment = async (appointmentId: string, updatedData: any) => {
  try {
    const response = await handleApi(`/appointment/${appointmentId}/updateAppointment`, updatedData, 'PUT');
    return response.data;
  } catch (error) {
    throw error;
  }
};