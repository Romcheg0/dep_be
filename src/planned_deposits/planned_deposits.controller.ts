import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/users/jwt-auth-guard';
import { PlannedDepositsService } from './planned_deposits.service';
import { PlannedDepositDto } from './planned_deposit.dto';


@Controller('planned_deposits')
export class PlannedDepositsController {
  constructor (private plannedDepositsService: PlannedDepositsService){}
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() plannedDepositDto: PlannedDepositDto){
    return this.plannedDepositsService.create(plannedDepositDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_all')
  findAll(){
    return this.plannedDepositsService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_by_id/:id')
  findById(@Param() param){
    return this.plannedDepositsService.findById(param['id'])
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update_by_id/:id')
  updateById(@Param() param, @Body() plannedDepositDto: PlannedDepositDto){
    return this.plannedDepositsService.updateById(param['id'], plannedDepositDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete_by_id/:id')
  deleteById(@Param() param){
    return this.plannedDepositsService.deleteById(param['id'])
  }
}
