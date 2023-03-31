import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MessengerDto } from './messenger.dto';
import { Messenger } from './messengers.model';

@Injectable()
export class MessengersService {
  constructor (
    @InjectModel(Messenger) private messengerRepository: typeof Messenger
  ){}

  async create(messengerDto: MessengerDto){
    try{
      if (!messengerDto){
        throw new BadRequestException({message: "Bad data for messenger"})
      }
      const messenger = await this.messengerRepository.create(messengerDto)
      return messenger
    }
    catch(e){
      throw e
    }
  }

  async findAll(){
    try {
      const messengers = await this.messengerRepository.findAll()
      return messengers
    } catch (e) {
      throw e
    }
  }
  
  async findById(id){
    try {
      const messenger = await this.messengerRepository.findOne({where: {id}})
      return messenger
    } catch (e) {
      throw e
    }
  }

  async updateById(id, messengerDto: MessengerDto){
    try {
      await this.messengerRepository.update(messengerDto, {where: {id}})
      const messenger = await this.findById(id)
      return messenger
    } catch (e) {
      throw e
    }
  }

  async deleteById(id){
    try {
      await this.messengerRepository.destroy({where: {id}})
      return true
    } catch (e) {
      throw new BadRequestException({message: "No messenger with such id."})
    }
  }
}
