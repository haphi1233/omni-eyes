import { Module } from "@nestjs/common";
import { NotificationsController } from "./notifications.controller";
import { NotificationsService } from "./notifications.service";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "@app/common";
import * as Joi from "joi";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        GMAIL_CLIENT_ID: Joi.string().required(),
        GMAIL_CLIENT_SECRET: Joi.string().required(),
        GMAIL_REFRESH_TOKEN: Joi.string().required(),
        STMP_USER: Joi.string().required(),
      }),
    }),
    LoggerModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
