import { handleApi } from '@/service';

export const updatePost = async (postId: string, data: any, files: File[], deletedImageUrls: string[]) => {
  try {
    const formData:any = new FormData();

    // Thêm dữ liệu
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'images') return; // Bỏ qua images
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    });

    // Thêm file ảnh mới
    files.forEach((file) => {
      formData.append('images', file);
    });

    // Thêm deletedImageUrls
    formData.append('deletedImageUrls', JSON.stringify(deletedImageUrls));

    const response = await handleApi(
      `/post/${postId}/updatePost`,
      formData,
      'PUT'
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};