import {
  AbstractController,
  Auth,
  AuthRole,
  Controller, Delete, Get, IApiController, Message, Post, Put, Request, Validate,
} from 'core';
import { AUTH_LOCAL } from 'core/constants';
import Role from 'models/Role';
import { injectable } from 'tsyringe';
import { DefaultDto } from './DefaultDto';
import { RoleService } from './RoleService';

@injectable()
@Controller('roles')
@Auth(AUTH_LOCAL)
export default class RoleController extends AbstractController<Role, DefaultDto, DefaultDto> implements Omit<IApiController, 'findAllWithPagination' | 'findById'> {
  constructor(private roleService: RoleService) {
    super(Role, { rejectOnEmpty: true });
  }

  @Get()
  @AuthRole(2)
  async findAll(req: Request) {
    return this.roleService.findAll(req);
  }

  @Post()
  @AuthRole(1)
  @Validate(DefaultDto)
  @Message(() => 'Role created')
  async create(req: Request) {
    const { body } = req;
    return await this.repository.create(body);
  }

  @Put(':id')
  @AuthRole(1)
  @Validate(DefaultDto)
  @Message(() => 'Role updated')
  async updateById(req: Request) {
    const { id } = req.params;
    const { body } = req;
    return await this.repository.updateById(+id, body);
  }

  @Delete(':id')
  @AuthRole(1)
  @Message(() => 'Role deleted')
  async deleteById(req: Request) {
    const { id } = req.params;
    await this.repository.deleteById(+id);
  }
}
