import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/users/jwt-auth-guard';
import { LeadsService } from './leads.service';
import { LeadDto } from './lead.dto';

@Controller('leads')
export class LeadsController {
  constructor (private leadsService: LeadsService){}
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() leadDto: LeadDto){
    return this.leadsService.create(leadDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_all')
  findAll(){
    return this.leadsService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_by_id/:id')
  findById(@Param() param){
    return this.leadsService.findById(param['id'])
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update_by_id/:id')
  updateById(@Param() param, @Body() leadDto: LeadDto){
    return this.leadsService.updateById(param['id'], leadDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete_by_id/:id')
  deleteById(@Param() param){
    return this.leadsService.deleteById(param['id'])
  }
}
