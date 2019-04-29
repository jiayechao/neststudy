import { Module } from '@nestjs/common';
import { UsersModule } from './../users/users.module';
import { AuthService } from './auth.service';
import { HttpStrategy } from './../http.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './../jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'bearer',// 设置一个默认的策略
      property: 'profile', // @issure说是更改属性名称，但是不知道是我不会用还是怎么，好像不起作用
      session: true  // @issure这个自定义护照不知道干嘛的
    }), 
    JwtModule.register({ // 这里是硬编码的，实际中应该是根据环境变量
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    UsersModule
  ],
  providers: [AuthService, HttpStrategy, JwtStrategy],
  // providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService]
})

export class AuthModule {}
