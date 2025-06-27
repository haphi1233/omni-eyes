import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";

@Schema({ versionKey: false })
export class AreaDocument extends AbstractDocument {
  @Prop()
  areaName: string;

  @Prop()
  description: string;
}

export const AreaSchema = SchemaFactory.createForClass(AreaDocument);
