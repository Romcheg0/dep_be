import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlockListModule } from 'src/block-list/block-list.module';
import { UsersModule } from 'src/users/users.module';
import { TeamsController } from './teams.controller';
import { Team } from './teams.model';
import { TeamsService } from './teams.service';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService],
  imports: [
    SequelizeModule.forFeature([Team]),
    forwardRef(()=>UsersModule),
    BlockListModule
  ],
  exports: [TeamsService]
})
export class TeamsModule {}
