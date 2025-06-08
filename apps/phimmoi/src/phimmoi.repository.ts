import { PhimmoiDocument, PhimmoiSchema } from "./shcema/phimmoi.schema";
import { AbstractRepository } from "@app/common";
import { Injectable } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class PhimmoiRepository extends AbstractRepository<PhimmoiDocument> {
  protected readonly logger = new Logger(PhimmoiRepository.name);
  constructor(
    @InjectModel(PhimmoiDocument.name) models: Model<PhimmoiDocument>,
  ) {
    super(models);
  }
}
