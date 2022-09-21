import { AbstractMiddleware, Request } from 'core';
import { Response, NextFunction } from 'express';
import { Op } from 'sequelize';

export class FilterMiddleware extends AbstractMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const operators = {
      or: Op.or,
      and: Op.and,
    };

    const { filter } = req.query;

    if (!filter) return next();

    const { op, ...filters } = filter;

    const filterKeys = Object.keys(filters);

    const operator = operators[op] || operators.and;

    const filterObj = {};

    filterObj[operator] = filterKeys.map((e: string) => {
      if (e.indexOf('.') !== -1) {
        return { [`$${e}$`]: { [Op.eq]: filters[e] } };
      }
      if (filters[e].indexOf(',') !== -1) {
        return { [e]: { [Op.in]: filters[e].split(',') } };
      }
      return { [e]: filters[e] };
    });

    req.where = filterObj;

    if (req.where) {
      req.where = { ...req.where, ...filterObj };
    } else {
      req.where = filterObj;
    }

    return next();
  }
}
