import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export type RequestUser = { id: string; role: "PARENT" | "CAREGIVER" | "ADMIN"; familyId?: string };

export const CurrentUser = createParamDecorator((_d: unknown, ctx: ExecutionContext): RequestUser => {
  const req = ctx.switchToHttp().getRequest();
  return {
    id: req.headers["x-user-id"] || "dev-parent",
    role: req.headers["x-user-role"] || "PARENT",
    familyId: req.headers["x-family-id"]
  } as RequestUser;
});
