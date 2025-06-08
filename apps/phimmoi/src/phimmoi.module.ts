import { DatabaseModule, LoggerModule } from "@app/common";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import * as Joi from "joi";
import { PhimmoiController } from "./phimmoi.controller";
import { PhimmoiRepository } from "./phimmoi.repository";
import { PhimmoiService } from "./phimmoi.service";
import { PhimmoiDocument, PhimmoiSchema } from "./shcema/phimmoi.schema";
import { AuthCommonModule } from "@app/common/auth/auth-common.module";
@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: PhimmoiDocument.name, schema: PhimmoiSchema },
    ]),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),
      }),
    }),
    LoggerModule,
    AuthCommonModule,
    // ClientsModule.registerAsync([
    //   {
    //     name: "auth",
    //     imports: [ConfigModule],
    //     useFactory: (configService: ConfigService) => {
    //       return {
    //         transport: Transport.TCP,
    //         options: {
    //           host: configService.get("AUTH_HOST"),
    //           port: configService.get("AUTH_PORT"),
    //         },
    //       };
    //     },
    //     inject: [ConfigService],
    //   },
    // ]),
  ],
  controllers: [PhimmoiController],
  providers: [PhimmoiService, PhimmoiRepository],
})
export class PhimmoiModule {}
