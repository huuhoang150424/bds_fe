import { handleApi } from "@/service";

export const getMonthlyRevenue = async (year: number) => {
  try {
    const response = await handleApi('/statisticalAdmin/monthlyRevenueStats', null, 'GET', { year });
    return response.data;
  } catch (error) {
    throw error;
  }
};