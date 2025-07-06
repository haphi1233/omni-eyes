import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RoleDTO {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
