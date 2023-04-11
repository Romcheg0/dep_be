import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lead } from './leads.model';
import { LeadDto } from './lead.dto';

@Injectable()
export class LeadsService {
  constructor (
    @InjectModel(Lead) private leadRepository: typeof Lead
  ){}

  async create(leadDto: LeadDto){
    try{
      if (!leadDto){
        throw new BadRequestException({message: "Bad data for lead"})
      }
      const lead = await this.leadRepository.create(leadDto)
      return lead
    }
    catch(e){
      throw e
    }
  }

  async findAll(){
    try {
      const leads = await this.leadRepository.findAll()
      return leads
    } catch (e) {
      throw e
    }
  }
  
  async findById(id){
    try {
      const lead = await this.leadRepository.findOne({where: {id}})
      return lead
    } catch (e) {
      throw e
    }
  }

  async updateById(id, leadDto: LeadDto){
    try {
      await this.leadRepository.update(leadDto, {where: {id}})
      const lead = await this.findById(id)
      return lead
    } catch (e) {
      throw e
    }
  }

  async deleteById(id){
    try {
      await this.leadRepository.destroy({where: {id}})
      return true
    } catch (e) {
      throw new BadRequestException({message: "No leads with such id."})
    }
  }
}
