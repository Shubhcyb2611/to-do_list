import { JWT_SECRET } from "@/config/env.config";
import jwt from "jsonwebtoken";

export enum Scopes {
  StaffInvitation = "staffInvite",
  ResetPassword = "resetPassord",
  VerifyEmail = "verifyEmail",
  Other = "other",
}
type Payload = {
  id?: string;
  userId?: string;
  email: string;
  scope?: Scopes;
};

export class JwtService {
  private secret: string;

  constructor() {
    this.secret = JWT_SECRET;
  }

  createAccessToken(userId: number) {
    const token = jwt.sign({ userId }, this.secret, {
      expiresIn: "1y",
    });
    return token;
  }

  createRefreshToken(userId: number) {
    const token = jwt.sign({ userId }, this.secret, {
      expiresIn: "1y",
    });
    return token;
  }

  exchangeRefreshTokenForAccess(refreshToken: string) {
    const decoded = jwt.verify(refreshToken, this.secret) as {
      userId: number;
    };
    return this.createAccessToken(decoded.userId);
  }

  verifyToken(token: string) {
    const decoded = jwt.verify(token, this.secret) as {
      userId: number;
    };
    return decoded;
  }

  createJwtToken(payload: Payload, expiresIn: string | number = "1hr") {
    const token = jwt.sign(payload, this.secret, { expiresIn });
    return token;
  }

  validateJwtToken(token: string, requiredScope?: Scopes) {
    try {
      const payload = jwt.verify(token, this.secret) as Payload;
      if (payload.scope !== requiredScope) throw new Error("Invalid Scope");
      return { payload, expired: false };
    } catch (error) {
      return {
        payload: null,
        expired: "Token expired",
      };
    }
  }
  async decodeGoogleToken(token) {
    const response = await fetch("https://www.googleapis.com/oauth2/v3/certs");
    if (!response.ok) {
      throw new Error("400::Failed to fetch Google public keys");
    }
    const tokenHeader = jwt.decode(token, { complete: true });
    if (!tokenHeader || !tokenHeader.header || !tokenHeader.header.kid) {
      throw new Error("400::Token header is missing or invalid");
    }
    return tokenHeader.payload;
  }
}
