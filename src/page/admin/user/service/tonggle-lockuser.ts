import { handleApi } from '@/service';


export const toggleLockUser = async (userId: string, action: 'LOCK' | 'UNLOCK')=> {
  try {
    const response = await handleApi(`/user/${userId}/toggleUserLock?action=${action}`, null, 'PATCH');
    return response.data;
  } catch (error) {
    throw error;
  }
};