import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger); 中间件，全局
  await app.listen(3000);
}
bootstrap();
