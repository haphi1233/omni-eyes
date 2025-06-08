import { Injectable } from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

@Injectable()
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
  @IsString()
  role: string;
}
