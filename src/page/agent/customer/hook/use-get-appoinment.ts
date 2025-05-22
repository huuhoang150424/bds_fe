import { useQuery } from "@tanstack/react-query";
import { getMyAppointments } from "../service/get-appoinment";

export const useGetMyAppointments = (page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryKey: ['myAppointments', page, pageSize],
    queryFn: () => getMyAppointments( page, pageSize),
  });
};