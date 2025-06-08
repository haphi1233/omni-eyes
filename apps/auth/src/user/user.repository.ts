import { Model } from "mongoose";
import { AbstractRepository } from "@app/common";
import { UserDocument } from "./schema/user.schema";
import { Logger, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(@InjectModel(UserDocument.name) model: Model<UserDocument>) {
    super(model);
  }
}
