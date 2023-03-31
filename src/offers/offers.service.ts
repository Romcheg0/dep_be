import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OfferDto } from './offer.dto';
import { Offer } from './offers.model';

@Injectable()
export class OffersService {
  constructor (
    @InjectModel(Offer) private offerRepository: typeof Offer
  ){}

  async create(offerDto: OfferDto){
    try{
      if (!offerDto){
        throw new BadRequestException({message: "Bad data for offer"})
      }
      const offer = await this.offerRepository.create(offerDto)
      return offer
    }
    catch(e){
      throw e
    }
  }

  async findAll(){
    try {
      const offers = await this.offerRepository.findAll()
      return offers
    } catch (e) {
      throw e
    }
  }
  
  async findById(id){
    try {
      const offer = await this.offerRepository.findOne({where: {id}})
      return offer
    } catch (e) {
      throw e
    }
  }

  async updateById(id, offerDto: OfferDto){
    try {
      await this.offerRepository.update(offerDto, {where: {id}})
      const offer = await this.findById(id)
      return offer
    } catch (e) {
      throw e
    }
  }

  async deleteById(id){
    try {
      await this.offerRepository.destroy({where: {id}})
      return true
    } catch (e) {
      throw new BadRequestException({message: "No offers with such id."})
    }
  }
}
