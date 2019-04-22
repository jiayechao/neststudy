// 创建一个过滤器，负责捕获HttpException类的实例
import { HttpException, ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch(HttpException) // @Catch() 装饰器绑定所需的元数据到异常过滤器上。它告诉Nest这个特定的过滤器正在寻找 HttpException 而没有别的,可以有多个
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        response
    }
}