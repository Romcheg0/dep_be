import { Model, DataType, Table, Column, ForeignKey, HasOne, HasMany, BelongsTo } from "sequelize-typescript";
import { Messenger } from "src/messengers/messengers.model";
import { User } from "src/users/users.model";

interface PlayerCreationAttrs{
  name: string
  worker_id: number
  messenger_id: number
  messenger_name: string
  payment_data: string
  payment_name: string
  status: string
}

@Table({tableName: "players"})
export class Player extends Model<Player, PlayerCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  
  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @ForeignKey(()=>User)
  @Column({type: DataType.INTEGER})
  worker_id: number;

  @ForeignKey(()=>Messenger)
  @Column({type: DataType.INTEGER})
  messenger_id: number;

  @Column({type: DataType.STRING})
  messenger_name: string;

  @Column({type: DataType.STRING, unique: true})
  payment_data: string;

  @Column({type: DataType.STRING})
  status: string

  @Column({type: DataType.STRING})
  payment_name: string;

  @Column({type: DataType.STRING})
  sub_id: string

  @Column({type: DataType.STRING})
  ip: string

  @BelongsTo(()=>User)
  worker: User

  @BelongsTo(()=>Messenger)
  messenger: Messenger
}