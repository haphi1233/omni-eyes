
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  @IsNotEmpty()
  areaName: string;

  @IsString()
  description: string;
}
