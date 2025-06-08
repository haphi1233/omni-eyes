import { Logger, NotFoundException } from "@nestjs/common";
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { AbstractDocument } from "./abstract.schema";

/**
 * Abstract base class for concrete Mongoose repositories.
 * Contains common, reusable methods for interacting with a MongoDB collection.
 * Subclasses should override the protected `logger` property with a concrete logger instance.
 * @abstract
 * @class AbstractRepository
 * @template Tdocument The type of the document managed by this repository
 */
export abstract class AbstractRepository<Tdocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<Tdocument>) {}

  async create(item: Omit<Tdocument, "_id">): Promise<Tdocument> {
    const createdItem = new this.model({ ...item, _id: new Types.ObjectId() });
    return (await createdItem.save()).toJSON() as unknown as Tdocument;
  }

  async findOne(filterQuery: FilterQuery<Tdocument>): Promise<Tdocument> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<Tdocument>(true);

    if (!document) {
      this.logger.warn("Document not found with query: ", filterQuery);
      throw new NotFoundException("Document not found");
    }
    return document;
  }

  async find(filterQuery: FilterQuery<Tdocument>): Promise<Tdocument[]> {
    const document = await this.model.find(filterQuery).lean<Tdocument[]>(true);
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<Tdocument>,
    update: UpdateQuery<Tdocument>,
  ): Promise<Tdocument> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      new: true,
    });
    if (!document) {
      this.logger.warn("Document not found with query: ", filterQuery);
      throw new NotFoundException("Document not found");
    }
    return document;
  }

  async findAndDelete(filterQuery: FilterQuery<Tdocument>): Promise<Tdocument> {
    const document = await this.model.findOneAndDelete(filterQuery);
    if (!document) {
      this.logger.warn("Document not found with query: ", filterQuery);
      throw new NotFoundException("Document not found");
    }
    return document;
  }
}
