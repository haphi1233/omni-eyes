import {
  IsDate,
  IsNotEmpty,
  isNotEmpty,
  IsString,
  IsUrl,
} from "class-validator";

export class CreatePhimmoiDto {
  @IsDate()
  start: Date;

  @IsDate()
  end: Date;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}

export const mockCreatePhimmoiDto = {
  start: "2023-10-01",
  end: "2023-10-02",
  url: "https://example.com/mock-url",
  title: "Mock Title",
  type: "Mock Type",
};
