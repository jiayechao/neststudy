import { Controller, Get, UseGuards, Header, Req, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtAuthGuard } from './../jwt-auth.guard';

@Controller('users')
// @UseGuards(new JwtAuthGuard()) // 会去判断有没有，如果有再去判断
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  @Get()
  findAll(@Req() request) {
    if(request) {
      console.log(request.user, request.profile) // 验证通过，user被附加到request上
    }
    return []
  }

  @Get(':id')
  findId(@Param('id') id) {
    return `this action return a ${id}`
  }
}
