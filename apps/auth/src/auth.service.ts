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
      // Prevents client-side JavaScript from accessing the cookie (helps mitigate XSS attacks).
      // Tiếng Việt: Ngăn chặn JavaScript phía client truy cập vào cookie này (giúp giảm thiểu tấn công XSS).
      httpOnly: true,

      // Ensures the cookie is only sent over HTTPS.
      // For local development without HTTPS, you might need to set this based on NODE_ENV (e.g., process.env.NODE_ENV === 'production').
      // Tiếng Việt: Đảm bảo cookie chỉ được gửi qua kết nối HTTPS.
      // Khi phát triển ở local không có HTTPS, bạn có thể cần cấu hình tùy theo NODE_ENV (ví dụ: process.env.NODE_ENV === 'production').
      // secure: true,

      // Sets the expiration date for the cookie.
      // Tiếng Việt: Thiết lập ngày giờ hết hạn cho cookie.
      expires,

      // Restricts the cookie to first-party context, providing strong CSRF protection.
      // 'strict': Cookie is not sent on any cross-site navigation.
      // 'lax': Cookie is sent on top-level navigations (e.g., clicking a link from another site), but not on cross-site subrequests (e.g., images, iframes).
      // Tiếng Việt: Hạn chế cookie chỉ được gửi trong ngữ cảnh của trang web gốc (first-party), cung cấp khả năng chống tấn công CSRF mạnh mẽ.
      // 'strict': Cookie không được gửi khi điều hướng từ trang web khác (cross-site).
      // 'lax': Cookie được gửi khi người dùng điều hướng cấp cao nhất (ví dụ: nhấp vào liên kết từ trang khác), nhưng không gửi với các yêu cầu con cross-site (ví dụ: hình ảnh, iframe).
      // sameSite: "strict",
    });
  }
}
