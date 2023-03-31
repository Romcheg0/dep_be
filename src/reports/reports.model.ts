import { Model, DataType, Table, Column, ForeignKey, BelongsTo, HasOne } from "sequelize-typescript";
import { Offer } from "src/offers/offers.model";
import { PlannedDeposit } from "src/planned_deposits/planned_deposits.model";
import { Player } from "src/players/players.model";
import { User } from "src/users/users.model";

interface ReportCreationAttrs{
  type: string
  dep_sum: number
  balance: number
  offer_id: number
  worker_id: number
  player_id: number
  currency: string
  is_verified: boolean
}

@Table({tableName: "reports"})
export class Report extends Model<Report, ReportCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  
  @Column({type: DataType.STRING})
  type: string;
  
  @Column({type: DataType.DECIMAL})
  dep_sum: number
  
  @Column({type: DataType.DECIMAL})
  balance: number

  @ForeignKey(()=>Offer)
  @Column({type: DataType.INTEGER})
  offer_id: number
  
  @ForeignKey(()=>User)
  @Column({type: DataType.INTEGER})
  worker_id: number

  @ForeignKey(()=>Player)
  @Column({type: DataType.INTEGER})
  player_id: number

  @Column({type: DataType.STRING, allowNull: false})
  currency: string;

  @Column({type: DataType.BOOLEAN, allowNull: false})
  is_verified: boolean;

  @BelongsTo(()=>Offer)
  offer: Offer
  
  @BelongsTo(()=>User)
  worker: User
  
  @BelongsTo(()=>Player)
  player: Player

  @HasOne(()=>PlannedDeposit)
  deposit: PlannedDeposit
}