
import { handleApi } from '@/service';

interface PostTypeConversionData {
  type: string;
  appointments: number;
  conversionRate: number;
}

export const fetchPostTypeConversion = async (year: number): Promise<PostTypeConversionData[]> => {
  try {
    const response = await handleApi('/appointment/getPostTypeConversion', null, 'GET', { year });
    return response.data.data;
  } catch (error) {
    throw new Error('Không thể lấy thống kê tỷ lệ chuyển đổi theo loại bài đăng');
  }
};

