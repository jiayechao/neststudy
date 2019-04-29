import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { validate } from 'class-validator';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthService } from './auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { // 第二个参数代表多种策略
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey'
    })
  }

  async validate(payload: JwtPayload) {
    console.log(payload)
    const user = this.authService.validateUser(payload)

    if(!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}