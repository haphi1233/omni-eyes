import { Injectable } from "@nestjs/common";
import { IsEmail, IsString } from "class-validator";

@Injectable()
export class EmailDto {
  @IsEmail()
  email: string;
  @IsString()
  subject: string;
  @IsString()
  text: string;
}
