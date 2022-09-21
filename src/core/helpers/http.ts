import { clientUrl, isDev } from 'config/app';
import { Request } from 'core';
import { WRAPPER } from '../constants';

export const wrap = (data: any) => (WRAPPER ? { [WRAPPER]: data } : data);

export const baseUrl = (req: Request) => (isDev ? clientUrl : `${req.protocol}://${req.get('host')}`);
