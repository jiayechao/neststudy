import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AuthGuard implements CanActivate {
    canActivate(ctx: ExecutionContext): boolean {
        console.log(ctx)
        const request = ctx.switchToHttp().getRequest()
        return false
    }
}