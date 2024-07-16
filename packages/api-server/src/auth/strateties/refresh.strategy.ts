import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from '../jwt.payload';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.refresh_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback): Promise<any> {
    return done(null, payload);
  }
}
