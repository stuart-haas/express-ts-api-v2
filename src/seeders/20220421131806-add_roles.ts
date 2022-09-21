import Role from 'models/Role';
import { roles } from 'static';
import { databaseClient } from 'dataSources/SqlDataSource';

databaseClient.addModels([Role]);

export async function up() {
  await Role.bulkCreate(roles);
}

export async function down() {
  await Role.destroy({ truncate: true, restartIdentity: true });
}
