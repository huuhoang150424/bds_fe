import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteWishlist } from '../services/delete-wishlist';

export const useDeleteWishlist = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id: string) => deleteWishlist(id),
        onSuccess: () => {
        // Cập nhật cache của danh sách yêu thích sau khi xóa thành công
        queryClient.invalidateQueries({ queryKey: ['getWishlist'] });
        },
        onError: (error) => {
        console.error('Failed to delete wishlist:', error);
        },
    });
}