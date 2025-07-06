import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { Area } from "./entity/area.entity";

@Injectable()
export class AreaRepository extends AbstractRepository<Area> {
  protected readonly logger = new Logger(AreaRepository.name);

  constructor(
    @InjectRepository(AreaRepository)
    areaRepository: Repository<Area>,
    entityManager: EntityManager,
  ) {
    super(areaRepository, entityManager);
  }
}
