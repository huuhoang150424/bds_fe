import { handleApi } from '@/service';

export const getSatisticalByViewAddress = async () => {
  try {
    const response = await handleApi(`/statistical/getViewByAddress`, null, 'GET');
    return response.data.data;
  } catch (Error) {
    console.error('Error ', Error);
    throw Error;
  }
};
