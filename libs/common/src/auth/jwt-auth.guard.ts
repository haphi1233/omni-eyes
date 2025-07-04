import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ClientProxy } from "@nestjs/microservices";
import { log } from "console";
import { map, Observable, tap } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject("auth") private readonly authClient: ClientProxy,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt =
      context.switchToHttp().getRequest().cookies?.Authentication ||
      context.switchToHttp().getRequest().headers?.cookie?.split("=")[1] || // ??? Cân tìm hiểu format của cookie
      context.switchToHttp().getRequest().headers?.Authentication;
    if (!jwt) {
      return false;
    }
    return this.authClient
      .send("authenticate", {
        Authentication: jwt,
      })
      .pipe(
        tap((res: any) => {
          const roles = this.reflector.get<string[]>(
            "roles",
            context.getHandler(),
          );
          if (roles && !roles.includes(res.roles[0])) {
            throw new UnauthorizedException();
          }

          context.switchToHttp().getRequest().user = res;
        }),
        map(() => {
          return true;
        }),
      );
  }
}
