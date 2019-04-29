import { Resolver, ResolveProperty, Parent, Args, Query, Mutation } from '@nestjs/graphql';
import { Author } from './models/author';
import { AuthorsService } from './authors.service';
import { PostsService } from './../posts/posts.service';
import { Int, Arg } from 'type-graphql';
import { Post } from '../posts/models/post';
import { AuthorArgs } from './author-args'
import { type } from 'os';

@Resolver(of => Author)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly postsService: PostsService
  ) {}

  @Query(returns => Author, { name: 'author' })
  async getAuthor(@Args() id: AuthorArgs) {
    return await this.authorsService.findOneById(id);
  }

  @Mutation(returns => Post)
  async upvotePost(@Args('postId') postId: number) {
    return await this.postsService.upvoteById({id: postId})
  }

  @ResolveProperty('posts') // 不知道怎么回事，属性名只有和函数名一致才能启动app
  async posts(@Parent() author){
    const { id } = author;
    return await this.postsService.findAll({ authorId: id });
  }
}
