// 创建一个过滤器，负责捕获HttpException类的实例
// 过滤器的使用可以在方法范围，控制器范围，全局范围
import { HttpException, ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch(HttpException) // @Catch() 装饰器绑定所需的元数据到异常过滤器上。
// 它告诉Nest这个特定的过滤器正在寻找 HttpException 而没有别的,可以有多个.如果留空，则捕获所有错误
export class HttpExceptionFilter implements GqlExceptionFilter { // 所有的过滤器都要实现ExceptionFilter<T>接口，他会强制使用有效签名提供catch方法
    catch(exception: HttpException, host: ArgumentsHost) {
        // ArgumentsHost是传递给原始处理程序的参数的一个包装，根据类型不同包含不同的参数组
        // const ctx = host.switchToHttp();
        // const response = ctx.getResponse();
        // const request = ctx.getRequest();
        // const status = exception.getStatus();
        // response
        //     .status(status)
        //     .json({
        //         statusCode: exception.getStatus(),
        //         timestamp: new Date().toISOString(),
        //         path: request.url,
        //         mes: exception.message
        //     })

        // 下面是graphQL的应用
        const gqlHost = GqlArgumentsHost.create(host)
        const info = gqlHost.getContext()
        console.log('info',info)
        return exception
    }
}