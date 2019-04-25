import { Injectable, NestInterceptor, ExecutionContext } from "@nestjs/common";

@Injectable()
export class LogginInterceptor implements NestInterceptor {
    intercept(ctx: ExecutionContext, callHandle: )
}