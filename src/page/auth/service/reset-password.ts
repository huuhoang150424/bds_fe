import { handleApi } from '@/service';

export const resetPassword = async (data:{newPassword:string,resetToken:string,email:string}) => {
  try {
    const response = await handleApi('/auth/resetPassword', data, 'PATCH');
    return response.data;
  } catch (error) {
    throw error;
  }
};
