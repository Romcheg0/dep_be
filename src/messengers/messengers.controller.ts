import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/users/jwt-auth-guard';
import { MessengerDto } from './messenger.dto';
import { MessengersService } from './messengers.service';

@Controller('messengers')
export class MessengersController {
  constructor (private messengersService: MessengersService){}
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() messengerDto: MessengerDto){
    return this.messengersService.create(messengerDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_all')
  findAll(){
    return this.messengersService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_by_id/:id')
  findById(@Param() param){
    return this.messengersService.findById(param['id'])
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update_by_id/:id')
  updateById(@Param() param, @Body() messengerDto: MessengerDto){
    return this.messengersService.updateById(param['id'], messengerDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete_by_id/:id')
  deleteById(@Param() param){
    return this.messengersService.deleteById(param['id'])
  }
}
