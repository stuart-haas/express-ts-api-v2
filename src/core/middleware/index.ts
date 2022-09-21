import {
  Request, IRoute, IController,
} from 'core';
import { API_BASE_PATH, HEADER_INSTANCE, HEADER_REQUEST_ID } from 'core/constants';
import { Response, NextFunction } from 'express';
import { InjectionToken } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

export const metaDataMiddleware = (controller: InjectionToken<IController>, route: IRoute) => (req: Request, res: Response, next: NextFunction) => {
  req.metaData = { controller, route };
  return next();
};

export const headerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const id = uuidv4();
  res.set(HEADER_REQUEST_ID, id);
  res.set(HEADER_INSTANCE, req.path.split(`/${API_BASE_PATH}`)[1]);
  req.id = id;
  next();
};
