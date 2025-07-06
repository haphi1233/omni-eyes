import { Injectable } from "@nestjs/common";
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from "class-validator";
import { RoleDTO } from "./role.dto";
import { Type } from "class-transformer";
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
  @Type(() => RoleDTO)
  roles: RoleDTO[];
}
