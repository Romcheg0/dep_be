import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AdvertiserDto } from './advertiser.dto';
import { Advertiser } from './advertisers.model';

@Injectable()
export class AdvertisersService {
  constructor (
    @InjectModel(Advertiser) private advertiserRepository: typeof Advertiser
  ){}

  async create(advertiserDto: AdvertiserDto){
    try{
      if (!advertiserDto){
        throw new BadRequestException({message: "Bad data for advertiser"})
      }
      const advertiser = await this.advertiserRepository.create(advertiserDto)
      return advertiser
    }
    catch(e){
      throw e
    }
  }

  async findAll(){
    try {
      const advertisers = await this.advertiserRepository.findAll()
      return advertisers
    } catch (e) {
      throw e
    }
  }
  
  async findById(id){
    try {
      const advertiser = await this.advertiserRepository.findOne({where: {id}})
      return advertiser
    } catch (e) {
      throw e
    }
  }

  async updateById(id, advertiserDto: AdvertiserDto){
    try {
      await this.advertiserRepository.update(advertiserDto, {where: {id}})
      const advertiser = await this.findById(id)
      return advertiser
    } catch (e) {
      throw e
    }
  }

  async deleteById(id){
    try {
      await this.advertiserRepository.destroy({where: {id}})
      return true
    } catch (e) {
      throw new BadRequestException({message: "No advertiser with such id."})
    }
  }
}
