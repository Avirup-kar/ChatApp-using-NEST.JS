import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resolver, Query } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh_token'] as string;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    let payload: object;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // const existUser = this.prisma.user.findUnique({
    //   where: { id: payload.sub },
    // });
  }
}
