import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import {tap} from 'rxjs/operators'

/**
 * NestInterceptor<T，R> 是一个通用接口，
 * 其中 T 表示已处理的 Observable<T> 的类型（在流后面），
 * 而 R 表示包含在返回的 Observable<R> 中的值的返回类型。
 */
@Injectable()
export class LogginInterceptor implements NestInterceptor {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...')
        
        const now = Date.now()
        console.log(next
            .handle() ) // 返回一个
        return next
        .handle()
        .pipe(
            tap(() => console.log(`After...${Date.now() - now}ms`))
        )
    }
}