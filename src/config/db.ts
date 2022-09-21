import dotenv from 'dotenv';
import path from 'path';
import { Dialect } from 'sequelize';
import { isProd } from './app';

dotenv.config();

export const database = process.env.DB_DATABASE;
export const username = process.env.DB_USERNAME;
export const password = process.env.DB_PASSWORD;
export const host = process.env.DB_HOST;
export const port = parseInt(process.env.DB_PORT, 10);
export const dialect = process.env.DB_DIALECT as Dialect;
export const logging = process.env.DB_LOGGING === 'true';
export const models = [path.resolve(__dirname, '../models')];
export const migrationStorageTableName = 'sequelize_meta';
export const seederStorage = 'sequelize';
export const seederStorageTableName = 'sequelize_data';
export const dialectOptions = isProd ? {
  ssl: {
    require: false,
    rejectUnauthorized: false,
  },
} : {};
