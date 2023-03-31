import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlockListModule } from 'src/block-list/block-list.module';
import { UsersModule } from 'src/users/users.module';
import { ReportsController } from './reports.controller';
import { Report } from './reports.model';
import { ReportsService } from './reports.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [
    SequelizeModule.forFeature([Report]),
    UsersModule, 
    BlockListModule
  ]
})
export class ReportsModule {}
