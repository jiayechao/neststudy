import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class Comment {
  @Field(type => Int)
  id: number

  @Field()
  content: string
}