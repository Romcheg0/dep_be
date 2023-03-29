import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TeamsController } from './teams.controller';
import { Team } from './teams.model';
import { TeamsService } from './teams.service';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService],
  imports: [
    SequelizeModule.forFeature([Team]),
  ]
})
export class TeamsModule {}
