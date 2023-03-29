import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from './user.dto';
import { User } from './users.model';
import * as bcrypt from "bcryptjs"
import { LoginDto } from './login.dto';
import { BlockListService } from 'src/block-list/block-list.service';

@Injectable()
export class UsersService {
  constructor (
    @InjectModel(User) private userRepository: typeof User,
    private jwtService: JwtService,
    private blockListService: BlockListService
  ){}

  async register(userDto: UserDto){
    try{
      if (!userDto){
        throw new BadRequestException({message: "Bad data for user"})
      }
      const hashPassword = await bcrypt.hash(userDto.password, 5)
      const user = await this.userRepository.create({...userDto, password: hashPassword})
      return user
    }
    catch(e){
      throw e
    }
  }
  
  async login(loginDto: LoginDto){
    try{
      console.log(loginDto);
      const user = await this.validateLogin(loginDto)
      if(user){
        return this.generateTokens(loginDto.username)
      }
    }
    catch(e){
      throw e
    }
  }

  async logout(token: string){
    try{
      const blockedToken = await this.blockListService.create(token)
      return blockedToken
    }
    catch(e){
      throw new BadRequestException({message: "Bad token"})
    }
  }

  async refresh(authToken: string, refreshToken: string){
    try{
      const data = this.jwtService.decode(refreshToken)
      const payload = {
        id: data["id"], 
        name: data["name"], 
        username: data["username"], 
        type: data["type"], 
        status: data["status"], 
        team_id: data["team_id"]
      }
      await this.logout(authToken.split(' ')[1])
      return {
        accessToken: this.jwtService.sign(payload, {secret: process.env.ACCESS_PRIVATE_KEY, expiresIn: "15h"}),
        refreshToken: this.jwtService.sign(payload, {secret: process.env.REFRESH_PRIVATE_KEY, expiresIn: "15d"})
      }
    }
    catch(e){
      throw new UnauthorizedException({message: 'Bad data, log in once again'})
    }
  }

  private async findByUsername(username){
    try {
      const user = await this.userRepository.findOne({where: {username: username}})
      return user
    } catch (e) {
      throw e
    }
  }

  private async validateLogin(loginDto: LoginDto){
    const user = await this.findByUsername(loginDto.username)
    if(!user){
      throw new UnauthorizedException({message: 'Incorrect username'})
    }
    else{
      const isNameEquals = loginDto.name === user.name
      const isPasswordEquals = await bcrypt.compare(loginDto.password, user.password)
      if(isNameEquals && isPasswordEquals){
        return true
      }
    }
    throw new UnauthorizedException({message: 'Incorrect data for user'})
  }

  private async generateTokens(username){
    const user = await this.findByUsername(username)
    const payload = {id: user.id, name: user.name, username: user.username, type: user.type, status: user.status, team_id: user.team_id}
    return {
      accessToken: this.jwtService.sign(payload, {secret: process.env.ACCESS_PRIVATE_KEY, expiresIn: "15h"}),
      refreshToken: this.jwtService.sign(payload, {secret: process.env.REFRESH_PRIVATE_KEY, expiresIn: "15d"})
    }
  }
}