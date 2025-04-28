import { handleApi } from '@/service';

export const createAppointments = async (data:any) => {
  try {
    console.log(data)
    const response = await handleApi('/appointment/createAppointment', data, 'POST');
    return response.data;
  } catch (error) {
    throw error;
  }
};
