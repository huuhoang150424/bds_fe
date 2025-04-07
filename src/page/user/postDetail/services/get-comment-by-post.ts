import { handleApi } from '@/service';

export interface User {
  id?: string;
  fullname: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  postId: string;
  content: string;
  status: string;
  parentId: string | null;
  user: User;
}

export interface CommentResponse {
  status: number;
  message: string;
  data: Comment[];
  meta?: {
    hasNextPage: boolean;
    nextCreatedAt: string;
    total: number;
  };
}

export const getCommentByPost = async (postId: string) => {
  try {
    const response = await handleApi(`/comment/${postId}/getCommentByPostId`, null, 'GET');
    console.log("check data" ,response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching comment by post:', error);
    throw error;
  }
};
