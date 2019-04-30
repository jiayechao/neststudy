import { Injectable, ExecutionContext } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(ctx: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', ctx.getHandler())
        if(!roles) {
            return true
        }
        const req = ctx.switchToHttp().getRequest()
        // const context = GqlExecutionContext.create(ctx) // graphQL的守卫上下文和restful不一样
        const user = req.user // 假定授权用户在request上
        const hasRole = () => user.roles.some(role => roles.includes(role))
        return user && user.roles && hasRole()
    }
}

