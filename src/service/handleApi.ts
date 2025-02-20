import { axiosClient } from "./axiosClient";

export const handleApi = async (
  url: string,
  data?: any,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  params?: any
) => {
  return axiosClient(url, {
    method,
    data,
    params,
  });
};