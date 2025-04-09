const getAxiosClient = async () => {
  const { axiosClient } = await import("./axiosClient");
  return axiosClient;
};

export const handleApi = async (
  url: string,
  data?: any,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  params?: any
) => {
  const axiosClient = await getAxiosClient();
  return axiosClient(url, {
    method,
    data,
    params,
  });
};
