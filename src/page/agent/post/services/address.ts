import { urlTinhThanh } from '@/constant/baseUrl';
import axios from 'axios';

export const getProvinces = async () => {
  try {
    const response = await axios.get(`${urlTinhThanh}/1/0.htm`);
    return response.data;
  } catch (error: any) {
    throw new error;
  }
};
export const getDistricts = async (provinceId: string) => {
  try {
    const response = await axios.get(`${urlTinhThanh}/2/${provinceId}.htm`);
    return response.data;
  } catch (error: any) {
    throw new error();
  }
};
export const getWards = async (districtId: string) => {
  try {
    const response = await axios.get(`${urlTinhThanh}/3/${districtId}.htm`);
    return response.data;
  } catch (error: any) {
    throw new error();
  }
};
export const getAllAddresses = async () => {
  try {
    const response = await axios.get('${urlTinhThanh}/4/0.htm');
    return response.data;
  } catch (error: any) {
    throw new error();
  }
};
