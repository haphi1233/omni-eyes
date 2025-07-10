import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { Role } from "./entity/role.entity";

@Injectable()
export class RoleRepository extends AbstractRepository<Role> {
  protected readonly logger = new Logger(RoleRepository.name);

  constructor(
    @InjectRepository(Role) roleRepository: Repository<Role>,
    entityManager: EntityManager,
  ) {
    super(roleRepository, entityManager);
  }
}
