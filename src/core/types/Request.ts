import type { Request as ExpressRequest } from 'express';
import { Order, ScopeOptions, WhereOptions } from 'sequelize/types';
import {
  RequestMetaData, RequestUser, RequestQuery, RequestPagination,
} from '..';

export type Request = ExpressRequest & {
  id: string;
  user: RequestUser;
  session: any;
  authScopes: string;
  where: WhereOptions;
  query: RequestQuery;
  scopes?: (string | ScopeOptions)[];
  order: Order;
  pagination: RequestPagination;
  metaData: RequestMetaData;
  isAuthenticated(): boolean;
  logout(): void;
};
