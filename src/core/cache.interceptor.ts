import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, of } from "rxjs";

/**
 * 这里只是一个简单的示例，用来实例重写流
 */

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const isCache = true
    if(isCache) {
      return of([]) // 处理程序不会被调用了
    }
    return next.handle()
  }
}