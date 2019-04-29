import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: true
  });
  // app.use(logger); 中间件，全局
  // app.useGlobalFilters(new HttpExceptionFilter()) // useGlobalFilters不会为网关和混合应用程序设置过滤器（不理解这句话）
  // 而且这里是从模块外部注册，不能依赖注入（从任何模块外部注册的全局过滤器不能注入依赖），所以我们可以使用APP_FILTER
  await app.listen(3000);
}
bootstrap();
