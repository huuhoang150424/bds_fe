import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaHeart , FaRegHeart } from "react-icons/fa";
import { useGetWishlist } from '@/components/user/header/hooks/use-get-wishlist';
import { usePostWishlist } from '@/components/user/header/hooks/use-post-wishlist';
import { useDeleteWishlist } from '@/components/user/header/hooks/use-delete-wishlist';

const WishlistButton = ({ postId }: { postId: string }) => {
  const [liked, setLiked] = useState(false);

  const { data: wishlistData, isLoading } = useGetWishlist();
  const postMutation = usePostWishlist();
  const deleteMutation = useDeleteWishlist();

  // Kiểm tra xem bài đăng đã có trong wishlist chưa
  useEffect(() => {
    if (!isLoading && wishlistData) {
      const isLiked = wishlistData.some((item: any) => item.postId === postId);
      setLiked(isLiked);
    }
  }, [wishlistData, isLoading, postId]);

  const handleClick = () => {
    const newLiked = !liked;
    setLiked(newLiked);

    if (newLiked) {
      postMutation.mutate({ postId }); // Dùng mutation
    } else {
      deleteMutation.mutate(postId);   // Dùng mutation
    }
  };

  return (
    <Button onClick={handleClick} variant='ghost' className='p-0 hover:bg-transparent'>
      {liked ? (
        <div className=''>
          <FaHeart size={30} className=' text-red-500 transition-all !w-[22px] !h-[22px]' />
        </div>
        
      ) : (
        <div  className='text-[24px]'>
          <FaRegHeart size={50} className='transition-all !w-[22px] !h-[22px]' />

        </div>
      )}
    </Button>
  );
};

export default WishlistButton;
