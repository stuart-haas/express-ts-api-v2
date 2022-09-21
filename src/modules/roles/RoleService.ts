import { Request } from 'core';
import Role from 'models/Role';
import { Op } from 'sequelize';

export class RoleService {
  async findAll(req: Request) {
    const { user } = req;
    return await Role.findAll({
      where: {
        id: { [Op.gte]: user.roleId },
      },
    });
  }
}
