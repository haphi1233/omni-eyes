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
import { JwtAuthGuard, UserDto } from "@app/common";
import { CurrentUser } from "@app/common";
import { Roles } from "@app/common/decorator/roles.decorator";

@Controller("phimmoi")
export class PhimmoiController {
  constructor(private readonly phimmoiService: PhimmoiService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createPhimmoiDto: CreatePhimmoiDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.phimmoiService.create({
      ...createPhimmoiDto,
      authorId: user.id,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles("Admin")
  findAll() {
    return this.phimmoiService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.phimmoiService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: number, @Body() updatePhimmoiDto: UpdatePhimmoiDto) {
    return this.phimmoiService.update(id, updatePhimmoiDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles("Admin", "Manager")
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.phimmoiService.remove(id);
  }
}
