import {
  Table, Model, Column, AllowNull, Unique,
} from 'sequelize-typescript';

@Table({
  underscored: true,
  timestamps: true,
})
export default class Role extends Model {
  id: number;

  @AllowNull(false)
  @Unique(true)
  @Column
    name: string;
}
