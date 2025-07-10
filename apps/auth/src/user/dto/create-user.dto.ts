import { Injectable } from "@nestjs/common";
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from "class-validator";
@Injectable()
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsOptional()
  roles: string[];
}
