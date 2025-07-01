import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map, Observable, tap } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject("auth") private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt =
      context.switchToHttp().getRequest().cookie?.Authentication ||
      context.switchToHttp().getRequest().headers?.Authentication;
    console.log("jwt", jwt);
    console.log("cookie", context.switchToHttp().getRequest().cookie);
    console.log("cookies", context.switchToHttp().getRequest().cookies);
    console.log("headers", context.switchToHttp().getRequest().headers);
    console.log("raw", context.switchToHttp().getRequest().raw);
    if (!jwt) {
      return false;
    }
    return this.authClient
      .send("authenticate", {
        Authentication: jwt,
      })
      .pipe(
        tap((res: any) => {
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => {
          return true;
        }),
      );
  }
}
