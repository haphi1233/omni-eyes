import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

/**
 * @abstract
 * @class AbstractDocument
 * @description Represents a base Mongoose document with common properties.
 * Concrete Mongoose schemas should extend this class.
 * The `_id` field is automatically managed by Mongoose but declared here for type safety
 * and to be explicitly part of the class hierarchy.
 */
@Schema()
export abstract class AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;
}
