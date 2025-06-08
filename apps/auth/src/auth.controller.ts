import { Controller, Post, UseGuards, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalGuard } from "./guards/local.guards";
import { CurrentUser } from "./current-user.decorator";
import { UserDocument } from "./user/schema/user.schema";
import { Response } from "express";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { JwtAuthGuard } from "./guards/jwt.guards";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post("login")
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern("authenticate")
  async authenticate(@Payload() jwt: any) {
    console.log(jwt);
    return jwt;
  }
}
