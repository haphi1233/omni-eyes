import { createParamDecorator, ExecutionContext } from "@nestjs/common";

function getUserFromContext(context: ExecutionContext) {
  const request = context.switchToHttp().getRequest();
  return request.user; // Assuming request.user is populated by Passport
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => getUserFromContext(context),
);
