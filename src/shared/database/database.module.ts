import { Module, DynamicModule } from '@nestjs/common';

// 返回一个动态模块 

@Module({})
export class DatabaseModule {
    static forRoot(entities = [], options?): DynamicModule {
        const providers = []
        return {
            module: DatabaseModule,
            providers: providers,
            exports: exports,
        }
    }
}
