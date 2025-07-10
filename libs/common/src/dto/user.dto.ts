import { Injectable } from "@nestjs/common";
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";

@Injectable()
export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
  @IsOptional()
  @IsArray()
  role: string[];
  @IsString()
  @IsOptional()
  id: string;
}
