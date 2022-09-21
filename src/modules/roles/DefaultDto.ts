import { AbstractDto, Required } from 'core';
import Role from 'models/Role';

export class DefaultDto extends AbstractDto implements Pick<Role, 'name'> {
  @Required
  name: string;
}
