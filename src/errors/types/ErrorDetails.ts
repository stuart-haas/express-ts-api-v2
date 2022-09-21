import Sequelize from 'sequelize';

export type ErrorDetails = ({ message: string } | Sequelize.ValidationErrorItem)[];
