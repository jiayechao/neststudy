import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

// （@issue:没看懂这里是啥意思）
export interface Response<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    
    console.log(ctx.switchToHttp().getRequest().params) // 可以在ctx上获取传入的数据
    return next
      .handle()
      .pipe(
        // data是返回，将返回重新包装成一个data对象，也可以做一些
        map(data => {console.log('data is', data);return { data }})
      )
  }
}