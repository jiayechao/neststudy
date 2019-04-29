import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-http-bearer'
import { AuthService } from './auth/auth.service';


@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  
  constructor(private readonly authService: AuthService) {
    super()
  }
  
  async validate(token: string) {
    const user = ''
    // const user = await this.authService.validateUser(token)
    if(!user) {
      throw new UnauthorizedException()
    }
    return user
  }

}