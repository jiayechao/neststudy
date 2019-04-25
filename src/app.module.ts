import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './feature/cats/cats.controller';
import { CatsService } from './feature/cats/cats.service';
import { CatsModule } from './feature/cats/cats.module';
import { DogsController } from './feature/dogs/dogs.controller';
import { DogsModule } from './feature/dogs/dogs.module';
import { DatabaseModule } from './shared/database/database.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './core/validation.pipe';
import { HttpExceptionFilter } from './core/http-exception.filter';

@Module({
  imports: [CatsModule, DogsModule, DatabaseModule],
//
 controllers: [AppController, CatsController], // cats模快化后不再需要单独注入controllers了
  providers: [
    AppService, 
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class AppModule {}
