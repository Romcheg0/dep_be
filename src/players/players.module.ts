import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlockListModule } from 'src/block-list/block-list.module';
import { UsersModule } from 'src/users/users.module';
import { PlayersController } from './players.controller';
import { Player } from './players.model';
import { PlayersService } from './players.service';

@Module({
  controllers: [PlayersController],
  providers: [PlayersService],
  imports: [
    SequelizeModule.forFeature([Player]), 
    UsersModule, 
    BlockListModule
  ]
})
export class PlayersModule {}
