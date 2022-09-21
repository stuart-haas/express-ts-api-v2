import { AbstractDto, Integer } from 'core';
import User from 'models/User';

export class UpdateRoleDto extends AbstractDto implements Pick<User, 'roleId'> {
  @Integer
  roleId: number;
}
