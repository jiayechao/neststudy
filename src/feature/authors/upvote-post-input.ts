import { Field, InputType } from "type-graphql";

// 创建一个输入类型
@InputType()
export class UpvotePostInput {
  @Field() postId: number
}