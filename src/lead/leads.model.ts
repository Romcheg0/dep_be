import { Model, DataType, Table, Column, ForeignKey, BelongsTo, HasOne } from "sequelize-typescript";
import { Offer } from "src/offers/offers.model";
import { PlannedDeposit } from "src/planned_deposits/planned_deposits.model";
import { Player } from "src/players/players.model";
import { Report } from "src/reports/reports.model";


interface LeadCreationAttrs{
  player_id: number
  offer_id: number
  status: string
}

@Table({tableName: "leads"})
export class Lead extends Model<Lead, LeadCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  
  @ForeignKey(()=>Player)
  @Column({type: DataType.INTEGER, allowNull: false})
  player_id: number;

  @ForeignKey(()=>Offer)
  @Column({type: DataType.INTEGER, allowNull: false})
  offer_id: number

  @Column({type: DataType.STRING})
  status: string;

  @BelongsTo(()=>Player)
  player: Player
  
  @BelongsTo(()=>Offer)
  offer: Offer

  @HasOne(()=>PlannedDeposit)
  deposit: PlannedDeposit

  @HasOne(()=>Report)
  report: Report
}