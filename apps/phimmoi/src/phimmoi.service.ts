import { Inject, Injectable } from "@nestjs/common";
import { CreatePhimmoiDto } from "./dto/create-phimmoi.dto";
import { UpdatePhimmoiDto } from "./dto/update-phimmoi.dto";
import { PhimmoiRepository } from "./phimmoi.repository";
import { ClientProxy } from "@nestjs/microservices";
import { EmailDto, NOTIFICATION_SERVICE } from "@app/common";
import { Phimmoi } from "./entity/phimmoi.entity";

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
    const phimmoi = new Phimmoi({
      ...createPhimmoiDto,
      timeStamp: new Date(),
      authorId: "1305",
    });
    return this.phimmoiRepository.create(phimmoi);
  }

  findAll() {
    return this.phimmoiRepository.find({});
  }

  findOne(id: number) {
    return this.phimmoiRepository.findOne({ id });
  }

  update(id: number, updatePhimmoiDto: UpdatePhimmoiDto) {
    return this.phimmoiRepository.findOneAndUpdate(
      { id: +id },
      updatePhimmoiDto,
    );
  }

  remove(id: number) {
    return this.phimmoiRepository.findAndDelete({ id });
  }
}
