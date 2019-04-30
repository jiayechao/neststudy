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
import { AuthService } from './core/auth/auth.service';
import { UsersService } from './core/users/users.service';
import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './core/users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthorsModule } from './feature/authors/authors.module';
import { PostsService } from './feature/posts/posts.service';
import { PostsModule } from './feature/posts/posts.module';
import { CommentsService } from './feature/comments/comments.service';

@Module({
  imports: [CatsModule, DogsModule, DatabaseModule, AuthModule, UsersModule, GraphQLModule.forRootAsync({
  
  // 这里的参数将传递给底层的apollo实例
    // typePaths: ['./**/*.graphql'],
    // 我希望能异步传递模块
    useFactory: () => ({
      // typePaths: ['./**/*.graphql'],// 这个是架构模式使用的
      autoSchemaFile: 'schema.gql',
      nstallSubscriptionHandlers: true
    }),
     // 可以使用 autoSchemaFile 向 options 对象添加属性。
    //还可以添加buildSchemaOptions 属性 - 一个将传递给 buildSchema() 函数的选项对象（从type-graphql包中）
  }), AuthorsModule, PostsModule],
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
    },
    AuthService,
    UsersService,
    PostsService,
    CommentsService
  ],
})
export class AppModule {}
