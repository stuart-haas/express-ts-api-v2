import { RequestQuery } from 'core';
import { PaginationLinks } from '.';

export type PaginationData = {
  total: number;
  rows: number;
  limit: number;
  pages: number;
  currentPage: number;
  firstPage: number;
  prevPage: number;
  nextPage: number;
  lastPage: number;
  from: number;
  to: number;
  query: RequestQuery;
  links: PaginationLinks;
}
