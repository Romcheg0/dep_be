import { Module } from '@nestjs/common';
import { TeamPayoutController } from './team_payout.controller';
import { TeamPayoutService } from './team_payout.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TeamPayout } from './team_payout.model';
import { UsersModule } from 'src/users/users.module';
import { BlockListModule } from 'src/block-list/block-list.module';

@Module({
  controllers: [TeamPayoutController],
  providers: [TeamPayoutService],
  imports: [
    SequelizeModule.forFeature([TeamPayout]),
    UsersModule,
    BlockListModule
  ]
})
export class TeamPayoutModule {}
