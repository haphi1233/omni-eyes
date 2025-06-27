import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "@app/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AreaDocument } from "./schema/area.schema";

@Injectable()
export class AreaRepository extends AbstractRepository<AreaDocument> {
  protected readonly logger = new Logger(AreaRepository.name);

  constructor(@InjectModel(AreaDocument.name) areaModel: Model<AreaDocument>) {
    super(areaModel);
  }
}
