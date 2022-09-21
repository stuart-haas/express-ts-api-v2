import Sequelize, { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface, sequelize: typeof Sequelize) {
  await queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: sequelize.INTEGER,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    role_id: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
    active: {
      type: sequelize.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      allowNull: false,
      type: sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: sequelize.DATE,
    },
  });
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('users');
}
