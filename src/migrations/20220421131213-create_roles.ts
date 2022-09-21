import Sequelize, { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface, sequelize: typeof Sequelize) {
  await queryInterface.createTable('roles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: sequelize.INTEGER,
    },
    name: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
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
  await queryInterface.dropTable('roles');
}
