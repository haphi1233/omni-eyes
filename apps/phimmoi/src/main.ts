import { NestFactory } from "@nestjs/core";
import { PhimmoiModule } from "./phimmoi.module";
import { Logger } from "nestjs-pino";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
async function bootstrap() {
  const app = await NestFactory.create(PhimmoiModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      // Chỉ cho phép các thuộc tính đã được định nghĩa trong DTO
      whitelist: true,
      // Nếu nhận được thuộc tính không mong muốn, ném lỗi
      // forbidNonWhitelisted: true,
      // Cho phép tự động chuyển đổi kiểu dữ liệu đầu vào theo DTO
      transform: true,
      transformOptions: {
        // Bật chuyển đổi kiểu dữ liệu ngầm định (ví dụ: string -> number)
        enableImplicitConversion: true,
      },
    }),
  );
  app.useLogger(app.get(Logger));
  await app.listen(configService.get("HTTP_PORT") || 3000);
}
bootstrap();
