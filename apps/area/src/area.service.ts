import { Injectable } from '@nestjs/common';
import { AreaRepository } from './area.repository';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Area } from './entity/area.entity';

@Injectable()
export class AreaService {
  constructor(private readonly areaRepository: AreaRepository) {}
  
  async create(createAreaDto: CreateAreaDto) {
    const area = new Area({
      name: createAreaDto.name,
      description: createAreaDto.description
    });
    return this.areaRepository.create(area);
  }

  findAll() {
    return this.areaRepository.find({});
  }

  findOne(id: string) {
    return this.areaRepository.findOne({ id: +id });
  }

  update(id: string, updateAreaDto: UpdateAreaDto) {
    return this.areaRepository.findOneAndUpdate({ id: +id }, updateAreaDto);
  }

  remove(id: string) {
    return this.areaRepository.findAndDelete({ id: +id });
  }
}