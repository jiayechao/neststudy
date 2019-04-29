import {Field, Int, ObjectType} from 'type-graphql'
import {Post} from '../../posts/models/post'

@ObjectType()
export class Author {
  @Field(type => Int)
  id: number

  @Field(type => Int)
  age: number

  @Field({nullable: true})
  firstName?: string

  @Field({nullable: true})
  lastName?: string

  @Field(type => [Post])
  posts: Post[]
}
