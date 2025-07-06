import { DatabaseModule } from "@app/common";
import { Module } from "@nestjs/common";
import { Role } from "./entity/role.entity";
import { User } from "./entity/user.entity";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([User, Role])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
