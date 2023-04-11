import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/users/jwt-auth-guard';
import { TeamPayoutService } from './team_payout.service';
import { TeamPayoutDto } from './team_payout.dto';


@Controller('team_payout')
export class TeamPayoutController {
  constructor (private teamPayoutService: TeamPayoutService){}
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() teamPayoutDto: TeamPayoutDto){
    return this.teamPayoutService.create(teamPayoutDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_all')
  findAll(){
    return this.teamPayoutService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_by_id/:id')
  findById(@Param() param){
    return this.teamPayoutService.findById(param['id'])
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update_by_id/:id')
  updateById(@Param() param, @Body() teamPayoutDto: TeamPayoutDto){
    return this.teamPayoutService.updateById(param['id'], teamPayoutDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete_by_id/:id')
  deleteById(@Param() param){
    return this.teamPayoutService.deleteById(param['id'])
  }
}
