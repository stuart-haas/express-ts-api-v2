import { clientUrl, isDev } from 'config/app';
import { Request } from 'core';
import { WRAPPER } from '../constants';

export const wrap = <T>(data: T) => (WRAPPER ? { [WRAPPER]: data } : data);

export const baseUrl = (req: Request) => (isDev ? clientUrl : `${req.protocol}://${req.get('host')}`);
