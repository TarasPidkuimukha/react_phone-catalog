interface PaginationProps {
  total: number;
  perPage: number;
  currentOnPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = {
  (total,
  perPage,
  currentOnPage = 6,
  onPageChange,)
} => {
  const itemsPerPage = [];

  return(

  )
}
