import { Model, DataType, Table, Column, HasMany } from "sequelize-typescript";
import { Offer } from "src/offers/offers.model";

interface AdvertiserCreationAttrs{
  name: string
}

@Table({tableName: "advertisers"})
export class Advertiser extends Model<Advertiser, AdvertiserCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  
  @Column({type: DataType.STRING, allowNull: false, unique: true})
  name: string;

  @HasMany(()=>Offer)
  offers: Offer[]
}