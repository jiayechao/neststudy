import { Scalar, CustomScalar } from "@nestjs/graphql";
import { parseValue, Kind, ValueNode } from "graphql";

// 这是用ts创建的一个标量,并注册成一个提供者

@Scalar('Date', type => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description = 'Date custom scalar type'

  parseValue(value: number): Date {
    return new Date(value) // value from the client
  }

  serialize(value: Date): number {
    return value.getTime() // value sent to the client
  }

  parseLiteral(ast: ValueNode): Date {
    if(ast.kind === Kind.INT) {
      return new Date(ast.value)
    }
    return null
  }
}