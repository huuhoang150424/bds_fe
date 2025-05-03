import { handleApi } from "@/service";

export const getMyAppointments = async ( page: number, pageSize: number) => {
  try {
    const response = await handleApi(`/appointment/getAppointmentsByUser`, null, 'GET', {
      page,
      limit: pageSize,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};