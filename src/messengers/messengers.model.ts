import { Model, DataType, Table, Column, HasMany } from "sequelize-typescript";
import { Player } from "src/players/players.model";

interface MessengerCreationAttrs{
  name: string
}

@Table({tableName: "messengers"})
export class Messenger extends Model<Messenger, MessengerCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  
  @Column({type: DataType.STRING, allowNull: false, unique: true})
  name: string;

  @HasMany(()=>Player)
  players: Player[]

}