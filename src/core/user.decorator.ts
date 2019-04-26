import { createParamDecorator } from "@nestjs/common";

// 作为方法装饰器，函数直接使用这个装饰器的返回结果
export const User = createParamDecorator((data, req) => {
  return req.user
})