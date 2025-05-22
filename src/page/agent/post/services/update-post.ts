import { handleApi } from '@/service';

export const updatePost = async (postId: string, data: any, files: File[], deletedImageUrls: string[]) => {
  try {
    const formData:any = new FormData();
    Object.entries(data).forEach(([key, value]:[string,any]) => {
      if (key === 'images') return;
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    });
    files.forEach((file) => {
      formData.append('images', file);
    });
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