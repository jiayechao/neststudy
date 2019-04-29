import { Injectable } from '@nestjs/common';
import { JwtPayload } from './../interfaces/jwt-payload.interface';

@Injectable()
export class UsersService {
  findOneByToken(token: string) {
    console.log(token)
    return {name: 'yeye'} // 验证通过后，user将被附着到请求对象上
  }

  findOneByEmail(email: string) {
    console.log(email)
    return {name: 'chao'}
  }
}
