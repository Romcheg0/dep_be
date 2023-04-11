import { Model, DataType, Table, Column, ForeignKey, BelongsTo, HasOne } from "sequelize-typescript";
import { Lead } from "src/lead/leads.model";
import { PlannedDeposit } from "src/planned_deposits/planned_deposits.model";
import { User } from "src/users/users.model";

interface ReportCreationAttrs{
  type: string
  dep_sum: number
  balance: number
  worker_id: number
  lead_id: number
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

  @Column({type: DataType.BOOLEAN})
  is_fd: boolean

  @ForeignKey(()=>Lead)
  @Column({type: DataType.INTEGER})
  lead_id: number
  
  @ForeignKey(()=>User)
  @Column({type: DataType.INTEGER})
  worker_id: number

  @Column({type: DataType.STRING, allowNull: false})
  currency: string;

  @Column({type: DataType.BOOLEAN, allowNull: false})
  is_verified: boolean;

  @BelongsTo(()=>User)
  worker: User
  
  @BelongsTo(()=>Lead)
  lead: Lead
}