import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlockListModule } from 'src/block-list/block-list.module';
import { UsersModule } from 'src/users/users.module';
import { AdvertisersController } from './advertisers.controller';
import { Advertiser } from './advertisers.model';
import { AdvertisersService } from './advertisers.service';

@Module({
  controllers: [AdvertisersController],
  providers: [AdvertisersService],
  imports: [
    SequelizeModule.forFeature([Advertiser]),
    UsersModule, 
    BlockListModule
  ]
})
export class AdvertisersModule {}
