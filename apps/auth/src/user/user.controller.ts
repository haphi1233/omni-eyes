import { Controller, Post, Body, UseGuards, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/user.dto";
import { JwtAuthGuard } from "../guards/jwt.guards";
import { CurrentUser } from "@app/common";
import { UserDocument } from "./schema/user.schema";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() currentUser: UserDocument) {
    return currentUser;
  }
}
