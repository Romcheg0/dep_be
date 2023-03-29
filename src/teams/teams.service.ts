import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TeamDto } from './team.dto';
import { Team } from './teams.model';

@Injectable()
export class TeamsService {
  constructor (
    @InjectModel(Team) private teamRepository: typeof Team
  ){}

  async create(teamDto: TeamDto){
    try{
      if (!teamDto){
        throw new BadRequestException({message: "Bad data for team"})
      }
      const team = await this.teamRepository.create(teamDto)
      return team
    }
    catch(e){
      throw e
    }
  }

  async findAll(){
    try {
      const teams = await this.teamRepository.findAll()
      return teams
    } catch (e) {
      throw e
    }
  }
  
  async findById(id){
    try {
      const team = await this.teamRepository.findOne({where: {id}})
      return team
    } catch (e) {
      throw e
    }
  }

  async updateById(id, teamDto: TeamDto){
    try {
      await this.teamRepository.update(teamDto, {where: {id}})
      const team = await this.findById(id)
      return team
    } catch (e) {
      throw e
    }
  }

  async deleteById(id){
    try {
      await this.teamRepository.destroy({where: {id}})
      return true
    } catch (e) {
      throw new BadRequestException({message: "Error! Remove all of the users from this group first."})
    }
  }
}
