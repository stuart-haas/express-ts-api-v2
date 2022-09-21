import Sequelize, { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface, sequelize: typeof Sequelize) {
  await queryInterface.createTable('sessions', {
    sid: {
      type: sequelize.STRING,
      primaryKey: true,
    },
    userId: sequelize.STRING,
    expires: sequelize.DATE,
    data: sequelize.TEXT,
    createdAt: {
      allowNull: false,
      type: sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: sequelize.DATE,
    },
  });
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('sessions');
}
