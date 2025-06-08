import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { AUTH_SERVICE } from "../constant";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get("AUTH_HOST"),
            port: configService.get("AUTH_PORT"),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AuthCommonModule {}
