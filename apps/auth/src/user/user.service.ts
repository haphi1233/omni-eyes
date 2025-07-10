import { GetUserDto } from "./dto/get-user.dto";
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { User } from "./entity/user.entity";
import { Role } from "./entity/role.entity";
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(user: CreateUserDto) {
    await this.validateCreateUser(user);
    const newUser = new User({});
    newUser.email = user.email;
    newUser.password = await bcrypt.hash(user.password, 10);
    newUser.roles = user.roles?.map((role) => {
      const roleReturn = new Role({});
      roleReturn.name = role;
      return roleReturn;
    });
    return this.userRepository.create(newUser);
  }

  async validateCreateUser(userDto: CreateUserDto) {
    try {
      await this.userRepository.findOne({ email: userDto.email });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException("User already exists");
  }

  async verifyUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.userRepository.findOne({ id: getUserDto.id });
  }
}
