import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/users/jwt-auth-guard';
import { OfferDto } from './offer.dto';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor (private offersService: OffersService){}
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() offerDto: OfferDto){
    return this.offersService.create(offerDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_all')
  findAll(){
    return this.offersService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_by_id/:id')
  findById(@Param() param){
    return this.offersService.findById(param['id'])
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update_by_id/:id')
  updateById(@Param() param, @Body() offerDto: OfferDto){
    return this.offersService.updateById(param['id'], offerDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete_by_id/:id')
  deleteById(@Param() param){
    return this.offersService.deleteById(param['id'])
  }
}
