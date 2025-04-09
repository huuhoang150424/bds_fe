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
  likeCount: number;
  dislikeCount: number;
  liked?: boolean;
  disliked?: boolean;
}

export interface CommentResponse {
  status: number;
  message: string;
  data: {
    data: Comment[];
    meta: {
      currentPage: number;
      totalPages: number;
      total: number;
      hasNextPage: boolean;
    };
  };
}

export const getCommentByPost = async (postId: string, page: number = 1, pageSize: number = 10) => {
  try {
    const offset = (page - 1) * pageSize;
    const response = await handleApi(`/comment/${postId}/getCommentByPostId?page=${page}&limit=${pageSize}&offset=${offset}`, null, 'GET');
    return response.data;
  } catch (error) {
    console.error('Error fetching comment by post:', error);
    throw error;
  }
};