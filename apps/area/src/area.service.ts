import { Injectable } from '@nestjs/common';
import { AreaRepository } from './area.repository';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreaService {
  constructor(private readonly areaRepository: AreaRepository) {}
  
  create(createAreaDto: CreateAreaDto) {
    return this.areaRepository.create(createAreaDto);
  }

  findAll() {
    return this.areaRepository.find({});
  }

  findOne(_id: string) {
    return this.areaRepository.findOne({ _id });
  }

  update(_id: string, updateAreaDto: UpdateAreaDto) {
    return this.areaRepository.findOneAndUpdate({ _id }, { $set: updateAreaDto });
  }

  remove(_id: string) {
    return this.areaRepository.findAndDelete({ _id });
  }
}