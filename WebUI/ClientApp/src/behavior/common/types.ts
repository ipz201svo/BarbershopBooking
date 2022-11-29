export type PaginatedListQueryResult<T> = {
  items: T[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
};