import { Resolver, ResolveProperty, Parent, Args, Query, Mutation, Subscription } from '@nestjs/graphql';
import { Author } from './models/author';
import { AuthorsService } from './authors.service';
import { PostsService } from './../posts/posts.service';
import { PubSub } from 'apollo-server-express';
import { Post } from '../posts/models/post';
import { AuthorArgs } from './author-args'
import { UpvotePostInput } from './upvote-post-input';
import { Comment } from './../comments/models/comment';
import { getNamedType } from 'graphql';

const pubSub = new PubSub(); // 可以写成自定义provide，用usevalue
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

  @Mutation(returns => Post)
  async upvotePostByObj(@Args('upvotePostData') upvotePostData: UpvotePostInput) {
    const post = await this.postsService.upvoteByIdObj(upvotePostData)
    // pubSub.publish('commentAdded', { commentAdded: post });
    return post 
  }

  @ResolveProperty('posts') // 不知道怎么回事，属性名只有和函数名一致才能启动app
  async posts(@Parent() author){
    const { id } = author;
    return await this.postsService.findAll({ authorId: id });
  }

  // 这个功能需要websocket支持
  @Subscription(returns => Comment)
  commentAdded(){
    return pubSub.asyncIterator('commentAdded')
  }

}

@Resolver('helloWorld')
export class aaa {
  @Query()
  getName() {
    return {name: 'jia'}
  }
}