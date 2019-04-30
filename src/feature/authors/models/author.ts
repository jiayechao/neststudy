import {Field, Int, ObjectType} from 'type-graphql'
import {Post} from '../../posts/models/post'
import { Comment } from './../../comments/models/comment';

@ObjectType({description: '作者'})
export class Author {
  @Field(type => Int)
  id: number

  @Field(type => Int)
  age: number

  @Field({nullable: true, description: '巴拉巴拉'})
  firstName?: string

  @Field({nullable: true})
  lastName?: string

  @Field(type => [Post])
  posts: Post[]

  @Field(type => [Comment])
  comments: Comment[];
}
