import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { BlockList } from './block-list.model';
import { BlockListService } from './block-list.service';

@Module({
  providers: [BlockListService],
  imports:[
    SequelizeModule.forFeature([BlockList]),
    forwardRef(()=>UsersModule),
  ],
  exports: [BlockListService]
})
export class BlockListModule {}
