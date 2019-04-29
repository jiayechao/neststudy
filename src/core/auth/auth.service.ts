import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { validate } from 'class-validator';
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor( 
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(): Promise<string> {
    const user: JwtPayload = {email: 'user@email.com'}
    return this.jwtService.sign(user)
  }  
  
  // OAuth 2.0 。HTTP 承载认证策略使用承载令牌对用户进行认证
  // async validateUser(token: string): Promise<any> {
  //   return await this.usersService.findOneByToken(token)
  // }

  // jwt验证
  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByEmail(payload.email)
  }
}
