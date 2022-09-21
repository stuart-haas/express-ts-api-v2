import { AbstractMiddleware, Request } from 'core';
import { ORDER, ORDER_DEFAULT } from 'core/constants';
import { NextFunction, Response } from 'express';
import { Order } from 'sequelize/types';

export class OrderMiddleware extends AbstractMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const orderContext = Reflect.getMetadata(ORDER, req.metaData.controller, req.metaData.route.action);

    const order = req.query.order ? req.query.order : orderContext || ORDER_DEFAULT;

    if (!order) return next();

    const orderArr = Object.values(order).map((e: string) => {
      if (e.indexOf('.') !== -1) {
        const parts = e.split(',');
        return [...parts[0].split('.'), parts[1]];
      }
      return e.split(',');
    });

    req.order = orderArr as Order;

    return next();
  }
}
