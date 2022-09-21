import {
  database, username, password, host, port, dialect, models, logging,
} from 'config/db';
import { Sequelize } from 'sequelize-typescript';

export const databaseClient = new Sequelize(
  database,
  username,
  password,
  {
    host,
    port,
    dialect,
    models,
    logging,
  },
);
