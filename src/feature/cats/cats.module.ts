import { Module, Global, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { LoggerMiddleware } from './../../shared/logger/logger.middleware';

// @Global() // 将此模块成为全局模块，这样别的模块不用import也可以使用CatsService
@Module({

    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService] // 模块都是单例的，我们可以在各个模块之间共享CatsService实例（@issue:如何使用？）
})
// 依赖注入，如果现有实例已在其他地方请求，则返回现有实例
// export class CatsModule{
//     constructor(private readonly catsService: CatsService) {}
// }
// 为了使用中间件，模块必须实现NestModule接口
export class CatsModule implements NestModule {
    constructor(private readonly catsService: CatsService) {}
    // MiddlewareConsumer封装有多种方法
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware) // 多个中间件可以用逗号隔开
            .exclude(
                { path: 'dogs', method: RequestMethod.GET },
                { path: 'dogs', method: RequestMethod.POST }
            )
            .forRoutes({path: 'dogs', method: RequestMethod.GET}) // 针对特定方法的特定类型
            // .forRoutes('cats') // 可以直接写控制器
    }
    
}
