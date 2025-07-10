import { Logger, NotFoundException } from "@nestjs/common";
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { AbstractEntity } from "./abstract.entity";
import {
  DeepPartial,
  EntityManager,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

/**
 * Abstract base class for concrete Mongoose repositories.
 * Contains common, reusable methods for interacting with a MongoDB collection.
 * Subclasses should override the protected `logger` property with a concrete logger instance.
 * @abstract
 * @class AbstractRepository
 * @template Tdocument The type of the document managed by this repository
 */
export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  protected abstract readonly logger: Logger;
  constructor(
    protected readonly entityRepository: Repository<T>,

    protected readonly entityManager: EntityManager,
  ) {}

  async create(entity: T): Promise<T> {
    return await this.entityManager.save(entity);
  }

  async findOne(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<T> {
    const entity = await this.entityRepository.findOne({ where, relations });

    if (!entity) {
      this.logger.warn("Entity not found with where: ", where);
      throw new NotFoundException("Entity not found");
    }
    return entity;
  }

  async find(where: FindOptionsWhere<T>): Promise<T[]> {
    const entities = await this.entityRepository.find({ where });
    return entities;
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ) {
    const entity = await this.entityRepository.update(where, partialEntity);

    if (!entity.affected) {
      this.logger.warn("Entity not found with where: ", where);
      throw new NotFoundException("Entity not found");
    }
    return this.findOne(where);
  }

  async findAndDelete(where: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.entityRepository.findOne({ where });
    if (!entity) {
      this.logger.warn("Entity not found with where: ", where);
      throw new NotFoundException("Entity not found");
    }
    return await this.entityManager.remove(entity);
  }
}
