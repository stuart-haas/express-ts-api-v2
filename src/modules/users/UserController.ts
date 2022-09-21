import { RoleCompareGuard, UserGuard } from 'auth';
import {
  Controller, Get, Middleware, IController, Role, Request, Post, Status, HttpStatus, Put, Message, Patch, Delete, Validate, Auth,
} from 'core';
import { AUTH_LOCAL } from 'core/constants';
import { injectable } from 'tsyringe';
import { UserService } from './UserService';
import { updateCompaniesSchema, updateOwnSchema, updateRoleSchema } from './validation';

@injectable()
@Controller('users')
export default class UserController implements IController {
  constructor(private userService: UserService) {}

  @Get()
  @Auth(AUTH_LOCAL)
  @Role(2)
  async findAll(req: Request) {
    return await this.userService.findAll(req);
  }

  @Patch(':id/activate')
  @Auth(AUTH_LOCAL)
  @Role(2)
  @Middleware([UserGuard, RoleCompareGuard])
  @Message(() => 'User activated')
  async activateById(req: Request) {
    const { id } = req.params;
    return await this.userService.activateById(+id);
  }

  @Patch(':id/deactivate')
  @Auth(AUTH_LOCAL)
  @Role(2)
  @Middleware([UserGuard, RoleCompareGuard])
  @Message(() => 'User deactivated')
  async deactivateById(req: Request) {
    const { id } = req.params;
    return await this.userService.deactivateById(+id);
  }

  @Patch(':id/role')
  @Auth(AUTH_LOCAL)
  @Role(2)
  @Middleware([UserGuard, RoleCompareGuard])
  @Validate(updateRoleSchema)
  @Message(() => 'User role updated')
  async updateRoleById(req: Request) {
    const { id } = req.params;
    const { body } = req;
    return await this.userService.updateRoleById(+id, body);
  }

  @Delete(':id')
  @Auth(AUTH_LOCAL)
  @Role(2)
  @Middleware([UserGuard, RoleCompareGuard])
  @Message(() => 'User deleted')
  async deleteById(req: Request) {
    const { id } = req.params;
    return await this.userService.deleteById(+id);
  }
}
