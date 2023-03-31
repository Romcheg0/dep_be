import { Controller, Post, Get, Body, Headers, UseGuards, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import {UserDto} from "./user.dto"
import { LoginDto } from './login.dto';
import { JwtAuthGuard } from './jwt-auth-guard';
@Controller('users')
export class UsersController {
  constructor (private usersService: UsersService){}

  @Post('/register')
  register(@Body() userDto: UserDto){
    return this.usersService.register(userDto)
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto){
    return this.usersService.login(loginDto)
  }
  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  logout(@Headers() headers){
      const authHeader = headers.authorization
      const token = authHeader.split(' ')[1]
      return this.usersService.logout(token)
  }

  @Post('/refresh')
  refresh(@Headers() headers){
    const authToken = headers.authorization
    const refreshToken = headers.refresh
    return this.usersService.refresh(authToken, refreshToken)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_all')
  find_all(){
    return this.usersService.find_all()
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_by_id/:id')
  find_by_id(@Param() param){
    return this.usersService.find_by_id(param['id'])
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update_by_id/:id')
  update_by_id(@Param() param, @Body() userDto: UserDto){
    return this.usersService.update_by_id(param['id'], userDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete_by_id/:id')
  delete_by_id(@Param() param){
    return this.usersService.delete_by_id(param['id'])
  }
}
