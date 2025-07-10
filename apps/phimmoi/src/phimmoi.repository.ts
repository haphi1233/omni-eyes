import { AbstractRepository } from "@app/common";
import { Injectable } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { Phimmoi } from "./entity/phimmoi.entity";

@Injectable()
export class PhimmoiRepository extends AbstractRepository<Phimmoi> {
  protected readonly logger = new Logger(PhimmoiRepository.name);
  constructor(
    @InjectRepository(Phimmoi)
    entityRepository: Repository<Phimmoi>,
    entityManager: EntityManager,
  ) {
    super(entityRepository, entityManager);
  }
}
