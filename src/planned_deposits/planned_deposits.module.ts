import { Module } from '@nestjs/common';
import { PlannedDepositsController } from './planned_deposits.controller';
import { PlannedDepositsService } from './planned_deposits.service';
import { UsersModule } from 'src/users/users.module';
import { BlockListModule } from 'src/block-list/block-list.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlannedDeposit } from './planned_deposits.model';

@Module({
  controllers: [PlannedDepositsController],
  providers: [PlannedDepositsService],
  imports: [
    SequelizeModule.forFeature([PlannedDeposit]),
    UsersModule, 
    BlockListModule
  ]
})
export class PlannedDepositsModule {}
