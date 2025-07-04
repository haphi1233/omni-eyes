import { UserService } from "./user/user.service";
import { Injectable } from "@nestjs/common";
import { UserDocument } from "./user/schema/user.schema";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: UserDocument, response: Response) {
    const payload = { userId: user._id.toHexString() }; // Thay đổi payload thành object

    const expires = new Date();
    const expiresInSeconds = this.configService.getOrThrow("JWT_EXPIRES_IN");
    expires.setSeconds(
      expires.getSeconds() + expiresInSeconds, // Sử dụng giá trị số
    );

    const token = this.jwtService.sign(payload); // Ký object payload
    response.cookie("Authentication", token, {
      httpOnly: true,
      expires,
    });
  }
}
