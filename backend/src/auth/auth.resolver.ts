/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh_token'] as string;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    let payload;
    try {
      // type the verified token payload to include `sub`
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const existUser = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!existUser) {
      throw new NotFoundException(
        'No user present by this name, Plz SingUp first!',
      );
    }
  }
}
