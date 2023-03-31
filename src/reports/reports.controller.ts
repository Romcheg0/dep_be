import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/users/jwt-auth-guard';
import { ReportDto } from './report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor (private reportsService: ReportsService){}
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() reportDto: ReportDto){
    return this.reportsService.create(reportDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_all')
  findAll(){
    return this.reportsService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_by_id/:id')
  findById(@Param() param){
    return this.reportsService.findById(param['id'])
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update_by_id/:id')
  updateById(@Param() param, @Body() reportDto: ReportDto){
    return this.reportsService.updateById(param['id'], reportDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete_by_id/:id')
  deleteById(@Param() param){
    return this.reportsService.deleteById(param['id'])
  }
}
