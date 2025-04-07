import { handleApi } from '@/service';
import { Comment } from './get-comment-by-post';

interface CommentData {
  postId: string;
  content: string;
  parentId?: string | null;
}

export const addComment = async (data: CommentData): Promise<Comment & { postId: string; parentId?: string | null }> => {
  try {
    const url = '/comment/createComment';
    const response = await handleApi(url, data, 'POST');
    const responseData = response.data.data || response.data;
    return {
      ...responseData,
      postId: data.postId,
      parentId: data.parentId
    };
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};