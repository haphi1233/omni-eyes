import { GetUserDto } from "./dto/get-user.dto";
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/user.dto";
import * as bcrypt from "bcryptjs";
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: CreateUserDto) {
    await this.validateCreateUser(user);
    return this.userRepository.create({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });
  }

  async validateCreateUser(user: CreateUserDto) {
    try {
      await this.userRepository.findOne({ email: user.email });
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
    return this.userRepository.findOne(getUserDto);
  }
}
