import { Op } from 'sequelize';
import User from 'models/User';
import { Request } from 'core';
import Role from 'models/Role';
import { injectable } from 'tsyringe';

@injectable()
export class UserService {
  async findAll(req: Request) {
    const { user } = req;
    return await User.findAll({
      where: { id: { [Op.ne]: user.id } },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Role,
          attributes: ['id', 'name'],
        },
      ],
    });
  }

  async findById(id: number) {
    return await User.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Role,
          attributes: ['id', 'name'],
        },
      ],
      rejectOnEmpty: true,
    });
  }

  async updateById(id: number, payload: any) {
    const data = await this.findById(id);
    await data.update(payload);
    return await this.findById(id);
  }

  async deleteById(id: number) {
    const user = await this.findById(id);
    await user.destroy();
  }

  async deactivateById(id: number) {
    const data = await this.findById(id);
    return await data.update({
      active: false,
    });
  }

  async activateById(id: number) {
    const data = await this.findById(id);
    return await data.update({
      active: true,
    });
  }

  async updateRoleById(id: number, payload: any) {
    const { roleId } = payload;
    const data = await this.findById(id);
    return await data.update({
      roleId,
    });
  }
}
