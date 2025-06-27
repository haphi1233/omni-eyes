import { DatabaseModule, LoggerModule } from "@app/common";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { AreaController } from "./area.controller";
import { AreaRepository } from "./area.repository";
import { AreaService } from "./area.service";
import { AreaDocument, AreaSchema } from "./schema/area.schema";

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: AreaDocument.name, schema: AreaSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        MONGO_URI: Joi.string().required(),
      }),
    }),
    LoggerModule,
  ],
  controllers: [AreaController],
  providers: [AreaService, AreaRepository],
})
export class AreaModule {}
