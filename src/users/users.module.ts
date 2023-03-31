import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlockListModule } from 'src/block-list/block-list.module';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';
import { TeamsModule } from 'src/teams/teams.module';

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
    BlockListModule,
    TeamsModule
  ],
  exports: [JwtModule]
})
export class UsersModule {}
