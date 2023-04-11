import { Model, DataType, Table, Column, HasMany } from "sequelize-typescript";
import { TeamPayout } from "src/team_payout/team_payout.model";
import { User } from "src/users/users.model";

interface TeamCreationAttrs{
  name: string
  teamlead_id: number
  created_at: string
}

@Table({tableName: "teams"})
export class Team extends Model<Team, TeamCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  
  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @HasMany(()=>User)
  users: User[]

  @HasMany(()=>TeamPayout)
  team_payouts: TeamPayout[]
}