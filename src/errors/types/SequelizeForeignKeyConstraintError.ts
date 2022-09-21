import Sequelize from 'sequelize';

export type SequelizeForeignKeyConstraintError = Sequelize.ForeignKeyConstraintError & {
  original: Error & { detail: string };
}
