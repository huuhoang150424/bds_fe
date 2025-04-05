import { handleApi } from '@/service';

export const addComment = async (data: { postId: string; content: string }) => {
  try {
    console.log('Adding comment with data:', data);
    const url = '/comment/createComment'; // Kiểm tra endpoint thực tế từ API
    const response = await handleApi(url, data, 'POST');
    console.log('Response from addComment:', response);
    return response.data; // Hoặc response.data.data tùy cấu trúc
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error; // Ném lỗi để React Query xử lý
  }
};