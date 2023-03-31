import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlockListModule } from 'src/block-list/block-list.module';
import { UsersModule } from 'src/users/users.module';
import { MessengersController } from './messengers.controller';
import { Messenger } from './messengers.model';
import { MessengersService } from './messengers.service';

@Module({
  controllers: [MessengersController],
  providers: [MessengersService],
  imports: [
    SequelizeModule.forFeature([Messenger]), 
    UsersModule, 
    BlockListModule
  ]
})
export class MessengersModule {}
