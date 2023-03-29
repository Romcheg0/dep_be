import { Model, DataType, Table, Column } from "sequelize-typescript";

@Table({tableName: "block_list"})
export class BlockList extends Model<BlockList>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({type: DataType.TEXT, allowNull: false, unique: true })
  token: string;
}