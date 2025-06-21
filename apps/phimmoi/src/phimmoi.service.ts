import { Inject, Injectable } from "@nestjs/common";
import { CreatePhimmoiDto } from "./dto/create-phimmoi.dto";
import { UpdatePhimmoiDto } from "./dto/update-phimmoi.dto";
import { PhimmoiRepository } from "./phimmoi.repository";
import { ClientProxy } from "@nestjs/microservices";
import { EmailDto, NOTIFICATION_SERVICE } from "@app/common";

@Injectable()
export class PhimmoiService {
  constructor(
    private readonly phimmoiRepository: PhimmoiRepository,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: ClientProxy,
  ) {}
  create(createPhimmoiDto: CreatePhimmoiDto) {
    const emailDto: EmailDto = {
      email: "quanghung99dhtb@gmail.com", // Replace with actual user email if available
      subject: `New Movie Added: ${createPhimmoiDto.title}`,
      text: `The movie "${createPhimmoiDto.title}" has been successfully added to the system.`,
    };
    this.notificationService.emit("notification.create", emailDto);
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
