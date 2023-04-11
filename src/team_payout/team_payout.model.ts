import { Model, DataType, Table, Column, ForeignKey, HasOne, HasMany, BelongsTo } from "sequelize-typescript";
import { Offer } from "src/offers/offers.model";
import { Team } from "src/teams/teams.model";

interface TeamPayoutCreationAttrs{
  offer_id: number
  team_id: number
  payout: number
}

@Table({tableName: "team_payout"})
export class TeamPayout extends Model<TeamPayout, TeamPayoutCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(()=>Offer)
  @Column({type: DataType.INTEGER})
  offer_id: number;

  @ForeignKey(()=>Team)
  @Column({type: DataType.INTEGER})
  team_id: number

  @Column({type: DataType.DECIMAL})
  payout: number

  @BelongsTo(()=>Offer)
  offer: Offer

  @BelongsTo(()=>Team)
  team: Team
}