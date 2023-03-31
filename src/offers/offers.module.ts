import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlockListModule } from 'src/block-list/block-list.module';
import { UsersModule } from 'src/users/users.module';
import { OffersController } from './offers.controller';
import { Offer } from './offers.model';
import { OffersService } from './offers.service';

@Module({
  controllers: [OffersController],
  providers: [OffersService],
  imports: [
    SequelizeModule.forFeature([Offer]),
    UsersModule, 
    BlockListModule
  ]
})
export class OffersModule {}
