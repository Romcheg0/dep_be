import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PlayerDto } from './player.dto';
import { Player } from './players.model';

@Injectable()
export class PlayersService {
  constructor (
    @InjectModel(Player) private playerRepository: typeof Player
  ){}

  async create(playerDto: PlayerDto){
    try{
      if (!playerDto){
        throw new BadRequestException({message: "Bad data for player"})
      }
      const player = await this.playerRepository.create(playerDto)
      return player
    }
    catch(e){
      const players = await this.playerRepository.findAll({where: {payment_data: playerDto['payment_data']}})
      if(players.length){
        throw new BadRequestException({message: 'Error! User with such payment data may potentially exist'})
      }
      else{
        throw e
      }
    }
  }

  async findAll(){
    try {
      const players = await this.playerRepository.findAll()
      return players
    } catch (e) {
      throw e
    }
  }
  
  async findById(id){
    try {
      const player = await this.playerRepository.findOne({where: {id}})
      return player
    } catch (e) {
      throw e
    }
  }

  async updateById(id, playerDto: PlayerDto){
    try {
      await this.playerRepository.update(playerDto, {where: {id}})
      const player = await this.findById(id)
      return player
    } catch (e) {
      throw e
    }
  }

  async deleteById(id){
    try {
      await this.playerRepository.destroy({where: {id}})
      return true
    } catch (e) {
      throw new BadRequestException({message: "No players with such id."})
    }
  }
}
