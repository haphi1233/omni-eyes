import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";

@Injectable()
export class NotificationsService {
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: this.configService.get("STMP_USER"),
        clientId: this.configService.get("GMAIL_CLIENT_ID"),
        clientSecret: this.configService.get("GMAIL_CLIENT_SECRET"),
        refreshToken: this.configService.get("GMAIL_REFRESH_TOKEN"),
      },
    });
  }

  async notifyUser(data: any) {
    this.transporter.sendMail({
      from: this.configService.get("STMP_USER"),
      to: "teh07785@gmail.com",
      subject: "Test API",
      text: "Email sent succesfully!",
    });
  }
}
