import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/users/jwt-auth-guard';
import { PlayerDto } from './player.dto';
import { PlayersService } from './players.service';


@Controller('players')
export class PlayersController {
  constructor (private playersService: PlayersService){}
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() playerDto: PlayerDto){
    return this.playersService.create(playerDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_all')
  findAll(){
    return this.playersService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_by_id/:id')
  findById(@Param() param){
    return this.playersService.findById(param['id'])
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update_by_id/:id')
  updateById(@Param() param, @Body() playerDto: PlayerDto){
    return this.playersService.updateById(param['id'], playerDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete_by_id/:id')
  deleteById(@Param() param){
    return this.playersService.deleteById(param['id'])
  }
}
