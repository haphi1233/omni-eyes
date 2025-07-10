import { IsNotEmpty, IsString } from "class-validator";

export class RoleDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
