import {
  Table, Model, Column, AllowNull, Unique, BelongsToMany, Default, ForeignKey, BelongsTo,
} from 'sequelize-typescript';
import Role from './Role';

@Table({
  underscored: true,
  timestamps: true,
})
export default class User extends Model {
  id: number;

  @AllowNull(false)
  @Unique(true)
  @Column
    email: string;

  @AllowNull(false)
  @Unique(true)
  @Column
    username: string;

  @ForeignKey(() => Role)
  @AllowNull(false)
  @Column
    roleId: number;

  @AllowNull(false)
  @Column
    password: string;

  @AllowNull(false)
  @Default(true)
  @Column
    active: boolean;

  @BelongsTo(() => Role)
    role: Role;
}
