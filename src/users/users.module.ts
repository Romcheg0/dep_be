import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlockListModule } from 'src/block-list/block-list.module';
import { Team } from 'src/teams/teams.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register(
      {
        signOptions: {
          expiresIn: '15h'
        }
      }
    ),
    BlockListModule
  ],
  exports: [JwtModule]
})
export class UsersModule {}
