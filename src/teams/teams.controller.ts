import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/users/jwt-auth-guard';
import { TeamDto } from './team.dto';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor (private teamsService: TeamsService){}
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() teamDto: TeamDto){
    return this.teamsService.create(teamDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_all')
  findAll(){
    return this.teamsService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_by_id/:id')
  findById(@Param() param){
    return this.teamsService.findById(param['id'])
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update_by_id/:id')
  updateById(@Param() param, @Body() teamDto: TeamDto){
    return this.teamsService.updateById(param['id'], teamDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete_by_id/:id')
  deleteById(@Param() param){
    return this.teamsService.deleteById(param['id'])
  }
}
