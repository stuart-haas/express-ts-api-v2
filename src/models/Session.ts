import {
  Table, Model, Column, DataType, PrimaryKey,
} from 'sequelize-typescript';

@Table({
  underscored: true,
  timestamps: true,
})
export default class Session extends Model {
  @PrimaryKey
  @Column
    sid: string;

  @Column
    userId: string;

  @Column
    expires: Date;

  @Column(DataType.TEXT)
    data: string;
}
