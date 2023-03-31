import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/users/jwt-auth-guard';
import { AdvertiserDto } from './advertiser.dto';
import { AdvertisersService } from './advertisers.service';

@Controller('advertisers')
export class AdvertisersController {
  constructor (private advertisersService: AdvertisersService){}
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() advertiserDto: AdvertiserDto){
    return this.advertisersService.create(advertiserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_all')
  findAll(){
    return this.advertisersService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_by_id/:id')
  findById(@Param() param){
    return this.advertisersService.findById(param['id'])
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update_by_id/:id')
  updateById(@Param() param, @Body() advertiserDto: AdvertiserDto){
    return this.advertisersService.updateById(param['id'], advertiserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete_by_id/:id')
  deleteById(@Param() param){
    return this.advertisersService.deleteById(param['id'])
  }
}
