import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize';
import { Team } from './teams/teams.model';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { BlockListModule } from './block-list/block-list.module';

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
      models: [User, Team],
      autoLoadModels: true
    }),
    UsersModule,
    TeamsModule,
    BlockListModule,
  ]
})
export class AppModule {}
