import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TeamPayout } from './team_payout.model';
import { TeamPayoutDto } from './team_payout.dto';

@Injectable()
export class TeamPayoutService {
  constructor (
    @InjectModel(TeamPayout) private teamPayoutRepository: typeof TeamPayout
  ){}

  async create(teamPayoutDto: TeamPayoutDto){
    try{
      if (!teamPayoutDto){
        throw new BadRequestException({message: "Bad data for team payout"})
      }
      const team_payout = await this.teamPayoutRepository.create(teamPayoutDto)
      return team_payout
    }
    catch(e){
        throw e
    }
  }

  async findAll(){
    try {
      const team_payouts = await this.teamPayoutRepository.findAll()
      return team_payouts
    } catch (e) {
      throw e
    }
  }
  
  async findById(id){
    try {
      const team_payout = await this.teamPayoutRepository.findOne({where: {id}})
      return team_payout
    } catch (e) {
      throw e
    }
  }

  async updateById(id, teamPayoutDto: TeamPayoutDto){
    try {
      await this.teamPayoutRepository.update(teamPayoutDto, {where: {id}})
      const team_payout = await this.findById(id)
      return team_payout
    } catch (e) {
      throw e
    }
  }

  async deleteById(id){
    try {
      await this.teamPayoutRepository.destroy({where: {id}})
      return true
    } catch (e) {
      throw new BadRequestException({message: "No team payouts with such id."})
    }
  }
}
