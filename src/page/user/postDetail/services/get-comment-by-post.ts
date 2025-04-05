import { handleApi } from '@/service';
export interface User {
    fullname: string
  }
  
  export interface Comment {
    id: string
    createdAt: string
    updatedAt: string
    userId: string
    postId: string
    content: string
    status: string
    parentId: string | null
    user: User
  }
  
  export interface CommentResponse {
    status: number
    message: string
    data: {
      data: Comment[]
      meta: {
        hasNextPage: boolean
        nextCreatedAt: string
        total: number
      }
    }
  }
export const getCommentByPost = async (postId: string) => {
    try {
        console.log('postId:', postId);
        const url = `/comment/${postId}/getCommentByPostId`;
        const response = await handleApi(url, null, 'GET');
        console.log('response:', response.data.data);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching comment by post:', error);
        throw error;
    }
    }