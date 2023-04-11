import { Model, DataType, Table, Column, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Advertiser } from "src/advertisers/advertisers.model";
import { TeamPayout } from "src/team_payout/team_payout.model";

interface OfferCreationAttrs{
  name: string
  advertiser_id: number
  adv_payout: number
  tl_payout: number
  geo: string
  payout_currency: string
  payback_date: string
}

@Table({tableName: "offers"})
export class Offer extends Model<Offer, OfferCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  
  @Column({type: DataType.STRING, allowNull: false})
  name: string;
  
  @ForeignKey(()=>Advertiser)
  @Column({type: DataType.INTEGER})
  advertiser_id: number

  @Column({type: DataType.DECIMAL, allowNull: false})
  adv_payout: number;
  
  @Column({type: DataType.DECIMAL, allowNull: false})
  tl_payout: number;
  
  @Column({type: DataType.STRING})
  geo: string


  @Column({type: DataType.STRING, allowNull: false})
  payout_currency: string;

  @Column({type: DataType.DATE, allowNull: false})
  payback_date: string;

  @BelongsTo(()=>Advertiser)
  advertiser: Advertiser

  @HasMany(()=>TeamPayout)
  teams_payout: TeamPayout[]
}