import { Model, DataType, Table, Column, HasMany, ForeignKey, BelongsTo, HasOne } from "sequelize-typescript";
import { Lead } from "src/lead/leads.model";
import { Player } from "src/players/players.model";
import { Report } from "src/reports/reports.model";

interface PlannedDepositCreationAttrs{
  lead_id: number
  deposit_sum: number
  deposit_currency: string
  is_completed: boolean
  deposit_date: string
  report_id: number
}

@Table({tableName: "planned_deposits"})
export class PlannedDeposit extends Model<PlannedDeposit, PlannedDepositCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  
  @ForeignKey(()=>Lead)
  @Column({type: DataType.INTEGER, allowNull: false})
  lead_id: number;

  @Column({type: DataType.DECIMAL})
  deposit_sum: number;

  @Column({type: DataType.STRING})
  deposit_currency: string;

  @Column({type: DataType.BOOLEAN})
  is_completed: boolean;

  @Column({type: DataType.DATE})
  deposit_date: string

  @Column({type: DataType.INTEGER})
  report_id: number;

  @BelongsTo(()=>Lead)
  lead: Lead
}