import { RoleCompareGuard, UserGuard } from 'auth';
import {
  Controller, Get, Middleware, AuthRole, Request, Message, Patch, Delete, Validate, Auth, AbstractController, IApiController,
} from 'core';
import { AUTH_LOCAL } from 'core/constants';
import User from 'models/User';
import { injectable } from 'tsyringe';
import { UpdateRoleDto } from './UpdateRoleDto';
import { UserService } from './UserService';

@injectable()
@Controller('users')
export default class UserController extends AbstractController<User> implements Pick<IApiController, 'findAll' | 'deleteById'> {
  constructor(private userService: UserService) {
    super(User, { rejectOnEmpty: true });
  }

  @Get()
  @Auth(AUTH_LOCAL)
  @AuthRole(2)
  async findAll(req: Request) {
    return await this.userService.findAll(req);
  }

  @Patch(':id/activate')
  @Auth(AUTH_LOCAL)
  @AuthRole(2)
  @Middleware([UserGuard, RoleCompareGuard])
  @Message(() => 'User activated')
  async activateById(req: Request) {
    const { id } = req.params;
    return await this.userService.activateById(id);
  }

  @Patch(':id/deactivate')
  @Auth(AUTH_LOCAL)
  @AuthRole(2)
  @Middleware([UserGuard, RoleCompareGuard])
  @Message(() => 'User deactivated')
  async deactivateById(req: Request) {
    const { id } = req.params;
    return await this.userService.deactivateById(id);
  }

  @Patch(':id/role')
  @Auth(AUTH_LOCAL)
  @AuthRole(2)
  @Middleware([UserGuard, RoleCompareGuard])
  @Validate(UpdateRoleDto)
  @Message(() => 'User role updated')
  async updateRoleById(req: Request) {
    const { id } = req.params;
    const { body } = req;
    return await this.repository.updateById<UpdateRoleDto>(id, body);
  }

  @Delete(':id')
  @Auth(AUTH_LOCAL)
  @AuthRole(2)
  @Middleware([UserGuard, RoleCompareGuard])
  @Message(() => 'User deleted')
  async deleteById(req: Request) {
    const { id } = req.params;
    return await this.repository.deleteById(id);
  }
}
