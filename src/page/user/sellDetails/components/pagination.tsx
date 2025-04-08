import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationPostProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export function PaginationPost({ page, totalPages, setPage }: PaginationPostProps) {
  const handlePageClick = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
    }
  };

  return (
    <div className='flex mx-auto justify-center mt-6'>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageClick(page - 1)}
              className={page === 1 ? 'pointer-events-none opacity-50 hidden lg:flex' : 'cursor-pointer hidden lg:flex'}
            >
              Trở về
            </PaginationPrevious>
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={page === index + 1}
                onClick={() => handlePageClick(index + 1)}
                className={`hidden lg:flex ${page === index + 1 ? 'bg-[#E03C31] text-white hover:bg-[#d1332a]' : ''}`}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageClick(page + 1)}
              className={
                page === totalPages ? 'pointer-events-none opacity-50 hidden lg:flex' : 'cursor-pointer hidden lg:flex'
              }
            >
              Tiếp theo
            </PaginationNext>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis className='hidden lg:flex' />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
