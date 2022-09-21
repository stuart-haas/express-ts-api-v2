import {
  Auth,
  Controller, Delete, Get, IController, Message, Post, Put, Request, Role, Validate,
} from 'core';
import { AUTH_LOCAL } from 'core/constants';
import { injectable } from 'tsyringe';
import { RoleService } from './RoleService';
import { defaultSchema } from './validation';

@injectable()
@Controller('roles')
@Auth(AUTH_LOCAL)
export default class RoleController implements IController {
  constructor(private roleService: RoleService) {}

  @Get()
  @Role(2)
  async findAll(req: Request) {
    return this.roleService.findAll(req);
  }

  @Post()
  @Role(1)
  @Validate(defaultSchema)
  @Message(() => 'Role created')
  async create(req: Request) {
    const { body } = req;
    return await this.roleService.create(body);
  }

  @Put(':id')
  @Role(1)
  @Validate(defaultSchema)
  @Message(() => 'Role updated')
  async updateById(req: Request) {
    const { id } = req.params;
    const { body } = req;
    return await this.roleService.updateById(+id, body);
  }

  @Delete(':id')
  @Role(1)
  @Message(() => 'Role deleted')
  async deleteById(req: Request) {
    const { id } = req.params;
    await this.roleService.deleteById(+id);
  }
}
