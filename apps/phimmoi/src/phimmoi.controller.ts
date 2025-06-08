import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { PhimmoiService } from "./phimmoi.service";
import { CreatePhimmoiDto } from "./dto/create-phimmoi.dto";
import { UpdatePhimmoiDto } from "./dto/update-phimmoi.dto";
import { JwtAuthGuard } from "@app/common";

@Controller("phimmoi")
export class PhimmoiController {
  constructor(private readonly phimmoiService: PhimmoiService) {}

  @Post()
  create(@Body() createPhimmoiDto: CreatePhimmoiDto) {
    return this.phimmoiService.create(createPhimmoiDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.phimmoiService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.phimmoiService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePhimmoiDto: UpdatePhimmoiDto) {
    return this.phimmoiService.update(id, updatePhimmoiDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.phimmoiService.remove(id);
  }
}
