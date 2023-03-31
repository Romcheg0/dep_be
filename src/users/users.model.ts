import { Model, DataType, Table, Column, ForeignKey, BelongsTo, BelongsToMany, HasMany } from "sequelize-typescript";
import { Player } from "src/players/players.model";
import { Report } from "src/reports/reports.model";
import { Team } from "src/teams/teams.model";

interface UserCreationAttrs{
  name: string
  password?: string
  type: string
  status: string
  team_id: number
  created_at: string
}

@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  
  @Column({type: DataType.STRING, allowNull: false})
  name: string;
  
  @Column({type: DataType.STRING, allowNull: false, unique: true})
  username: string;

  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @Column({type: DataType.STRING, allowNull: false})
  type: string;
  
  @Column({type: DataType.STRING, allowNull: false})
  status: string;

  @ForeignKey(()=>Team)
  @Column({type: DataType.INTEGER, allowNull: false})
  team_id: number;

  @BelongsTo(()=>Team)
  team: Team

  @HasMany(()=>Player)
  players: Player[]

  @HasMany(()=>Report)
  reports: Report[]
}