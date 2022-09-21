import qs from 'qs';
import { Request, AbstractTransformer } from 'core';
import { wrap } from 'core/helpers';
import { API_BASE_PATH } from 'core/constants';
import { PaginationContext, PaginationData, PaginationLinks } from './types';

export class Pagination<T> extends AbstractTransformer<PaginationContext<T>> {
  beforeHandle(req: Request) {
    const page = 1;
    const limit = 10;
    const queryPage = req.query.page ? +req.query.page : page;
    const queryLimit = req.query.limit ? +req.query.limit : limit;

    req.pagination = {
      page: queryPage,
      limit: queryLimit,
      offset: (queryPage - 1) * queryLimit,
    };
  }

  handle(context: PaginationContext<T>, req: Request) {
    const getUrl = (base: string, params: URLSearchParams) => `${base}?${decodeURIComponent(params.toString())}`;

    const { count: total, rows: data } = context;
    const rows = data.length;
    const { page, limit } = req.pagination;
    const { originalUrl, query } = req;

    const base = originalUrl.split('?')[0].split(`/${API_BASE_PATH}`)[1];
    const pages = Math.ceil(total / limit);
    const currentPage = pages > 0 ? +page : 0;
    const firstPage = 1;
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    const nextPage = currentPage < pages ? currentPage + 1 : pages;
    const lastPage = pages;
    const from = currentPage > 1 ? limit * prevPage + 1 : currentPage;
    const to = pages > 0 ? from + rows - 1 : 0;

    const queryString = qs.stringify(query, { arrayFormat: 'brackets' });
    const params = new URLSearchParams(queryString);
    const search = decodeURIComponent(params.toString());

    const first = new URLSearchParams(queryString);
    first.set('page', '1');

    const prev = new URLSearchParams(queryString);
    prev.set('page', prevPage.toString());

    const next = new URLSearchParams(queryString);
    next.set('page', nextPage.toString());

    const last = new URLSearchParams(queryString);
    last.set('page', pages.toString());

    const links: PaginationLinks = {
      base,
      first: getUrl(base, first),
      prev: getUrl(base, prev),
      next: getUrl(base, next),
      last: getUrl(base, last),
      search,
    };

    const pagination: PaginationData = {
      total,
      rows,
      limit,
      pages,
      currentPage,
      firstPage,
      prevPage,
      nextPage,
      lastPage,
      from,
      to,
      query,
      links,
    };

    return {
      ...wrap(data),
      pagination,
    };
  }
}
