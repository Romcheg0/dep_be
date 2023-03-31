import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PlannedDeposit } from './planned_deposits.model';
import { PlannedDepositDto } from './planned_deposit.dto';

@Injectable()
export class PlannedDepositsService {
  constructor (
    @InjectModel(PlannedDeposit) private plannedDepositRepository: typeof PlannedDeposit
  ){}

  async create(plannedDepositDto: PlannedDepositDto){
    try{
      if (!plannedDepositDto){
        throw new BadRequestException({message: "Bad data for deposit"})
      }
      const offer = await this.plannedDepositRepository.create(plannedDepositDto)
      return offer
    }
    catch(e){
      throw e
    }
  }

  async findAll(){
    try {
      const plannedDeposits = await this.plannedDepositRepository.findAll()
      return plannedDeposits
    } catch (e) {
      throw e
    }
  }
  
  async findById(id){
    try {
      const plannedDeposit = await this.plannedDepositRepository.findOne({where: {id}})
      return plannedDeposit
    } catch (e) {
      throw e
    }
  }

  async updateById(id, plannedDepositDto: PlannedDepositDto){
    try {
      await this.plannedDepositRepository.update(plannedDepositDto, {where: {id}})
      const plannedDeposit = await this.findById(id)
      return plannedDeposit
    } catch (e) {
      throw e
    }
  }

  async deleteById(id){
    try {
      await this.plannedDepositRepository.destroy({where: {id}})
      return true
    } catch (e) {
      throw new BadRequestException({message: "No deposits with such id."})
    }
  }
}
