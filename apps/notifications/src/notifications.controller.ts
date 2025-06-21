import { Controller, UsePipes, ValidationPipe } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { EventPattern, Payload } from "@nestjs/microservices";
import { EmailDto } from "@app/common";

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern("notification.create")
  notifyUser(@Payload() data: EmailDto) {
    console.log(data);
    this.notificationsService.notifyUser(data);
  }
}
