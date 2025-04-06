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

export const getCommentByPost = async (postId: string): Promise<Comment[]> => {
    try {
        const url = `/comment/${postId}/getCommentByPostId`;
        const response = await handleApi(url, null, 'GET');
        
        // Nếu response có cấu trúc data.data thì trả về data.data
        // Nếu không, trả về data
        console.log('response.data.data?.data:', response.data.data?.data);
        console.log('response.data.data:', response.data.data);
        return response.data.data?.data || response.data.data || [];
    } catch (error) {
        console.error('Error fetching comment by post:', error);
        throw error;
    }
}