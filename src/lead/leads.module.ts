import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lead } from './leads.model';
import { BlockListModule } from 'src/block-list/block-list.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [LeadsController],
  providers: [LeadsService],
  imports: [SequelizeModule.forFeature([Lead]), BlockListModule, UsersModule]
})
export class LeadsModule {}
