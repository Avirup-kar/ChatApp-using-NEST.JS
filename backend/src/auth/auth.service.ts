/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resolver, Query } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { User } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto';

interface JwtPayload {
  username: string;
  sub: string; // UUID
}

@Resolver()
export class AuthService {
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

    let payload: JwtPayload;
    try {
      // type the verified token payload to include `sub`
      payload = this.jwtService.verify<JwtPayload>(refreshToken, {
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

    const expiresIn = 15000;
    const expiration = Math.floor(Date.now() / 1000) + expiresIn;
    const accessToken = this.jwtService.sign(
      { ...payload, exp: expiration },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      },
    );
    res.cookie('access_token', accessToken, { httpOnly: true });
    return accessToken;
  }

  private issueTokens(user: User, response: Response) {
    const payload = { username: user.fullname, sub: user.id };

    const accessToken = this.jwtService.sign(
      { ...payload },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '150sec',
      },
    );

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: '7d',
    });

    response.cookie('access_token', accessToken, { httpOnly: true });
    response.cookie('refresh_token', refreshToken, { httpOnly: true });

    return { user };
  }

  validateUser(logingDto: LoginDto) {}
}
