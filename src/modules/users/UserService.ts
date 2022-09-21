import { Op } from 'sequelize';
import User from 'models/User';
import { Request } from 'core';
import Role from 'models/Role';

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

  async findById(id: number | string) {
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

  async deactivateById(id: number | string) {
    const data = await this.findById(id);
    return await data.update({
      active: false,
    });
  }

  async activateById(id: number | string) {
    const data = await this.findById(id);
    return await data.update({
      active: true,
    });
  }
}
