import { ArgsType, Field, Int } from 'type-graphql'
import { Min } from 'class-validator'


@ArgsType()
export class AuthorArgs {
  @Field(type => Int)
  @Min(6) // id最小是6
  id: number;
}