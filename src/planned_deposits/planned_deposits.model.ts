import { Model, DataType, Table, Column, HasMany, ForeignKey, BelongsTo, HasOne } from "sequelize-typescript";
import { Player } from "src/players/players.model";
import { Report } from "src/reports/reports.model";

interface PlannedDepositCreationAttrs{
  player_id: number
  deposit_sum: number
  deposit_currency: string
  is_completed: boolean
  report_id: number
}

@Table({tableName: "planned_deposits"})
export class PlannedDeposit extends Model<PlannedDeposit, PlannedDepositCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  
  @ForeignKey(()=>Player)
  @Column({type: DataType.INTEGER, allowNull: false})
  player_id: number;

  @Column({type: DataType.DECIMAL})
  deposit_sum: number;

  @Column({type: DataType.STRING})
  deposit_currency: string;

  @Column({type: DataType.BOOLEAN})
  is_completed: boolean;

  @ForeignKey(()=>Report)
  @Column({type: DataType.INTEGER, allowNull: false})
  report_id: number;

  @BelongsTo(()=>Report)
  report: Report

  @BelongsTo(()=>Player)
  player: Player
}