import { IController, Request } from 'core';

export interface IApiController<T = unknown, P = { rows: T[], count: number}> extends IController {
  findAllWithPagination(req: Request): Promise<P>
  findAll(req: Request): Promise<T[]>;
  findById(req: Request): Promise<T>;
  create(req: Request): Promise<T>;
  updateById(req: Request): Promise<T>;
  deleteById(req: Request): Promise<void>;
}
