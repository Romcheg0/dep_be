import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize';
import { Team } from './teams/teams.model';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { BlockListModule } from './block-list/block-list.module';
import { MessengersModule } from './messengers/messengers.module';
import { PlayersModule } from './players/players.module';
import { Messenger } from './messengers/messengers.model';
import { Player } from './players/players.model';
import { AdvertisersModule } from './advertisers/advertisers.module';
import { OffersModule } from './offers/offers.module';
import { ReportsModule } from './reports/reports.module';
import { Advertiser } from './advertisers/advertisers.model';
import { Offer } from './offers/offers.model';
import { Report } from './reports/reports.model';
import { PlannedDepositsModule } from './planned_deposits/planned_deposits.module';
import { PlannedDeposit } from './planned_deposits/planned_deposits.model';
import { LeadsModule } from './lead/leads.module';
import { Lead } from './lead/leads.model';
import { TeamPayoutModule } from './team_payout/team_payout.module';
import { TeamPayout } from './team_payout/team_payout.model';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env'}),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [User, Team, Messenger, Player, Advertiser, Offer, Report, PlannedDeposit, Lead, TeamPayout],
      autoLoadModels: true
    }),
    UsersModule,
    TeamsModule,
    BlockListModule,
    MessengersModule,
    PlayersModule,
    AdvertisersModule,
    OffersModule,
    ReportsModule,
    PlannedDepositsModule,
    LeadsModule,
    TeamPayoutModule
  ]
})
export class AppModule {}
