import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRatingPost } from '../hooks/use-rating-post';
import { LoadingSpinner } from '@/components/common';

interface StarRatingProps {
  postId: string;
  rating?: number;
  reviewCount?: number;
  className?: string;
  commentsSectionId?: string;
}

export function StarRating({
  postId,
  rating = 4.8,
  reviewCount = 124,
  className,
  commentsSectionId = 'comments',
}: StarRatingProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const { mutate, isPending,isSuccess } = useRatingPost(setIsModalOpen);

  const handleRatingClick = () => {
    const commentsSection = document.getElementById(commentsSectionId);
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsModalOpen(true);
  };

  const handleStarHover = (rating: number) => {
    setHoverRating(rating);
  };

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmitRating = () => {
    console.log('Submitted rating:', selectedRating);
    mutate({
      postId: postId,
      rating: selectedRating
    })


  };

  return (
    <>
      <div className={cn('flex items-center gap-1.5 cursor-pointer', className)} onClick={handleRatingClick}>
        <div className='flex items-center text-amber-400'>
          <Star className='fill-current h-4 w-4' />
        </div>
        <span className='font-medium text-sm'>{rating}</span>
        <span className='text-sm text-gray-500'>({reviewCount} đánh giá)</span>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='text-center'>Đánh giá của bạn</DialogTitle>
            <DialogDescription className='text-center'>Hãy cho chúng tôi biết trải nghiệm của bạn</DialogDescription>
          </DialogHeader>

          {isPending ? (
            <LoadingSpinner className='mx-auto my-[80px] ' />
          ) : (
            <div className='flex justify-center py-6'>
              <div className='flex gap-2'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className='relative cursor-pointer transition-all duration-150'
                    onMouseEnter={() => handleStarHover(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleStarClick(star)}
                  >
                    <Star
                      className={cn(
                        'h-10 w-10 transition-all duration-150',
                        hoverRating >= star || selectedRating >= star
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-300',
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <DialogFooter className='flex justify-center sm:justify-center gap-2 outline-none '>
            <Button variant='outline' onClick={() => setIsModalOpen(false)}>
              Hủy
            </Button>
            <Button
              onClick={handleSubmitRating}
              disabled={selectedRating === 0}
              className='bg-amber-500 hover:bg-amber-600'
            >
              Gửi đánh giá
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
