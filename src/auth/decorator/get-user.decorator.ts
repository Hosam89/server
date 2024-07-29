import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// Custom request Module
export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
