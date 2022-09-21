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

  async findById(id: number) {
    return await Role.findByPk(id, { rejectOnEmpty: true });
  }

  async create(payload: any) {
    return await Role.create(payload);
  }

  async updateById(id: number, payload: any) {
    const data = await this.findById(id);
    return await data.update(payload);
  }

  async deleteById(id: number) {
    const data = await this.findById(id);
    await data.destroy();
  }
}
