import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReportDto } from './report.dto';
import { Report } from './reports.model';

@Injectable()
export class ReportsService {
  constructor (
    @InjectModel(Report) private reportRepository: typeof Report
  ){}

  async create(reportDto: ReportDto){
    try{
      if (!reportDto){
        throw new BadRequestException({message: "Bad data for report"})
      }
      const report = await this.reportRepository.create(reportDto)
      return report
    }
    catch(e){
      throw e
    }
  }

  async findAll(){
    try {
      const reports = await this.reportRepository.findAll()
      return reports
    } catch (e) {
      throw e
    }
  }
  
  async findById(id){
    try {
      const report = await this.reportRepository.findOne({where: {id}})
      return report
    } catch (e) {
      throw e
    }
  }

  async updateById(id, reportDto: ReportDto){
    try {
      await this.reportRepository.update(reportDto, {where: {id}})
      const report = await this.findById(id)
      return report
    } catch (e) {
      throw e
    }
  }

  async deleteById(id){
    try {
      await this.reportRepository.destroy({where: {id}})
      return true
    } catch (e) {
      throw new BadRequestException({message: "No offers with such id."})
    }
  }
}
