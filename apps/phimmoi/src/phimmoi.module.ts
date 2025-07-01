import {
  AUTH_SERVICE,
  DatabaseModule,
  LoggerModule,
  NOTIFICATION_SERVICE,
} from "@app/common";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import * as Joi from "joi";
import { PhimmoiController } from "./phimmoi.controller";
import { PhimmoiRepository } from "./phimmoi.repository";
import { PhimmoiService } from "./phimmoi.service";
import { PhimmoiDocument, PhimmoiSchema } from "./shcema/phimmoi.schema";
@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: PhimmoiDocument.name, schema: PhimmoiSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),
        NOTIFICATIONS_HOST: Joi.string().required(),
        NOTIFICATIONS_PORT: Joi.number().required(),
        HTTP_PORT: Joi.number().required(),
      }),
    }),
    LoggerModule,
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get("AUTH_HOST"),
            port: configService.get("AUTH_PORT"),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: NOTIFICATION_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: NOTIFICATION_SERVICE,
            port: configService.get("NOTIFICATIONS_PORT"),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [PhimmoiController],
  providers: [PhimmoiService, PhimmoiRepository],
})
export class PhimmoiModule {}
