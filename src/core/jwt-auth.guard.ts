import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';


// 继承拓展authguard
@Injectable()
export class JwtAuthGuard extends AuthGuard('bearer') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
