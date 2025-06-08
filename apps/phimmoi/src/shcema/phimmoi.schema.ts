import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class PhimmoiDocument extends AbstractDocument {
  @Prop()
  timeStamp: Date;
  @Prop()
  authorId: string;
  @Prop()
  start: Date;
  @Prop()
  end: Date;
  @Prop()
  url: string;
  @Prop()
  title: string;
  @Prop()
  type: string;
}
export const PhimmoiSchema = SchemaFactory.createForClass(PhimmoiDocument);
