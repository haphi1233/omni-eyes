import { Injectable } from "@nestjs/common";
import { CreatePhimmoiDto } from "./dto/create-phimmoi.dto";
import { UpdatePhimmoiDto } from "./dto/update-phimmoi.dto";
import { PhimmoiRepository } from "./phimmoi.repository";

@Injectable()
export class PhimmoiService {
  constructor(private readonly phimmoiRepository: PhimmoiRepository) {}
  create(createPhimmoiDto: CreatePhimmoiDto) {
    return this.phimmoiRepository.create({
      ...createPhimmoiDto,
      timeStamp: new Date(),
      authorId: "1305",
    });
  }

  findAll() {
    return this.phimmoiRepository.find({});
  }

  findOne(_id: string) {
    return this.phimmoiRepository.findOne({ _id });
  }

  update(_id: string, updatePhimmoiDto: UpdatePhimmoiDto) {
    return this.phimmoiRepository.findOneAndUpdate(
      { _id },
      { $set: updatePhimmoiDto },
    );
  }

  remove(_id: string) {
    return this.phimmoiRepository.findAndDelete({ _id });
  }
}
