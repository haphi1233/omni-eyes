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
      context.switchToHttp().getRequest().cookies?.Authentication ||
      context.switchToHttp().getRequest().headers?.cookie?.split("=")[1] ||  // ??? Cân tìm hiểu format của cookie
      context.switchToHttp().getRequest().headers?.Authentication;

    console.log(jwt);
    console.log(context.switchToHttp().getRequest().headers);
    console.log(context.switchToHttp().getRequest().cookies);
    
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
